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

var PartPageContent=React.createClass({

    getInitialState:function()
    {
        var part=parts[this.props.id];


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
        return(

            <div>
                <div className="col-md-3">
                    <h3><strong>Part Details</strong></h3>
                    <p>
                       Part Number: {partDisplayed.part_number}<br/>
                        {partDisplayed.description}<br/>
                        Cost: &#8364;{partDisplayed.cost}<br/>
                        Qauntity in Stock: {partDisplayed.quantity_in_stock}<br/>

                    </p>
                </div>
                <div className="col-md-6">
                    <h3><strong>Products Where Used</strong></h3>
                    <table className="table table-striped">
                        <thead>
                        <tr><th>Product Name</th><th>Description</th><th>quantity</th></tr>
                        </thead>
                        <tbody><tr><td>Data</td><td>data</td><td>data</td></tr></tbody>
                    </table>
                </div>
                <div className="col-md-3">
                    <h3><strong>History</strong></h3>
                </div>

            </div>

        );
    }
});



exports.partPageContent=PartPageContent;