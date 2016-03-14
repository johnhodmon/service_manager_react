ReactDOM = require('react-dom');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var _=require('lodash');
var IndexRoute = ReactRouter.IndexRoute;
var JobPageContent=require('./jobs.js').jobPageContent;
var CustomerPageContent=require('./customers.js').customerPageContent;
var ProductPageContent=require('./products.js').productPageContent;
var PartPageContent=require('./parts.js').partPageContent;
var stubApi=require('../data/stubApi.js').stubApi;

$(document).ready(function() {

    var side = $('.side-pane');
    var main = $('.main-pane');


        main.height(side.height());





});

var App=React.createClass(
    {
        render:function()
        {
            return(
                <div>


                    {this.props.children}
                </div>
            );
        }
    }
);

var JobPage=React.createClass(
    {
        render:function()
            {
                console.log("all jobs size"+stubApi.getAllJobs().length)
                return(
                   <div className="container-fluid">

                   <Navbar activeTab="jobs" />

                   <JobPageContent id={this.props.params.id}  jobs={stubApi.getAllJobs()}   />
                   </div>


                );

            }

    }
);
var CustomerPage=React.createClass(
    {
        render:function()
        {

            return(
                <div className="container-fluid">

                    <Navbar activeTab="customers" />

                    <CustomerPageContent id={this.props.params.id}  customers={stubApi.getAllCustomers()}  />
                </div>


            );

        }

    }
);

var ProductPage=React.createClass(
    {
        render:function()
        {

            return(
                <div className="container-fluid">

                    <Navbar activeTab="products" />

                    <ProductPageContent id={this.props.params.id}   products={stubApi.getAllProducts()}  />
                </div>


            );

        }

    }
);

var PartPage=React.createClass(
    {
        render:function()
        {

            return(
                <div className="container-fluid">

                    <Navbar activeTab="parts" />

                    <PartPageContent id={this.props.params.id}  parts={stubApi.getAllParts()}  />
                </div>


            );

        }

    }
);


var Navbar=React.createClass({
    getInitialState: function()
    {
       return{ activeTab:this.props.activeTab};
    },

    render: function ()
        {

            return(
                <div className="row top-nav">
                    <div className="col-md-2">
                        <img src="/img/logo.jpg" />
                        </div>
                    <div className="col-md-10 top-nav-div">
                        <ul className="nav  nav-tabs">
                            <li className={(this.state.activeTab === "jobs") ? "active" : ""}> <Link to="/jobs/0">Jobs</Link></li>
                            <li className={(this.state.activeTab === "customers") ? "active" : ""}> <Link to="/customers/0">Customers</Link></li>
                            <li className={(this.state.activeTab === "products") ? "active" : ""}>   <Link to="/products/0">Products</Link></li>
                            <li className={(this.state.activeTab === "parts") ? "active" : ""}>   <Link to="/parts/0">Stock Control</Link></li>




                        </ul>
                        </div>

                </div>


            );
        }
    }
);




var CustomerForm=React.createClass(
    {

      customerToSave:
      {

          name:"",
          street:"",
          town:"",
          county:"",
          phone:"",
          email:""
      },

        setName:function(e)
        {

            this.customerToSave.name=e.target.value;

        },

        setStreet:function(e)
        {
            this.customerToSave.street=e.target.value;
        },

        setTown:function(e)
        {
            this.customerToSave.town=e.target.value;
        },

        setCounty:function(e)
        {
            this.customerToSave.county=e.target.value;
        },

        setPhone:function(e)
        {
            this.customerToSave.phone=e.target.value;
        },

        setEmail:function(e)
        {
            this.customerToSave.email=e.target.value;
        },

        saveCustomer:function(e)
        {

           e.preventDefault();
            console.log("submitting");
           var id= stubApi.addCustomer(this.customerToSave);
            this.props.history.push('customers/'+id);

        },



        cancelCustomerSave:function()
        {

        },


        render:function()
        {


            return(
                <div className="container-fluid">

                    <Navbar activeTab="customers" />
                    <div className="row">
                        <div className="col-md-2 side-pane">
                        </div>
                        <div className="col-md-10 main-pane">
                            <div className="row">
                                <div className="col-md-3">
                                </div>
                                <div className="col-md-6">
                                    <h3><strong>New Customer</strong></h3>
                                    <form >


                                        <label>Name</label>
                                        <div className="form-group">

                                            <input  onChange={this.setName} required type="text" name="name">

                                            </input>
                                        </div>
                                        <label>Street</label>
                                        <div className="form-group">

                                            <input onChange={this.setStreet} required type="text" name="street">

                                            </input>
                                        </div>
                                        <label>Town</label>
                                        <div className="form-group">

                                            <input onChange={this.setTown} required type="text" name="town">

                                            </input>
                                        </div>
                                        <label>County</label>
                                        <div  className="form-group">

                                            <input onChange={this.setCounty}  required type="text" name="county">

                                            </input>
                                        </div>
                                        <label>Phone Number</label>
                                        <div className="form-group">

                                            <input   required type="number" name="phone">

                                            </input>
                                        </div>
                                        <label>email</label>
                                        <div className="form-group">

                                            <input  onChange={this.setEmail} required type="email" name="email">

                                            </input>
                                        </div>
                                        <input type="button"  onClick={this.saveCustomer} value="Submit"  className="btn btn-sm btn-primary form-button"/>
                                        <input type="button" value="Cancel"  onClick={this.cancelCustomerSave}  className="btn btn-sm btn-primary form-button"/>



                                    </form>

                                </div>
                                <div className="col-md-3">
                                </div>
                            </div>
                        </div>


                    </div>
                </div>


            );

        }

    }
);



ReactDOM.render( (
        <Router >
            <Route path="/" component={App}>
                <IndexRoute component={JobPage}/>
                <Route path="jobs/:id" component={JobPage}/>
                <Route path="new_customer" component={CustomerForm}/>
                <Route path="customers/:id" component={CustomerPage} />
                <Route path="products/:id" component={ProductPage} />
                <Route path="parts/:id" component={PartPage} />
            </Route>
        </Router>
    ),
    document.getElementById('mount-point')
);