DReactDOM = require('react-dom');
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var _=require('lodash');

var stubApi=require('../data/stubApi.js').stubApi;





var JobPageContent=React.createClass({




    getInitialState:function()
    {
       var id=0;
        if(this.props.id!=null)
        {
            id=this.props.id;
        }



        return ({

            jobDisplayed:stubApi.getJob(id)
        });

    },

    selectNewJob:function(job)
    {


       this.setState( {jobDisplayed:job});


    },


    render:function()
    {


        return(
            <div className="row">
                <div className="col-md-2 side-pane">
                    <JobSideBar  selectNewJob={this.selectNewJob} jobDisplayed={this.state.jobDisplayed} jobs={this.props.jobs}/>

                </div>
                <div className="col-md-10 main-pane">
                    <JobMainPane
                                 jobDisplayed={this.state.jobDisplayed}
                                 jobs={this.props.jobs}
                                 customerProduct={stubApi.getCustomerProduct(this.state.jobDisplayed.customerProductId)}
                                 parts={this.props.part}/>
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
            searchParameter:"date"
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
        var jobs=this.props.jobs;
        var list=jobs;
          if(this.state.searchParameter=="customerName") {

            list = jobs.filter(function (job) {

                return stubApi.getCustomerNameForJob(job.id).toLowerCase().search(this.state.searchBoxContent.toLowerCase()) != -1;
            }.bind(this));
        }

        else if (this.state.searchParameter=="date")
        {
            list = jobs.filter(function (job) {
                return job.date.toLowerCase().search(this.state.searchBoxContent.toLowerCase()) != -1;
            }.bind(this))
        }






        return(
            <div>
                <div className="row search-box-div">
                    <JobSearchbox setSearchParameter={this.setSearchParameter} setSearchText={this.setSearchText}/>
                </div>
                <div className="row">

                    <JobList selectNewJob={this.props.selectNewJob} jobDisplayed={this.props.jobDisplayed}  jobs={list}/>
                </div>
            </div>

        );
    }
});







var JobSearchbox=React.createClass({

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
                        <option value="date">Date</option>
                        <option value="customerName">Customer Name</option>

                    </select>
                </div>

            </div>
        );

    }
});






var JobList=React.createClass(
    {


        render:function()
        {

            var jobsToDisplay = this.props.jobs.map(function(job,index) {
                return <SingleJob jobDisplayed={this.props.jobDisplayed} selectNewJob={this.props.selectNewJob} job={job} key={index} />
            }.bind(this));



            return(

                <ul className="nav nav-pills nav-stacked side-nav">
                    {jobsToDisplay}

                </ul>

            );
        }

    }


);






var SingleJob=React.createClass({



    selectNewJob:function()
    {
        var job=this.props.job;

        this.props.selectNewJob(job);
    },


    render: function () {
        var job=this.props.job;
        var jobDisplayed=this.props.jobDisplayed;
        var job=this.props.job;
        var customerProduct=stubApi.getCustomerProduct(job.customerProductId);
        var product=stubApi.getProduct(customerProduct.productId);
        var manufacturer=stubApi.getManufacturer(product.manufacturerId);
        var customer =stubApi.getCustomer(customerProduct.customerId);

        return (

            <li onClick={this.selectNewJob} className={(jobDisplayed.id === +job.id) ? "active" : ""} role="presentation" >


                <Link  to={"/jobs/"+job.id} ><h3>{job.date}</h3>
                    <p>{manufacturer.name+" "+product.description.split(",")[0]}<br/>
                        {customer.name}  <br/>
                        {customer.town}<br/>
                        <br/></p></Link>





            </li>);
    }
});





