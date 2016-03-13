ReactDOM = require('react-dom');
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var _=require('lodash');
var stubApi=require('../data/stubApi.js').stubApi;

var PartPageContent=React.createClass({

    getInitialState:function()
    {
        var part=stubApi.getPart(this.props.id);


        return ({

            partDisplayed:part
        });

    },

    selectNewPart:function(part)
    {


        this.setState ({

            partDisplayed:part
        });

    },


    render:function()
    {
        return(
            <div className="row">
                <div className="col-md-2 side-pane">
                    <PartSideBar selectNewPart={this.selectNewPart} partDisplayed={this.state.partDisplayed} parts={this.props.parts}/>

                </div>
                <div className="col-md-10 main-pane">
                    <PartMainPane partDisplayed={this.state.partDisplayed}  parts={this.props.parts}/>
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
                    <PartList selectNewPart={this.props.selectNewPart} partDisplayed={this.props.partDisplayed}  parts={this.props.parts}/>
                </div>
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


var PartList=React.createClass(
    {



        render:function()
        {


            var partsToDisplay = this.props.parts.map(function(part,index) {
                return <SinglePart selectNewPart={this.props.selectNewPart} partDisplayed={this.props.partDisplayed} activeId={this.props.activeId}  part={part} key={index} />
            }.bind(this));



            return(

                <ul className="nav nav-pills nav-stacked side-nav">
                    {partsToDisplay}

                </ul>

            );
        }

    }


);


var SinglePart=React.createClass({



    selectNewPart:function()
    {
        var part=this.props.part;
        this.props.selectNewPart(part);
    },

    render: function () {
        var part=this.props.part;

        return (

            <li onClick={this.selectNewPart}   className={(this.props.partDisplayed.id === part.id) ? "active" : ""} role="presentation" >


                <Link  to={"/parts/"+part.id} ><h3>{part.description}</h3>
                    <p>{"Part Number: "+part.part_number}</p></Link>





            </li>);
    }
});



var PartMainPane=React.createClass({
    render:function(){
        var parts=this.props.parts;
        var partDisplayed=this.props.partDisplayed;
        var whereUsed=[];
        var history=[];

        if(stubApi.getWhereUsed(partDisplayed.id)!=null)
        {
            whereUsed=stubApi.getWhereUsed(partDisplayed.id).map(function(bom,index)
            {
                return <SingleProduct bom={bom} index={index}   />
            });
        }

        if(stubApi.getJobHistory(partDisplayed.id)!=null)
        {
            console.log(" history"+stubApi.getJobHistory(partDisplayed.id))
            whereUsed=stubApi.getJobHistory(partDisplayed.id).map(function(jobPart,index)
            {
                return <SingleJob jobPart={jobPart} index={index}   />
            });
        }



        return(

            <div>
                <div className="col-md-3">
                    <h3><strong>Part Details</strong></h3>
                    <p>
                       Part Number: {partDisplayed.part_number}<br/>
                        {partDisplayed.description}<br/>
                        Cost: &#8364;{partDisplayed.cost}<br/>
                        Quantity in Stock: {partDisplayed.quantity_in_stock}<br/>

                    </p>
                </div>
                <div className="col-md-6">
                    <h3><strong>Products Where Used</strong></h3>
                    <table className="table table-striped">
                        <thead>
                        <tr><th>Product Name</th><th>Description</th><th>quantity</th></tr>
                        </thead>
                        <tbody>{whereUsed}</tbody>
                    </table>
                </div>
                <div className="col-md-3">
                    <h3><strong>History</strong></h3>
                    <table className="table table-striped">
                        <thead>
                        <tr><th>Date</th><th>Fault</th><th>quantity</th></tr>
                        </thead>
                        <tbody>{history}</tbody>
                    </table>
                </div>

            </div>

        );
    }
});

var SingleProduct=React.createClass({
    render:function() {

        var bom = this.props.bom;
        var product=stubApi.getProduct(bom.productId);
        var manufacturer=stubApi.getManufacturer(product.manufacturerId)

        return(

        <tr>
            <td>{manufacturer.name+" "+product.product_number}</td><td>{product.description}</td><td>{bom.quantity}</td>
        </tr>
    );

    }


});

var SingleJob=React.createClass({
    render:function() {

        var jobPart = this.props.jobPart;
        var job=stubApi.getJob(jobPart.jobId);


        return(

            <tr>
                <td>{job.date}</td><td><Link to={"jobs/"+job.id}>{job.reported_fault}</Link></td><td>{jobPart.quantity}</td>
            </tr>
        );

    }


});


exports.partPageContent=PartPageContent;