ReactDOM = require('react-dom');
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var _=require('lodash');
var products=require('../data/ProductData.js').products;
var parts=require('../data/PartData.js').parts;
var stubApi=require('../data/stubApi.js').stubApi;

var ProductPageContent=React.createClass({

    getInitialState:function()
    {
        var product=stubApi.getProduct(this.props.id);


        return ({

            productDisplayed:product
        });

    },

    selectNewProduct:function(product)
    {

        this.setState ({

            productDisplayed:product
        });

    },



    render:function()
    {

        return(
            <div className="row">
                <div className="col-md-2 side-pane">
                    <ProductSideBar selectNewProduct={this.selectNewProduct} productDisplayed={this.state.productDisplayed} products={this.props.products}/>

                </div>
                <div className="col-md-10 main-pane">
                    <ProductMainPane
                        productDisplayed={this.state.productDisplayed}
                        products={this.props.products}
                        addPartVisibility={this.state.addPartVisibility}
                        addPartVisible={this.showAddPartForm}
                        addPartInVisible={this.hideAddPartForm}
                        noPartsVisibility={this.state.noPartsVisibility}
                        addButtonVisibility={this.state.addButtonVisibility}/>
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
                    <ProductList selectNewProduct={this.props.selectNewProduct}  products={this.props.products} productDisplayed={this.props.productDisplayed}/>
                </div>
            </div>

        );
    }
});


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
                return <SingleProduct selectNewProduct={this.props.selectNewProduct}  productDisplayed={this.props.productDisplayed}  product={product} key={index} />
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


    selectNewProduct:function()
    {
        var product=this.props.product;
        this.props.selectNewProduct(product);
    },


    render: function () {
        var product=this.props.product;
        var manufacturer=stubApi.getManufacturer(product.manufacturerId);

        return (

            <li onClick={this.selectNewProduct} className={(this.props.productDisplayed.id === product.id) ? "active" : ""} role="presentation" >


                <Link  to={"/products/"+product.id} ><h3>{manufacturer.name+" "+product.product_number}</h3>
                    <p>

                        {product.number}</p></Link>





            </li>);
    }
});

var ProductMainPane=React.createClass({



    getInitialState:function()
    {

        var noParts=""
        if(stubApi.getBomForProduct(this.props.productDisplayed.id)!=null) {
            noParts="invisible";
        }

        return ({
            partsUsedVisibility:noParts,
            addPartVisibility:"invisible",
            addButtonVisibility:"",
            partIdToBeAdded:"",
            quantityToBeAdded:"",
        });

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



    setPartIdToBeAdded:function(e)
    {
        e.preventDefault();
        this.setState({partIdToBeAdded:e.target.value});
    },

    setQuantityToBeAdded:function(e)
    {
        e.preventDefault();
        this.setState({quantityToBeAdded:e.target.value});
    },


    savePart:function(e)
    {
        this.props.hideAddPartForm();
        var partId=this.state.partIdToBeAdded;
        var productId=this.props.productDisplayed.id;
        var qty=this.state.quantityToBeAdded;
        stubApi.addBomItem(productId,partId,qty);
    },

    deleteBomItem:function(id)
    {

        stubApi.deleteBomItem(id);
        this.setState({});
    },


    render:function(){
        var products=this.props.products;
        var productDisplayed=this.props.productDisplayed;
        var manufacturer=stubApi.getManufacturer(productDisplayed.manufacturerId);

        var partOptions=parts.map(function(part,index){
            return <PartOption  index={index} part={part} />
        });
        var bom=stubApi.getBomForProduct(productDisplayed.id).map(function(bi,index)
            {
                return(<SingleBomItem addButtonVisibility={this.props.addButtonVisibility} deleteBomItem={this.deleteBomItem} bi={bi} />);
            }.bind(this)

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

                    <table className="table table-striped">
                        <thead>

                        <tr><th>Part Number</th><th>Description</th><th>Quantity</th> </tr>

                        </thead>

                        <tbody>

                        {bom}
                        <tr className={this.props.addButtonVisibility}><td></td><td/><td>Add Part  <span onClick={this.makeVisible} className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></td></tr>
                        <tr className={this.props.addPartVisibility}>  <td>{this.state.partNumber}</td><td><select  onChange={this.setPartIdToBeAdded}>{partOptions}</select></td>
                            <td>
                                <select onChange={this.setQuantityToBeAdded}>
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
                                <span onClick={this.hideAddPartForm} className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                Cancel <span onClick={this.savePart} className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                            </td></tr>

                        </tbody>
                    </table>

                </div>

                <div className="col-md-4">
                    <h3>Product Details</h3>
                    <p>
                        {manufacturer.name} {productDisplayed.product_number}<br/>
                        {productDisplayed.description}<br/>

                    </p>

                    <h3>Exploded View</h3>
                    <img src={productDisplayed.image_url} />
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

        deleteBomItem:function()
        {
            var bi=this.props.bi;

            this.props.deleteBomItem(bi.id);
        },
        render:function(){
            var bi=this.props.bi;
            var part = stubApi.getPart(bi.partId);

            return(
                <tr><td><Link to={"parts/"+part.id}>{part.part_number}</Link></td><td>{part.description}</td>
                    <td>{bi.quantity}
                        <span className={"glyphicon glyphicon-pencil "+this.props.addButtonVisibility} aria-hidden="true"></span>
                        <span onClick={this.deleteBomItem} className={"glyphicon glyphicon-trash "+this.props.addButtonVisibility } aria-hidden="true"></span>

                    </td>

                </tr>
            );
        }
    }
);





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