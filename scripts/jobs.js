var ReactDOM = require('react-dom');
var React = require('react');
var jobs=require('../data/JobData.js').jobs;



var JobPage=React.createClass(
    {
        render:function()
            {
                return(
                   <div className="container">
                   <Navbar />
                   <PageContent jobs={this.props.jobs} />
                       </div>


                );

            }

    }
);

var Navbar=React.createClass({
        render: function ()
        {
            return(
                <div className="row">
                    <div role="navigation" className="col-md-12">
                        <ul className="nav navbar-nav">
                            <li><a href="#">Jobs</a></li>
                            <li><a href="#">Customers</a></li>
                            <li><a href="#">Products</a></li>
                            <li><a href="#">Stock Control</a></li>
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
                <div className="col-md-4">
                    <SideBar jobs={this.props.jobs}/>

                </div>
                <div className="col-md-8">
                    <MainPane/>
                </div>

            </div>
        );
    }
});



var SideBar=React.createClass({
    render:function(){
        return(
            <div className="row">
            <Searchbox/>
            <List jobs={this.props.jobs}/>
            </div>

        );
    }
});

var MainPane=React.createClass({
    render:function(){
        return(
            <div className="row">
                <div className="col-md-3">

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

                <div className="row" >
                    <div className="col-md-6">
                    <input type="text"  placeholder="Search"/>
                     </div>
                    <div className="col-md-6">
                    <select id="sort" >
                        <option value="date">Date</option>
                        <option value="name">Customer</option>
                        <option value="product">Customer</option>
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
                    <div className="col-md-10">
                        <ul className="phones">
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

            <li >
                <p>
                    <a href="#">{job.date}</a><br/>
                     <a href="#">{job.customerProduct.product.manufacturer.name+" "+job.customerProduct.product.description}</a><br/>
                    <a href="#">{job.customer.name}</a>  <br/>
                    {job.customer.town}<br/>


                </p>



            </li>);
    }
});

ReactDOM.render(
    <JobPage jobs={jobs} />,
    document.getElementById('mount-point')
);