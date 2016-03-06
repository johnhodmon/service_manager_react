var ReactDOM = require('react-dom');
var React = require('react');
var jobs=require('../data/JobData.js').jobs;
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute
$(document).ready(function() {

    var dynamic = $('.side-pane');
    var static = $('.main-pane');

    static.height(dynamic.height());

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
                   <Navbar />
                   <PageContent  />
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
                    <Navbar />
                    <h1>Customers</h1>
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
                    <Navbar />
                    <h1>Products</h1>
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
                    <Navbar />
                    <h1>Parts</h1>
                </div>


            );

        }

    }
);


var Navbar=React.createClass({
        render: function ()
        {
            return(
                <div className="row top-nav">
                    <div className="col-md-2">
                        <img src="/img/logo.jpg" />
                        </div>
                    <div className="col-md-10 top-nav-div">
                        <ul className="nav  nav-tabs">
                            <li className="active"> <Link to="/jobs">Jobs</Link></li>
                            <li> <Link to="/customers">Customers</Link></li>
                            <li>   <Link to="/products">Products</Link></li>
                            <li>   <Link to="/parts">Stock Control</Link></li>
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


var PageContent=React.createClass({
    render:function()
    {
        return(
            <div className="row">
                <div className="col-md-2 side-pane">
                    <SideBar jobs={this.props.jobs}/>

                </div>
                <div className="col-md-10 main-pane">
                    <MainPane/>
                </div>

            </div>
        );
    }
});



var SideBar=React.createClass({
    render:function(){
        return(
            <div>
            <div className="row search-box-div">
            <Searchbox/>
                </div>
                <div className="row">
            <List jobs={["Test","Test"]}/>
            </div>
                </div>

        );
    }
});

var MainPane=React.createClass({
    render:function(){
        return(
            <div>
                <div className="col-md-3">
                Customer details here
                </div>
                <div className="col-md-6">
                Job Details Here
                </div>
                <div className="col-md-3">
                   Product Details here
                </div>

            </div>

        );
    }
});


var Searchbox=React.createClass({
    render: function(){



        return(

                <div>
                    <div className="row">
                    <input type="text"  placeholder="Search"/>
                     </div>
                    <div className="row">
                    <select id="sort" >
                        <option value="" disabled selected>Sort by: </option>
                        <option value="date">Date</option>
                        <option value="name">Customer</option>
                        <option value="product">Status</option>
                    </select>
                        </div>

            </div>
        );

    }
});

var List=React.createClass(
    {
        render:function()
            {

                var jobsToDisplay = this.props.jobs.map(function(job,index) {
                    return <SingleJob job={job} key={index} />
                }.bind(this));



                return(
                    <div >
                        <ul className="nav nav-pills nav-stacked side-nav" >

                            {jobsToDisplay}


                        </ul>
                    </div>
                );
            }

            }


);

var SingleJob=React.createClass({
    render: function () {
        var job=this.props.job;

        return (

            <li role="presentation" >


                {/* <a href="#"><h3>{job.date}</h3>
                    <p>{job.customerProduct.product.manufacturer.name+" "+job.customerProduct.product.description.split(",")[0]}<br/>
                    {job.customer.name}  <br/>
                    {job.customer.town}<br/>
                        {job.status}<br/></p></a>*/}


                Test



            </li>);
    }
});



ReactDOM.render( (
        <Router >
            <Route path="/" component={App}>
                <IndexRoute component={JobPage}/>
                <Route path="jobs" component={JobPage}  />
                <Route path="customers" component={CustomerPage} />
                <Route path="products" component={ProductPage} />
                <Route path="Parts" component={PartPage} />
            </Route>
        </Router>
    ),
    document.getElementById('mount-point')
);