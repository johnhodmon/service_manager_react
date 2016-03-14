ReactDOM = require('react-dom');
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var _=require('lodash');
var products=require('../data/ProductData.js').products;
var stubApi=require('../data/stubApi.js').stubApi;

var CustomerPageContent=React.createClass({

    getInitialState:function()
    {
        var customer=stubApi.getCustomer(this.props.id);


        return ({

            customerDisplayed:customer,


        });

    },

    selectNewCustomer:function(customer)
    {



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

    getInitialState:function()
    {
        return(
        {
            searchBoxContent: "",
            searchParameter:"customerName"
        }
        );
    },

    setSearchText:function(value)
    {
        this.setState({ searchBoxContent:value})
    },

    setSearchParameter:function(value)
    {

        this.setState({ searchParameter:value})

    },


    render:function(){

        var customers=this.props.customers;
        var list=customers;
        var customer=this.props.customerDisplayed;
        if(this.state.searchParameter=="customerName") {

            list = customers.filter(function (customer) {

                return customer.name.toLowerCase().search(this.state.searchBoxContent.toLowerCase()) != -1;
            }.bind(this));
        }

        else if (this.state.searchParameter=="email")
        {
            list = customers.filter(function (customer) {

                return customer.email.toLowerCase().search(this.state.searchBoxContent.toLowerCase()) != -1;
            }.bind(this));
        }
        return(
            <div>

                <div className="row search-box-div">
                    <CustomerSearchbox setSearchParameter={this.setSearchParameter} setSearchText={this.setSearchText}/>
                </div>
                <div className="row">
                    <p><Link to="customer/new">New Customer +</Link></p>
                    <CustomerList selectNewCustomer={this.props.selectNewCustomer} customerDisplayed={this.props.customerDisplayed} customers={list}/>
                </div>
            </div>

        );
    }
});

var CustomerSearchbox=React.createClass({

    setSearchText:function(e)
    {
        e.preventDefault();

        this.props.setSearchText(e.target.value);
    },

    setSearchParameter:function(e)
    {
        e.preventDefault();

        this.props.setSearchParameter(e.target.value);
    },
    render: function(){



        return(

            <div>
                <div className="row">
                    <input onChange={this.setSearchText} type="text"  placeholder="Search"/>
                </div>
                <div className="row">
                    <p className="search_by" >Search by..</p>
                    <select  onChange={this.setSearchParameter} id="sort" >
                        <option value="email">Customer email </option>
                        <option value="customerName">Customer Name</option>

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
    console.log("cp for cust length"+stubApi.getCustomerProductsForCustomer(this.props.customerDisplayed.id).length);

    var cpv="";
    if(stubApi.getCustomerProductsForCustomer(this.props.customerDisplayed.id).length!=0) {
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
        this.hideAddCustomerProductForm();
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
        console.log(manufacturer.name);
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

    showAddCustomerProductForm:function(){

        this.setState(
            {addButtonVisibility:"invisible",
            createJobButtonVisibility:"invisible",
            addCpVisibility:""}
        );

    },

    hideAddCustomerProductForm:function(){

        this.setState(
            {addButtonVisibility:"",
                createJobButtonVisibility:"",
                addCpVisibility:"invisible"}
        );

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

    deleteCustomerProduct:function(id) {
        stubApi.deleteCustomerProduct(id);
        if (stubApi.getCustomerProductsForCustomer(this.props.customerDisplayed.id).length != 0){
            this.setState({cpVisibility: "invisible"});
    }
        else
        {
            this.setState({cpVisibility: ""});
        }
    },


    render:function(){
        var customers=this.props.customers;
        var customerDisplayed=this.props.customerDisplayed;
        var customerProducts=[];
        var productOptions=products.map(function(product,index){
            return <ProductOption product={product} />
        });
        var jobsForThisCustomer=[];
        if(stubApi.getJobsForCustomer(customerDisplayed.id).length!=0)
        {

            jobsForThisCustomer=stubApi.getJobsForCustomer(customerDisplayed.id).map(function(job,index)
            {
                return <SingleJob job={job} index={index}   />
            });
        }

        if(stubApi.getCustomerProductsForCustomer(customerDisplayed.id).length!=0) {
            customerProducts = stubApi.getCustomerProductsForCustomer(customerDisplayed.id).map(function (sp, index) {
                    return (<SingleCustomerProduct
                        customerDisplayed={customerDisplayed}
                        showCreateJobForm={this.showCreateJobForm}
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



                    <h3><strong>Customer's Products</strong></h3>

                    <table className="table table-striped">
                        <thead>

                        <tr><th>Manufacturer</th><th>Model Number</th><th>Serial Number</th> <th>Description</th></tr>

                        </thead>

                        <tbody>
                        <tr className={this.state.cpVisibility}><td>This customer has no registered products</td><td></td><td></td><td></td></tr>
                        {customerProducts}
                        <tr className={this.state.addButtonVisibility}><td></td><td></td><td></td><td>  Add Product  <span onClick={this.showAddCustomerProductForm} className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></td></tr>
                        <tr className={this.state.addCpVisibility}>  <td></td><td><select onChange={this.setProductId}  >{productOptions}</select></td>
                            <td><input onChange={this.setSerialNumber} placeholder="serial number" type="text"></input></td><td>  <span onClick={this.saveCustomerProduct}  className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                Cancel <span onClick={this.hideAddCustomerProductForm}  className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span></td></tr>

                        </tbody>
                    </table>
                    <div className={this.state.createJobFormVisibility}>
                         <JobForm
                        customerProductForForm={this.state.customerProductForForm}

                        setReportedFaultFromForm={this.setReportedFaultFromForm}
                        saveJob={this.saveJob}
                        cancelJobSave={this.cancelJobSave}
                    />

                    </div>
                </div>
                <div className="col-md-3">
                    <h3><strong>Previous Jobs</strong></h3>
                    <ul>
                        {jobsForThisCustomer}
                    </ul>
                </div>

            </div>

        );
    }
});


var ProductOption=React.createClass({
    render:function(){

        var product=this.props.product;
        var manufacturer=stubApi.getManufacturer(product.manufacturerId)
        return(<option value={product.id}>{manufacturer.name} {product.product_number} {product.description.split(",")[0]}</option>

        );
    }

});

var SingleJob=React.createClass({

    render:function(){
        var job=this.props.job;
        return(
            <li><Link to={"jobs/"+job.id}>{job.date+" "+job.reported_fault}</Link></li>
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
            var product=stubApi.getProduct(sp.productId);
            var manufacturer=stubApi.getManufacturer(product.manufacturerId)
            return(
                <tr><td>{manufacturer.name}</td><td><Link to={"products/"+product.id}> {product.product_number}</Link></td>
                    <td>{sp.serialNumber}</td><td>{product.description}  <span onClick={this.deleteCustomerProduct} className={ "glyphicon glyphicon-trash "+this.props.createJobButtonVisibility} aria-hidden="true"></span>
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
            var mname="";
            var pnumber="";
            var pdescription="";
            var cname="";
            var ctown="";

            if(customerProduct!="") {

                var customer = stubApi.getCustomer(customerProduct.customerId);
                console.log("cname"+customer.name);
                var product = stubApi.getProduct(customerProduct.productId);
                var manufacturer = stubApi.getManufacturer(product.manufacturerId);
                cname=customer.name;
                ctown=customer.town;
                mname=manufacturer.name;
                pnumber=product.product_number;
                pdescription=product.description.split(",")[0];
            }






            return(
                <div>
                    <h3> Create New Job</h3>
                    <form>
                        <label>Customer Product</label>
                        <div className="form-group">
                            <input type="text" name="customerProduct" disabled

                                   value={mname+" "
                        +pnumber
                        +pdescription}>
                            </input>
                        </div>
                        <label>Customer</label>
                        <div className="form-group">
                            <input type="text" name="customer" disabled
                                   value={ cname+", "+ctown    } >

                            </input>
                        </div>

                        <label>Reported Fault</label>
                        <div className="form-group">

                            <input onChange={this.props.setReportedFaultFromForm}  type="text" name="reported fault">

                            </input>
                        </div>
                        <button onClick={this.props.saveJob} className="btn btn-sm btn-primary form-button">Save</button>
                        <button onClick={this.props.cancelJobSave}  className="btn btn-sm btn-primary form-button">Cancel</button>

                    </form>
                </div>


            );
        }

    });

exports.customerPageContent=CustomerPageContent;
exports.customerForm=CustomerForm;