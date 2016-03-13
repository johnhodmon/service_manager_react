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
var stubApi=require('../data/stubApi.js').stubApi;

var CustomerPageContent=React.createClass({

    getInitialState:function()
    {
        var customer=stubApi.getCustomer(this.props.params.id);


        return ({

            customerDisplayed:customer,


        });

    },

    selectNewCustomer:function(customer)
    {

        if(stubApi.getCustomerProductsForCustomer(customer.id)!=null) {
            cpv="invisible";
        }

        this.setState ({

            customerDisplayed:customer,

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
                    <CustomerMainPane

                                      customerDisplayed={this.state.customerDisplayed}

                                      customers={this.props.customers}/>
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

getInitialState:function()

{

    var cpv=""
    if(stubApi.getCustomerProductsForCustomer(this.props.customerDisplayed.id)!=null) {
        cpv="invisible";
    }
    return({
        serialNumber:"",
        productId:"",
        cpVisibility:cpv,
        addCpVisibility:"invisible",
        addButtonVisibility:"visible",
        createJobFormVisibility:"invisible",
        customerProductForForm:"",
        createJobButtonVisibility:"",
        reportedFaultFromForm:""
    })
},

    hideCustomerProductForm:function()
    {
        this.setState( {
            addCpVisibility:"invisible",
            addButtonVisibility:"",
            createJobButtonVisibility:"",



        }  )
    },

    showCustomerProductForm:function()
    {
        this.setState( {
            addCpVisibility:"",
            addButtonVisibility:"invisible",
            createJobButtonVisibility:"invisible",


        }  )
    },

    saveJob:function()
    {


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
        stubApi.addJob(today,this.state.reportedFaultFromForm,this.state.customerProductForForm.id);
        this.setState( {
            createJobFormVisibility:"invisible",
            addButtonVisibility:"",
            createJobButtonVisibility:"",

        });
    },

    cancelJobSave:function()
    {
        this.setState( {
            createJobFormVisibility:"invisible",
            addButtonVisibility:"",
            createJobButtonVisibility:"",});
    },

    showCreateJobForm:function(customerProduct)
    {
        var product=stubApi.getProduct(customerProduct.productId);
        var manufacturer=stubApi.getManufacturer(product.manufacturerId);
        this.setState( {
            createJobFormVisibility:"",
            addButtonVisibility:"invisible",
            createJobButtonVisibility:"invisible",
            customerProductForForm:customerProduct





        });
    },



    setReportedFaultFromForm:function(e)
    {
        e.preventDefault();
        this.setState({reportedFaultFromForm:e.target.value})
    },

    setProductId:function(e)
    {
        e.preventDefault();
        this.setState({productId:e.target.value})
    },

setSerialNumber:function(e)
{
    e.preventDefault();
    this.setState({serialNumber:e.target.value})
},



    saveCustomerProduct:function(e)
    {
        e.preventDefault();
        var customerDisplayed=this.props.customerDisplayed;
        stubApi.addCustomerProduct(customerDisplayed.id,this.state.productId,this.state.serialNumber);
        this.hideCustomerProductForm();
    },

    deleteCustomerProduct:function(id)
    {
        stubApi.deleteCustomerProduct(id);
    },


    render:function(){
        var customers=this.props.customers;
        var customerDisplayed=this.props.customerDisplayed;
        var customerProducts=[];
        var productOptions=products.map(function(product,index){
            return <ProductOption product={product} />
        });

        if(stubApi.getCustomerProductsForCustomer(customerDisplayed.id)) {
            customerProducts = stubApi.getCustomerProductsForCustomer(customerDisplayed.id).map(function (sp, index) {
                    return (<SingleCustomerProduct
                        customerDisplayed={customerDisplayed}
                        createJob={this.showCreateJobForm}
                        createJobButtonVisibility={this.state.createJobButtonVisibility}
                        showCustomerProductForm={this.showCustomerProductForm}
                        sp={sp}
                        deleteCustomerProduct={this.deleteCustomerProduct}

                    />);
                }.bind(this)
            );
        }
        return(
            <div>
                <div className="col-md-3">
                    <h3><strong>Customer Details</strong></h3>

                    <p>
                        <Link to={"customers/"+customerDisplayed.id}>{customerDisplayed.name}<br/>
                            {customerDisplayed.street}<br/>
                            { customerDisplayed.town}<br/>
                            {customerDisplayed.county}<br/>
                            {customerDisplayed.phone}<br/>
                            {customerDisplayed.email}<br/>
                        </Link>
                    </p>


                </div>
                <div className="col-md-6">
                    Previous Jobs Here

                    <h3><strong>Customer's Products</strong></h3>

                    <table className="table table-striped">
                        <thead>

                        <tr><th>Manufacturer</th><th>Model Number</th><th>Serial Number</th> <th>Description</th></tr>

                        </thead>

                        <tbody>
                        <tr className={this.props.cpVisibility}><td></td><td>This customer has no registered products</td><td> Add Product  <span onClick={this.makeVisible} className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></td></tr>
                        {customerProducts}
                        <tr className={this.props.addButtonVisibility}><td></td><td></td><td></td><td>  Add Product  <span onClick={this.makeVisible} className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></td></tr>
                        <tr className={this.props.addCpVisibility}>  <td></td><td><select onChange={this.setProductId}  >{productOptions}</select></td>
                            <td>


                            </td><input onChange={this.setSerialNumber} placeholder="serial number" type="text"></input><td>  <span onClick={this.undo} className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                Cancel <span onClick={this.saveCustomerProduct} className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></td></tr>

                        </tbody>
                    </table>
                    <div className={this.props.createJobFormVisibility}>
                    <JobForm
                               customerProductForForm={this.state.customerProductForForm}
                                jobFormCustomer={this.state.jobFormCustomer}
                             jobFormCustomerProduct={this.state.jobFormCustomerProduct}
                               setReportedFaultFromForm={this.setReportedFaultFromForm}
                             saveJob={this.saveJob}
                             cancelJobSave={this.cancelJobSave}
                    />
                    </div>
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

    deleteCustomerProduct:function()
    {
        var sp=this.props.sp;

        this.props.deleteCustomerProduct(sp.id)
    },
    showCreateJobForm:function()
    {
        var sp=this.props.sp;
        var  customerDisplayed=this.props.customerDisplayed;
        this.props.showCreateJobForm(sp)
    },
        render:function()
        {
            var sp=this.props.sp;
            return(
                <tr><td>{sp.product.manufacturer.name}</td><td><Link to={"products/"+sp.product.id}> {sp.product.product_number}</Link></td>
                    <td>{sp.serialNumber}</td><td>{sp.product.description}  <span onClick{this.deleteCustomerProduct} className={ "glyphicon glyphicon-trash "+this.props.createJobButtonVisibility} aria-hidden="true"></span>
                      </td><td className={this.props.createJobButtonVisibility}
                        onClick={this.showCreateJobForm}>Create Job <span className="glyphicon glyphicon-plus" aria-hidden="true"></span></td></tr>

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
            var customerProduct=this.props.customerProductForForm;
            var customer=stubApi.getCustomer(customerProduct.customerId);
            var product=stubApi.getProduct(customerProduct.productId);
            var manufacturer=stubApi.getManufacturer(product.manufacturerId)




            return(
                <div>
                    <h3> Create New Job</h3>
                    <form>
                        <label>Customer Product</label>
                        <div className="form-group">
                            <input type="text" name="customerProduct" disabled

                                   value={  manufacturer.name+" "
                        +product.product_number
                        +product.description.split(",")[0]}>
                            </input>
                        </div>
                        <label>Customer</label>
                        <div className="form-group">
                            <input type="text" name="customer" disabled
                                   value={ customer.name+", "+customer.town    } >

                            </input>
                        </div>

                        <label>Reported Fault</label>
                        <div className="form-group">

                            <input onChange={this.props.setReportedFault} value="reported_fault" type="text" name="reported fault">

                            </input>
                        </div>
                        <input onClick={this.props.saveJob} className="btn btn-sm btn-primary" type="cancel" value="Cancel"></input>
                        <input onClick={this.props.cancelJobSave} className="btn btn-sm btn-primary" type="submit" value="Submit"></input>

                    </form>
                </div>


            );
        }

    });

exports.customerPageContent=CustomerPageContent;
exports.customerForm=CustomerForm;