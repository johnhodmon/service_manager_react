var ReactDOM = require('react-dom');
var React = require('react');
var jobs=require('data/JobData.js').jobs;



var JobPage=React.createClass(
    {
        render:function()
            {
                return(
                   <div className="container">
                   <Navbar />
                   <PageContent/>
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
                    <SideBar/>

                </div>
                <div className="col-md-8">
                    <MainPane/>
                </div>

            </div>
        );
    }
});

var Navbar=React.createClass({
        render: function ()
        {
            return(
                <div className="row">
                <div role="navigation" className="col-md-9">
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



var SideBar=React.createClass({
    render:function(){
        return(
            <div>
            <Searchbox/>
            <List/>
            </div>

        );
    }
});

var Searchbox=React.createClass({
    render: function(){
        var jobsToShow = this.props.jobs.map(function(job,index) {
            return <SingleJob jobs={this.props.jobs} key={index}  job={job} />
        }.bind(this));



        return(
            <div className="col-md-10">
                <ul className="phones">
                    {jobsToShow}

                </ul>
            </div>
        );

    }
});

var List=reactClass(
    {
        render:function()
            {

                var jobsToDisplay = this.props.jobs.map(function(job,index) {
                    return <SingleJob jobs={this.props.jobs} key={index}  job={job} />
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
                    <a href="#">{job.product.description}</a><br/>
                    <a href="#">{job.customer.name}</a>  <br/>
                    {job.customer.town}<br/>
                    {job.status}

                </p>



            </li>);
    }
});

ReactDOM.render(
    <JobPage  />,
    document.getElementById('mount-point')
);