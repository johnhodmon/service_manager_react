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
var CustomerForm=require('./customers.js').customerForm;
var ProductForm=require('./products.js').productForm;
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
                            <li role="presentation" className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                    John Hodmon<span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li>Logout</li>


                                </ul>
                            </li>
                        </ul>
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
                <Route path="new_product" component={ProductForm}/>
                <Route path="customers/:id" component={CustomerPage} />
                <Route path="products/:id" component={ProductPage} />
                <Route path="parts/:id" component={PartPage} />
            </Route>
        </Router>
    ),
    document.getElementById('mount-point')
);