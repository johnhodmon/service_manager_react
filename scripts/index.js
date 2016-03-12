ReactDOM = require('react-dom');
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var _=require('lodash');
var IndexRoute = ReactRouter.IndexRoute;
var jobs=require('../data/JobData.js').jobs;
var customers=require('../data/CustomerData.js').customers;
var products=require('../data/ProductData.js').products;
var parts=require('../data/PartData.js').parts;
var manufacturers=require('../data/ManData.js').manufacturers;
var JobPageContent=require('./jobs.js').jobPageContent;
var CustomerPageContent=require('./customers.js').customerPageContent;
var ProductPageContent=require('./products.js').productPageContent;
var PartPageContent=require('./parts.js').partPageContent;
var CustomerForm=require('./customers.js').customerForm;
var ProductForm=require('./products.js').productForm;

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

                return(
                   <div className="container-fluid">

                   <Navbar activeTab="jobs" />

                   <JobPageContent  jobs={jobs} parts={parts}  />
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

                    <CustomerPageContent customers={customers}  />
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

                    <ProductPageContent  products={products}  />
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

                    <PartPageContent parts={parts}  />
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
                            <li className={(this.state.activeTab === "jobs") ? "active" : ""}> <Link to="/jobs">Jobs</Link></li>
                            <li className={(this.state.activeTab === "customers") ? "active" : ""}> <Link to="/customers">Customers</Link></li>
                            <li className={(this.state.activeTab === "products") ? "active" : ""}>   <Link to="/products">Products</Link></li>
                            <li className={(this.state.activeTab === "parts") ? "active" : ""}>   <Link to="/parts">Stock Control</Link></li>
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
                <Route path="jobs" component={JobPage}/>
                <Route path="customers/new" component={CustomerForm}/>
                <Route path="products/new" component={ProductForm}/>
                <Route path="customers" component={CustomerPage} />
                <Route path="products" component={ProductPage} />
                <Route path="Parts" component={PartPage} />
            </Route>
        </Router>
    ),
    document.getElementById('mount-point')
);