var JobMainPane=React.createClass({


    getInitialState:function()
    {
        var puv="";
        var jobDisplayed=this.props.jobDisplayed;
        var boms=stubApi.getBomForProduct(this.props.customerProduct.productId)

        if(stubApi.getJobPartsForJob(jobDisplayed.id).length!=0) {
            puv="invisible";
        }
        return({
            partNumber:"",
            partId:boms[0].partId,
            quantityOfNewJobPart:"1",
            editedQuantity:"1",
            qtyVisibility:"",
            partsUsedVisibility:puv,
            addPartVisibility:"invisible",
            editPartVisibility:"invisible",
            addButtonVisibility:""});
    },

    showEditPartForm:function()
    {
        this.setState ({


            addButtonVisibility:"invisible",
            editPartVisibility:"",
            qtyVisibility:"invisible",



        })
    },

    hideEditPartForm:function()
    {
        this.setState ({


            addButtonVisibility:"",
            editPartVisibility:"invisible",
            qtyVisibility:"",


        })
    },

    showAddPartForm:function()
    {

        this.setState ({

            addPartVisibility:"",
            addButtonVisibility:"invisible"
        })

    },

    hideAddPartForm:function()
    {
        this.setState ({

            addPartVisibility:"invisible",
            addButtonVisibility:""})
    },


    setPartNumberAndId:function(e)
    {
        e.preventDefault();
        var part=stubApi.getPart(e.target.value)
        var partNumber=part.part_number;
        this.setState({partNumber:partNumber,
                        partId:e.target.value});
    },

    setQuantityOfNewJobPart:function(e)
    {
        e.preventDefault();
        console.log("qty: "+e.target.value);
        this.setState({
            quantityOfNewJobPart:e.target.value
        })
    },

    setQuantityOfEditedPart:function(e)
    {
        e.preventDefault();
        console.log("qty: "+e.target.value);
        this.setState({
            editedQuantity:e.target.value
        })
    },


    save:function(e)
    {
        var jobDisplayed=this.props.jobDisplayed;
        var part
        stubApi.addJobPart(jobDisplayed.id,this.state.partId,this.state.quantityOfNewJobPart);
        this.setState({partsUsedVisibility:"invisible"});
        this.hideAddPartForm();
    },

    deleteJobPart:function(jpId)
    {
        stubApi.deleteJobPart(jpId);
        if (stubApi.getJobPartsForJob(this.props.jobDisplayed.id).length==0)
        {
            this.setState({ partsUsedVisibility:""})
        }
        else {
            this.setState({partsUsedVisibility:"invisible"});
        }

    },

    editJobPart:function(jpId)
    {
        stubApi.updateJobPartQuanity(jpId,this.state.editedQuantity)
        this.hideEditPartForm();


    },


    render:function(){
        var jobs=this.props.jobs;
        var jobDisplayed=this.props.jobDisplayed;
        var customerProduct=this.props.customerProduct;
        var product=stubApi.getProduct(customerProduct.productId);
        var manufacturer=stubApi.getManufacturer(product.manufacturerId);
        var jobPartsToDisplay=[];
        var parts=this.props.parts;
        var boms=stubApi.getBomForProduct(customerProduct.productId)
        var customer=stubApi.getCustomer(customerProduct.customerId)
        var jobParts=stubApi.getJobPartsForJob(this.props.jobDisplayed.id);


        if(jobParts!=null)
        {

            jobPartsToDisplay=jobParts.map(function(jp,index)
            {
                return <SingleJobPart
                    editPartVisibility={this.state.editPartVisibility}
                    setQuantityOfEditedPart={this.setQuantityOfEditedPart}
                    deleteJobPart={this.deleteJobPart}
                    qtyVisibility={this.state.qtyVisibility}
                    editJobPart={this.editJobPart}
                    hideEditPartForm={this.hideEditPartForm}
                    showEditPartForm={this.showEditPartForm}
                    addButtonVisibility={this.state.addButtonVisibility}
                    jobPart={jp}
                    index={index}  />
            }.bind(this));
        }

        var selectOptions=boms.map(function(bomItem,index){
            return <SelectOption bomItem={bomItem} />
        });


        return(
            <div >
                <div className="row">
                    <div className="col-md-3">
                        <h3><strong>Customer Details</strong></h3>
                        <p>
                            <Link to={"customers/"+customer.id}>{customer.name}<br/>
                            {customer.street}<br/>
                            { customer.town}<br/>
                            {customer.county}<br/>
                            {customer.phone}<br/>
                            {customer.email}<br/>
                                </Link>
                        </p>
                    </div>

                    <div className="col-md-6">
                        <h3><strong>Job Details</strong></h3>
                        <p>
                            Fault reported on {jobDisplayed.date}<br/>
                            Fault description: {jobDisplayed.reported_fault}<br/>

                        </p>





                        <h3><strong>Parts Used</strong></h3>

                        <table className="table table-striped">
                            <thead>

                            <tr><th>Part Number</th><th>Description</th><th>Quantity</th> </tr>

                            </thead>

                            <tbody>
                            <tr className={this.state.partsUsedVisibility}><td></td><td>There were no parts used on this job</td><td></td></tr>
                            {jobPartsToDisplay}
                            <tr className={this.state.addButtonVisibility}><td></td><td/><td>Add Part  <span onClick={this.showAddPartForm} className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></td></tr>
                            <tr className={this.state.addPartVisibility}>  <td>{this.state.partNumber}</td><td><select  onChange={this.setPartNumberAndId}>{selectOptions}</select></td>
                                <td>
                                    <select onChange={this.setQuantityOfNewJobPart}>
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
                                    <span onClick={this.save} className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                    Cancel <span onClick={this.hideAddPartForm} className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                                </td></tr>

                            </tbody>
                        </table>


                    </div>

                    <div className="col-md-3">
                        <h3><strong>Product Details</strong></h3>
                        <p>
                            <Link to={"products/"+product.id}>
                            {manufacturer.name} {product.product_number}<br/>
                            {product.description}<br/>
                            Serial Number: {customerProduct.serialNumber}
                                </Link>

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
            var part=stubApi.getPart(bomItem.partId)

            return(
                <option value={part.id}>{part.description} </option>
            );
        }
    });

var SingleJobPart=React.createClass(
    {
        deleteJobPart:function()
        {
            var jobPart=this.props.jobPart;
            this.props.deleteJobPart(jobPart.id)
        },

        editJobPartQuantity:function()
        {
            this.props.editJobPart(this.props.jobPart.id);
        },






        render:function(){
            var jobPart=this.props.jobPart;
            var part = stubApi.getPart(jobPart.partId)

            return(
                <tr><td><Link to={"parts/"+part.id}>{part.part_number}</Link></td><td>{part.description}</td>
                    <td  className={this.props.qtyVisibility}>{jobPart.quantity}
                        <span onClick={this.props.showEditPartForm} className={"glyphicon glyphicon-pencil "+this.props.addButtonVisibility} aria-hidden="true"></span>
                        <span onClick={this.deleteJobPart} className={"glyphicon glyphicon-trash "+this.props.addButtonVisibility } aria-hidden="true"></span>

                    </td>
                    <td className={this.props.editPartVisibility}>
                        <input placeholder= {jobPart.quantity} type="number" onChange={this.props.setQuantityOfEditedPart}>

                            </input>

                        <span onClick={this.props.hideEditPartForm} className={"glyphicon glyphicon-remove "} aria-hidden="true"></span>
                        <span onClick={this.editJobPartQuantity} className={"glyphicon glyphicon-ok "} aria-hidden="true"></span>

                    </td>

                </tr>
            );
        }
    }
);

exports.jobPageContent=JobPageContent;