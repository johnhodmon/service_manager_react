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

var CustomerPageContent=React.createClass({

    getInitialState:function()
    {
        var customer=customers[0];


        return ({

            customerDisplayed:customer
        });

    },

    selectNewCustomer:function(customer)
    {


        this.setState ({

            customerDisplayed:customer
        });

    },


    render:function()
    {
        return(
            <div className="row">
                <div className="col-md-2 side-pane">
                    <CustomerSideBar customerDisplayed={this.state.customerDisplayed} selectNewCustomer={this.selectNewCustomer} customers={this.props.customers}/>

                </div>
                <div className="col-md-10 main-pane">
                    <CustomerMainPane customerDisplayed={this.state.customerDisplayed} customers={this.props.customers}/>
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
                    <p><Link to="customer/new">New Customer +</Link></p>
                    <CustomerList selectNewCustomer={this.props.selectNewCustomer} customerDisplayed={this.props.customerDisplayed} customers={this.props.customers}/>
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

var CustomerList=React.createClass(
    {

        render:function()
        {


            var customersToDisplay = this.props.customers.map(function(customer,index) {
                return <SingleCustomer customerDisplayed={this.props.customerDisplayed} selectNewCustomer={this.props.selectNewCustomer}   customer={customer} key={index} />
            }.bind(this));



            return(

                <ul className="nav nav-pills nav-stacked side-nav">
                    {customersToDisplay}

                </ul>

            );
        }

    }


);

var SingleCustomer=React.createClass({


selectNewCustomer:function()
{
    var customer=this.props.customer;
    this.props.selectNewCustomer(customer);
},


    render: function () {
        var customer=this.props.customer;

        return (

            <li onClick={this.selectNewCustomer}  className={(this.props.customerDisplayed.id === customer.id) ? "active" : ""} role="presentation" >


                <Link  to={"/customers/"+customer.id} ><h3>{customer.name}</h3>
                    <p>{customer.street}<br/>
                        {customer.county}  <br/>
                        {customer.town}<br/>
                        {customer.county}<br/></p></Link>





            </li>);
    }
});
var CustomerMainPane=React.createClass({
    render:function(){
        var customers=this.props.customers;
        var customerDisplayed=this.props.customerDisplayed
        var productOptions=products.map(function(product,index){
            return <ProductOption product={product} />
        });
        var customerProducts=customerDisplayed.customerProducts.map(function(sp,index)
            {
                return(<SingleCustomerProduct sp={sp} />);
            }

        );
        return(
            <div>
                <div className="col-md-3">
                    <h3><strong>Customer Details</strong></h3>
                    <p>
                        {customerDisplayed.name}<br/>
                        {customerDisplayed.street}<br/>
                        { customerDisplayed.town}<br/>
                        {customerDisplayed.county}<br/>
                        {customerDisplayed.phone}<br/>
                        {customerDisplayed.email}<br/>
                    </p>

                </div>
                <div className="col-md-6">
                    Previous Jobs Here

                    <h3><strong>Customer's Products</strong></h3>
                    <p>The customer has no registered products</p>
                    <table className="table table-striped">
                        <thead>

                        <tr><th>Manufacturer</th><th>Model Number</th><th>Serial Number</th> <th>Description</th></tr>

                        </thead>

                        <tbody>
                        {customerProducts}


                        </tbody>
                    </table>
                    <JobForm customer={customerDisplayed} customerProduct={customerDisplayed.customerProducts[0]} />
                    <h3><strong>Register product for this customer</strong></h3>
                    <form>
                        <label for="productNumber">Product</label>
                        <div className="form-group">

                            <select>
                                {productOptions}
                            </select>
                        </div>
                        <label>Serial Number</label>
                        <div className="form-group">
                            <input name="serialNumber" type="text"></input>

                        </div>
                        <input type="button" className="btn btn-sm btn-primary" action="submit" value="Add"/>
                    </form>
                </div>
                <div className="col-md-3">

                </div>

            </div>

        );
    }
});


var ProductOption=React.createClass({
    render:function(){

        var product=this.props.product;
        return(<option value={product.id}>{product.manufacturer.name} {product.product_number} {product.description.split(",")[0]}</option>

        );
    }

});

var SingleCustomerProduct=React.createClass({

        render:function()
        {
            var sp=this.props.sp;
            return(
                <tr><td>{sp.product.manufacturer.name}</td><td>{sp.product.product_number}</td>
                    <td>{sp.serialNumber}</td><td>{sp.product.description}</td><td>
                        <button className="btn btn-sm btn-primary"> Create Job</button></td></tr>

            );
        }

    }
);




var CustomerForm=React.createClass(
    {
        render:function()
        {


            return(
                <div className="container-fluid">

                    <Navbar activeTab="jobs" />
                    <div className="row">
                        <div className="col-md-2 side-pane">
                        </div>
                        <div className="col-md-10 main-pane">
                            <div className="row">
                                <div className="col-md-3">
                                </div>
                                <div className="col-md-6">
                                    <form>


                                        <label>Name</label>
                                        <div className="form-group">

                                            <input type="text" name="name">

                                            </input>
                                        </div>
                                        <label>Street</label>
                                        <div className="form-group">

                                            <input type="text" name="street">

                                            </input>
                                        </div>
                                        <label>Town</label>
                                        <div className="form-group">

                                            <input type="text" name="town">

                                            </input>
                                        </div>
                                        <label>County</label>
                                        <div className="form-group">

                                            <input type="text" name="county">

                                            </input>
                                        </div>
                                        <label>Phone Number</label>
                                        <div className="form-group">

                                            <input type="text" name="phone">

                                            </input>
                                        </div>
                                        <label>email</label>
                                        <div className="form-group">

                                            <input type="text" name="email">

                                            </input>
                                        </div>

                                        <input className="btn btn-sm btn-primary" type="submit" value="Submit"></input>

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


var JobForm=React.createClass(
    {


        render:function(){
            var customerProduct=this.props.customerProduct;
            var customer=this.props.customer;
            var product=customerProduct.product;
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd
            }
            if(mm<10){
                mm='0'+mm
            }
            var today = dd+'/'+mm+'/'+yyyy;

            return(
                <div>
                    <h3> Create New Job</h3>
                    <form>
                        <label>Customer Product</label>
                        <div className="form-group">
                            <input type="text" name="customerProduct" disabled

                                   value={product.manufacturer.name+" "+product.product_number+product.description.split(",")[0] }>
                            </input>
                        </div>
                        <label>Customer</label>
                        <div className="form-group">
                            <input type="text" name="customer" disabled
                                   value={customer.name+", "+customer.town } >

                            </input>
                        </div>

                        <div className="form-group">
                            <input type="text" name="date" hidden
                                   value={today}>

                            </input>
                        </div>
                        <label>Reported Fault</label>
                        <div className="form-group">

                            <input type="text" name="reported fault">

                            </input>
                        </div>

                        <input className="btn btn-sm btn-primary" type="submit" value="Submit"></input>

                    </form>
                </div>


            );
        }

    });

exports.customerPageContent=CustomerPageContent;
exports.customerForm=CustomerForm;