ReactDOM = require('react-dom');
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
                                 customerProduct={stubApi.getCustomerProduct(this.state.jobDisplayed.id)}
                                 jobParts={stubApi.getJobPartsForJob(this.state.jobDisplayed.id)}
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

        var sortedList=_.sortBy(list,this.state.sortBy);


        return(
            <div>
                <div className="row search-box-div">
                    <JobSearchbox setSortBy={this.setSortBy} setSearchText={this.setSearchText}/>
                </div>
                <div className="row">

                    <JobList selectNewJob={this.props.selectNewJob} jobDisplayed={this.props.jobDisplayed}  jobs={sortedList}/>
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

        return (

            <li onClick={this.selectNewJob} className={(jobDisplayed.id === +job.id) ? "active" : ""} role="presentation" >


                <Link  to={"/jobs/"+job.id} ><h3>{job.date}</h3>
                    <p>{job.customerProduct.product.manufacturer.name+" "+job.customerProduct.product.description.split(",")[0]}<br/>
                        {job.customer.name}  <br/>
                        {job.customer.town}<br/>
                        {job.status}<br/></p></Link>





            </li>);
    }
});





var JobMainPane=React.createClass({


    getInitialState:function()
    {
        var puv="";
        var jobDisplayed=this.props.jobDisplayed;
        if(stubApi.getJobPartsForJob(jobDisplayed.id)!=null) {
            puv="invisible";
        }
        return({
            partNumber:"",
            partId:"",
            quantityOfNewJobPart:"",
            partsUsedVisibility:puv,
            addPartVisibility:"invisible",
            addButtonVisibility:"",});
    },



    showAddPartForm:function()
    {
        console.log("make visible");
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
        this.setState({
            quantityOfNewJobPart:e.target.value
        })
    },


    save:function(e)
    {
        var jobDisplayed=this.props.jobDisplayed;
        var part
        stubApi.addJobPart(jobDisplayed.id,this.state.partId,this.state.quantity)
        this.hideAddPartForm();
    },

    deleteJobPart:function(jpId)
    {
        stubApi.deleteJobPart(jpId);
        this.setState({});

    },


    render:function(){
        var jobs=this.props.jobs;
        var jobDisplayed=this.props.jobDisplayed;
        var customerProduct=this.props.customerProduct;
        var product=stubApi.getProduct(customerProduct.productId);
        var jobPartsToDisplay=[];
        var parts=this.props.parts;
        var boms=stubApi.getBomForProduct(customerProduct.productId)
        var customer=stubApi.getCustomer(customerProduct.customerId)


        if(this.props.jobParts!=null)
        {
            jobPartsToDisplay=this.props.jobParts.map(function(jp,index)
            {
                return <SingleJobPart deleteJobPart={this.deleteJobPart} addButtonVisibility={this.state.addButtonVisibility} jobPart={jp} index={index} makeVisible={this.makeVisible}  />
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
                            <tr className={this.props.addButtonVisibility}><td></td><td/><td>Add Part  <span onClick={this.makeVisible} className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></td></tr>
                            <tr className={this.state.addPartVisibility}>  <td>{this.state.partNumber}</td><td><select  onChange={this.setPartNumber}>{selectOptions}</select></td>
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
                                    Cancel <span onClick={this.hideAddPartForm()} className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                                </td></tr>

                            </tbody>
                        </table>


                    </div>

                    <div className="col-md-3">
                        <h3><strong>Product Details</strong></h3>
                        <p>
                            <Link to={"products/"+product.id}>
                            {product.manufacturer.name} {product.product_number}<br/>
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
        render:function(){
            var jobPart=this.props.jobPart;
            var part = stubApi.getPart(jobPart.partId)
            var makeVisible=this.props.makeVisible;
            return(
                <tr><td><Link to={"parts/"+part.id}>{part.part_number}</Link></td><td>{part.description}</td>
                    <td>{jobPart.quantity}
                        <span className={"glyphicon glyphicon-pencil "+this.state.addButtonVisibility} aria-hidden="true"></span>
                        <span onClick={this.deleteJobPart} className={"glyphicon glyphicon-trash "+this.state.addButtonVisibility } aria-hidden="true"></span>

                    </td>

                </tr>
            );
        }
    }
);

exports.jobPageContent=JobPageContent;