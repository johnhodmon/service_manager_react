ReactDOM = require('react-dom');
var React = require('react');
var jobs=require('../data/JobData.js').jobs;
var customers=require('../data/CustomerData.js').customers;
var products=require('../data/ProductData.js').products;
var parts=require('../data/PartData.js').parts;
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var _=require('lodash');
var IndexRoute = ReactRouter.IndexRoute;
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
                var id="1";
                if(this.props.params.id!=null)
                {
                    id=this.props.params.id;
                }
                console.log("params.id"+this.props.params.id);
                return(
                   <div className="container-fluid">

                   <Navbar activeTab="jobs" />

                   <JobPageContent activeId={id} jobs={jobs} parts={parts}  />
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

                    <CustomerPageContent activeId={this.props.params.id} customers={customers}  />
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

                    <ProductPageContent activeId={this.props.params.id} products={products}  />
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

                    <PartPageContent activeId={this.props.params.id} parts={parts}  />
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
                            <li className={(this.state.activeTab === "jobs") ? "active" : ""}> <Link to="/jobs/1" params={{id: 1}}>Jobs</Link></li>
                            <li className={(this.state.activeTab === "customers") ? "active" : ""}> <Link to="/customers/1">Customers</Link></li>
                            <li className={(this.state.activeTab === "products") ? "active" : ""}>   <Link to="/products/1">Products</Link></li>
                            <li className={(this.state.activeTab === "parts") ? "active" : ""}>   <Link to="/parts/1">Stock Control</Link></li>
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


var JobPageContent=React.createClass({
    render:function()
    {

        return(
            <div className="row">
                <div className="col-md-2 side-pane">
                    <JobSideBar activeId={this.props.activeId} jobs={this.props.jobs}/>

                </div>
                <div className="col-md-10 main-pane">
                    <JobMainPane activeId={this.props.activeId} jobs={this.props.jobs} parts={this.props.parts}/>
                </div>

            </div>
        );
    }
});


var CustomerPageContent=React.createClass({
    render:function()
    {
        return(
            <div className="row">
                <div className="col-md-2 side-pane">
                    <CustomerSideBar activeId={this.props.activeId} customers={this.props.customers}/>

                </div>
                <div className="col-md-10 main-pane">
                    <CustomerMainPane/>
                </div>

            </div>
        );
    }
});


var ProductPageContent=React.createClass({
    render:function()
    {
        return(
            <div className="row">
                <div className="col-md-2 side-pane">
                    <ProductSideBar activeId={this.props.activeId} products={this.props.products}/>

                </div>
                <div className="col-md-10 main-pane">
                    <ProductMainPane/>
                </div>

            </div>
        );
    }
});

var PartPageContent=React.createClass({
    render:function()
    {
        return(
            <div className="row">
                <div className="col-md-2 side-pane">
                    <PartSideBar activeId={this.props.activeId} parts={this.props.parts}/>

                </div>
                <div className="col-md-10 main-pane">
                    <PartMainPane/>
                </div>

            </div>
        );
    }
});



var JobSideBar=React.createClass({

    getInitialState:function()
    {
        return(
        {
            searchBoxContent: "",
            sortBy:""
        }
        );
    },

    setSearchText:function(value)
    {
        this.setState({ searchBoxContent:value})
    },

    setSortBy:function(value)
    {
        this.setState({ sortBy:value})
    },

    render:function(){
        var jobs=this.props.jobs;
        var list=jobs.filter(function(job){
            return job.customer.name.toLowerCase().search(this.state.searchBoxContent.toLowerCase())!=-1;
        }.bind(this));

         var sortedList=_.sortBy(list,this.state.sortBy)


        return(
            <div>
            <div className="row search-box-div">
            <JobSearchbox setSortBy={this.setSortBy} setSearchText={this.setSearchText}/>
                </div>
                <div className="row">
            <JobList activeId={this.props.activeId} jobs={sortedList}/>
            </div>
                </div>

        );
    }
});


var CustomerSideBar=React.createClass({
    render:function(){
        return(
            <div>
                <div className="row search-box-div">
                    <CustomerSearchbox/>
                </div>
                <div className="row">
                    <CustomerList activeId={this.props.activeId} customers={this.props.customers}/>
                </div>
            </div>

        );
    }
});

var ProductSideBar=React.createClass({
    render:function(){
        return(
            <div>
                <div className="row search-box-div">
                    <ProductSearchbox/>
                </div>
                <div className="row">
                    <ProductList activeId={this.props.activeId} products={this.props.products}/>
                </div>
            </div>

        );
    }
});

var PartSideBar=React.createClass({
    render:function(){
        return(
            <div>
                <div className="row search-box-div">
                    <PartSearchbox/>
                </div>
                <div className="row">
                    <PartList activeId={this.props.activeId} parts={this.props.parts}/>
                </div>
            </div>

        );
    }
});





var JobMainPane=React.createClass({
    render:function(){
        var jobs=this.props.jobs;
        console.log("activeId"+this.props.activeId);
        var jobToShow=jobs[this.props.activeId];
        var customer=jobToShow.customer;
        var customerProduct=jobToShow.customerProduct;
        var product=jobToShow.customerProduct.product;
        var jobParts=[];
        var parts=this.props.parts;


        if(jobToShow.jobParts!=null)
        {
            jobParts=jobToShow.jobParts.map(function(jp,index)
        {
            return <SingleJobPart jobPart={jp} index={index} />
        });
        }

     var selectOptions=product.bom.map(function(bomItem,index){
         return <SelectOption bomItem={bomItem} />
     });


        return(
            <div >
                <div className="row">
                <div className="col-md-3">
                    <h3><strong>Customer Details</strong></h3>
                  <p>
                        {customer.name}<br/>
                        {customer.street}<br/>
                        { customer.town}<br/>
                        {customer.county}<br/>
                        {customer.phone}<br/>
                        {customer.email}<br/>
                    </p>
                </div>

                <div className="col-md-6">
                <h3><strong>Job Details</strong></h3>
                    <p>
                        Fault reported on {jobToShow.date}<br/>
                        Fault description: {jobToShow.reported_fault}<br/>

                    </p>





                    <h3><strong>Parts Used</strong></h3>
                    <p>There were no parts used on this job</p>
                        <table className="table table-striped">
                            <thead>

                            <tr><th>Part Number</th><th>Description</th><th>Quantity</th> </tr>

                            </thead>

                            <tbody>
                            {jobParts}


                            </tbody>
                            </table>
                    <h3><strong>Add part used</strong></h3>
                        <form>
                            <div className="form-group">
                                <label for="partNumber">Part Number</label>
                            <select>
                                {selectOptions}
                            </select>
                                </div>

                            <div className="form-group">
                                <label for="quantity" >Quantity</label>
                            <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                </select>
                            </div>
                            <input type="button" className="btn btn-primary" action="submit" value="Add"/>
                        </form>

                    </div>

                    <div className="col-md-3">
                        <h3><strong>Product Details</strong></h3>
                        <p>
                            {product.manufacturer.name} {product.product_number}
                            {product.description}
                            Serial Number: {customerProduct.serialNumber}

                        </p>
                    </div>

                   </div>
                </div>



        );


    }
});

var SelectOption=React.createClass(
    {

       render: function()
       {
           var bomItem=this.props.bomItem;
           return(
               <option value={bomItem.part.part_number}>{bomItem.part.part_number}:{bomItem.part.description} </option>
           );
       }
    });

var SingleJobPart=React.createClass(
    {

        render:function(){
            var jobPart=this.props.jobPart;
            var part = jobPart.part;
            return(
                <tr><td>{part.part_number}</td><td>{part.description}</td><td>{jobPart.quantity}</td>
                    <td><button className="btn btn-primary">Edit</button></td><td><button className="btn btn-primary">Delete</button></td></tr>
            );
        }
    }
);

var CustomerMainPane=React.createClass({
    render:function(){
        return(
            <div>
                <div className="col-md-3">
                    Customer details here

                </div>
                <div className="col-md-6">
                    Previous Jobs Here
                    <div>
                        Customer Products Here
                    </div>
                </div>
                <div className="col-md-3">

                </div>

            </div>

        );
    }
});

var ProductMainPane=React.createClass({
    render:function(){
        return(
            <div>
                <div className="col-md-3">
                    Manufacturer details here

                </div>
                <div className="col-md-6">
                    Part List Here

                </div>
                <div className="col-md-3">
                 <div>
                 Product Details here
                    </div>
                    <div>
                Product diagram here
                        </div>
                </div>

            </div>

        );
    }
});

var PartMainPane=React.createClass({
    render:function(){
        return(
            <div>
                <div className="col-md-3">
                    Part details here
                </div>
                <div className="col-md-6">
                    Where used here
                </div>
                <div className="col-md-3">
                    History here
                </div>

            </div>

        );
    }
});


var JobSearchbox=React.createClass({

    setSearchText:function(e)
    {
        e.preventDefault();
        console.log("value: "+e.target.value);
        this.props.setSearchText(e.target.value);
    },

    setSortBy:function(e)
    {
        e.preventDefault();
        console.log("sort: "+e.target.value);
        this.props.setSortBy(e.target.value);
    },
    render: function(){



        return(

                <div>
                    <div className="row">
                    <input onChange={this.setSearchText} type="text"  placeholder="Search"/>
                     </div>
                    <div className="row">
                    <select onChange={this.setSortBy} id="sort" >
                        <option value="" disabled selected>Sort by: </option>
                        <option value="date">Date</option>
                        <option value="customer.name">Customer</option>

                    </select>
                        </div>

            </div>
        );

    }
});

var CustomerSearchbox=React.createClass({
    render: function(){



        return(

            <div>
                <div className="row">
                    <input type="text"  placeholder="Search"/>
                </div>
                <div className="row">
                    <select id="sort" >
                        <option value="" disabled selected>Sort by: </option>
                        <option value="name">Date</option>
                        <option value="customer">Customer</option>
                    </select>
                </div>

            </div>
        );

    }
});

var ProductSearchbox=React.createClass({
    render: function(){



        return(


                <div className="row">
                    <input type="text"  placeholder="Search"/>
                </div>



        );

    }
});

var PartSearchbox=React.createClass({
    render: function(){



        return(


            <div className="row">
                <input type="text"  placeholder="Search"/>
            </div>



        );

    }
});

var JobList=React.createClass(
    {

        render:function()
        {


            var jobsToDisplay = this.props.jobs.map(function(job,index) {
                return <SingleJob activeId={this.props.activeId}  job={job} key={index} />
            }.bind(this));



            return(

                    <ul className="nav nav-pills nav-stacked side-nav">
                        {jobsToDisplay}

                    </ul>

            );
        }

    }


);

var CustomerList=React.createClass(
    {

        render:function()
        {


            var customersToDisplay = this.props.customers.map(function(customer,index) {
                return <SingleCustomer activeId={this.props.activeId}  customer={customer} key={index} />
            }.bind(this));



            return(

                <ul className="nav nav-pills nav-stacked side-nav">
                    {customersToDisplay}

                </ul>

            );
        }

    }


);


var ProductList=React.createClass(
    {

        render:function()
        {


            var productsToDisplay = this.props.products.map(function(product,index) {
                return <SingleProduct activeId={this.props.activeId}  product={product} key={index} />
            }.bind(this));



            return(

                <ul className="nav nav-pills nav-stacked side-nav">
                    {productsToDisplay}

                </ul>

            );
        }

    }


);


var PartList=React.createClass(
    {

        render:function()
        {


            var partsToDisplay = this.props.parts.map(function(part,index) {
                return <SinglePart activeId={this.props.activeId}  part={part} key={index} />
            }.bind(this));



            return(

                <ul className="nav nav-pills nav-stacked side-nav">
                    {partsToDisplay}

                </ul>

            );
        }

    }


);

var SingleJob=React.createClass({





    render: function () {
        var job=this.props.job;

        return (

            <li  className={(this.props.activeId === ""+job.id) ? "active" : ""} role="presentation" >


                 <Link  to={"/jobs/"+job.id} ><h3>{job.date}</h3>
                    <p>{job.customerProduct.product.manufacturer.name+" "+job.customerProduct.product.description.split(",")[0]}<br/>
                    {job.customer.name}  <br/>
                    {job.customer.town}<br/>
                        {job.status}<br/></p></Link>





            </li>);
    }
});

var SingleCustomer=React.createClass({





    render: function () {
        var customer=this.props.customer;

        return (

            <li  className={(this.props.activeId === ""+customer.id) ? "active" : ""} role="presentation" >


                <Link  to={"/customers/"+customer.id} ><h3>{customer.name}</h3>
                    <p>{customer.street}<br/>
                        {customer.county}  <br/>
                        {customer.town}<br/>
                        {customer.county}<br/></p></Link>





            </li>);
    }
});

var SingleProduct=React.createClass({





    render: function () {
        var product=this.props.product;

        return (

            <li  className={(this.props.activeId === ""+product.id) ? "active" : ""} role="presentation" >


                <Link  to={"/products/"+product.id} ><h3>{product.manufacturer.name+" "+product.product_number}</h3>
                    <p>

                        {product.number}</p></Link>





            </li>);
    }
});

var SinglePart=React.createClass({





    render: function () {
        var part=this.props.part;

        return (

            <li  className={(this.props.activeId === ""+part.id) ? "active" : ""} role="presentation" >


                <Link  to={"/parts/"+part.id} ><h3>{part.description}</h3>
                    <p>{"Part Number: "+part.part_number}</p></Link>





            </li>);
    }
});





ReactDOM.render( (
        <Router >
            <Route path="/" component={App}>
                <IndexRoute component={JobPage}/>
                <Route path="jobs/:id" component={JobPage}/>
                <Route path="customers/:id" component={CustomerPage} />
                <Route path="products/:id" component={ProductPage} />
                <Route path="Parts/:id" component={PartPage} />
            </Route>
        </Router>
    ),
    document.getElementById('mount-point')
);