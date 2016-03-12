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

var ProductPageContent=React.createClass({
    render:function()
    {
        return(
            <div className="row">
                <div className="col-md-2 side-pane">
                    <ProductSideBar activeId={this.props.activeId} products={this.props.products}/>

                </div>
                <div className="col-md-10 main-pane">
                    <ProductMainPane activeId={this.props.activeId} products={this.props.products}/>
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
                    <p><Link to="product/new">New Product +</Link></p>
                    <ProductList activeId={this.props.activeId} products={this.props.products}/>
                </div>
            </div>

        );
    }
});

var ProductMainPane=React.createClass({
    render:function(){
        var products=this.props.products;
        var product=products[this.props.activeId];
        var manufacturer=product.manufacturer;

        var partOptions=parts.map(function(part,index){
            return <PartOption part={part} />
        });
        var bom=product.bom.map(function(bi,index)
            {
                return(<SingleBomItem bi={bi} />);
            }

        );
        return(
            <div>
                <div className="col-md-8">
                    <h3><strong>Manufacturer Details</strong></h3>
                    <p>
                        {manufacturer.name}<br/>
                        {manufacturer.street}<br/>
                        { manufacturer.town}<br/>
                        {manufacturer.county}<br/>
                        {manufacturer.phone}<br/>
                        {manufacturer.email}<br/>
                    </p>





                    <h3><strong>Bill of Material</strong></h3>
                    <p>The customer has no registered products</p>
                    <table className="table table-striped">
                        <thead>

                        <tr><th>Part Number</th><th>Description</th><th>Quantity</th> </tr>

                        </thead>

                        <tbody>
                        {bom}


                        </tbody>
                    </table>
                    <h3><strong>Add Part to Bill of Material</strong></h3>
                    <form>
                        <div className="form-group">
                            <label for="productNumber">Product</label>
                            <select>
                                {partOptions}
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
                        <input type="button" className="btn btn-sm btn-primary" action="submit" value="Add"/>
                    </form>
                </div>

                <div className="col-md-4">
                    <h3>Product Details</h3>
                    <p>
                        {manufacturer.name} {product.product_number}<br/>
                        {product.description}<br/>

                    </p>

                    <h3>Exploded View</h3>
                    <img src={product.image_url} />
                </div>

            </div>

        );
    }
});

var PartOption=React.createClass(
    {

        render: function()
        {
            var part=this.props.part;
            return(
                <option value={part.id}>{part.part_number}:{part.description} </option>
            );
        }
    });



var SingleBomItem=React.createClass(
    {

        render:function(){
            var bi=this.props.bi;
            var part = bi.part;
            return(
                <tr><td>{part.part_number}</td><td>{part.description}</td><td>{bi.quantity}</td>
                    <td><button className="btn btn-sm btn-primary">Edit</button></td><td><button className="btn btn-primary">Delete</button></td></tr>
            );
        }
    }
);


var ProductSearchbox=React.createClass({
    render: function(){



        return(


            <div className="row">
                <input type="text"  placeholder="Search"/>
            </div>



        );

    }
});


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




var ProductForm=React.createClass(
    {
        render:function()
        {


            var manOptions=manufacturers.map(function(man,index){
                return <ManOption man={man} />});
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


                                        <label>Manufacturer</label>
                                        <div className="form-group">

                                            <select name="manufacturer">
                                                {manOptions}
                                            </select>
                                        </div>
                                        <label>Product Number</label>
                                        <div className="form-group">

                                            <input type="text" name="product_number">

                                            </input>
                                        </div>
                                        <label>Description</label>
                                        <div className="form-group">

                                            <input type="text" name="description">

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


var ManOption=React.createClass(
    {
        render: function () {

            var man = this.props.man;
            return (
                <option>{man.name}</option>
            );
        }
    });

exports.productPageContent=ProductPageContent;
exports.productForm=ProductForm;