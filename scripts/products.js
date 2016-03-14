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


    getInitialState:function()
    {
        return(
        {
            searchBoxContent: "",
            searchParameter:"manufacturer"
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
        var products=this.props.products;
        var list=products;
        var product=this.props.productDisplayed;

        console.log("search text"+this.state.searchBoxContent);
        if(this.state.searchParameter=="manufacturer") {

            list = products.filter(function (prod) {
                var manufacturer=stubApi.getManufacturer(prod.manufacturerId);
                return manufacturer.name.toLowerCase().search(this.state.searchBoxContent.toLowerCase()) != -1;
            }.bind(this));
        }

        else if (this.state.searchParameter=="description")
        {
            list = products.filter(function (prod) {
                 console.log("prod desc"+prod.description)
                return prod.description.toLowerCase().search(this.state.searchBoxContent.toLowerCase()) != -1;
            }.bind(this));
        }
        return(
            <div>
                <div className="row search-box-div">
                    <ProductSearchbox setSearchParameter={this.setSearchParameter} setSearchText={this.setSearchText}  />
                </div>
                <div className="row">
                    <p><Link to="product/new">New Product +</Link></p>
                    <ProductList selectNewProduct={this.props.selectNewProduct}  products={list} productDisplayed={this.props.productDisplayed}/>
                </div>
            </div>

        );
    }
});

var ProductSearchbox=React.createClass({

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
                        <option value="manufacturer">Product Manufacturer </option>
                        <option value="description">Product Description</option>

                    </select>
                </div>

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
        if(stubApi.getBomForProduct(this.props.productDisplayed.id).length!=0) {
            noParts="invisible";
        }

        return ({
            partsUsedVisibility:noParts,
            addPartVisibility:"invisible",
            addButtonVisibility:"",
            partIdToBeAdded:0,
            quantityToBeAdded:"1",

        });

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
        var partId=this.state.partIdToBeAdded;
        var productId=this.props.productDisplayed.id;
        var qty=this.state.quantityToBeAdded;
        stubApi.addBomItem(productId,partId,qty);
        this.setState({

        addPartVisibility:"invisible",
            addButtonVisibility:"",
        partsUsedVisibility:"invisible"});

    },

    deleteBomItem:function(id)
    {

        stubApi.deleteBomItem(id);
        if(stubApi.getBomForProduct(this.props.productDisplayed.id).length!=0) {

            this.setState ({partsUsedVisibility:"invisible"});
        }

        else
        {
            this.setState ({partsUsedVisibility:""});
        }

    },


    render:function(){
        var products=this.props.products;
        var productDisplayed=this.props.productDisplayed;
        var manufacturer=stubApi.getManufacturer(productDisplayed.manufacturerId);

        var partOptions=parts.map(function(part,index){
            return <PartOption  index={index} part={part} />
        });
        var bom=[];
        if(stubApi.getBomForProduct(this.props.productDisplayed.id).length!=0) {
            bom = stubApi.getBomForProduct(productDisplayed.id).map(function (bi, index) {
                    return (<SingleBomItem
                        addButtonVisibility={this.props.addButtonVisibility}
                        deleteBomItem={this.deleteBomItem} bi={bi}
                       qtyVisibility={this.state.qtyVisibility}

                    />);
                }.bind(this)
            );
        }
        return(
            <div>
                <div className="col-md-3">
                    <h3><strong>Manufacturer Details</strong></h3>
                    <p>
                        {manufacturer.name}<br/>
                        {manufacturer.street}<br/>
                        { manufacturer.town}<br/>
                        {manufacturer.county}<br/>
                        {manufacturer.phone}<br/>
                        {manufacturer.email}<br/>
                    </p>


</div>
                <div className="col-md-6">

                    <h3><strong>Bill of Material</strong></h3>

                    <table className="table table-striped">
                        <thead>

                        <tr><th>Part Number</th><th>Description</th><th>Quantity</th> </tr>

                        </thead>

                        <tbody>
                        <tr className={this.state.partsUsedVisibility}><td></td><td>This product does not yet have a bill of material</td><td></td></tr>

                        {bom}
                        <tr className={this.state.addButtonVisibility}><td></td><td/><td>Add Part  <span onClick={this.showAddPartForm} className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></td></tr>
                        <tr className={this.state.addPartVisibility}>  <td>{this.state.partNumber}</td><td><select  onChange={this.setPartIdToBeAdded}>{partOptions}</select></td>
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
                                <span onClick={this.savePart} className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                Cancel <span onClick={this.hideAddPartForm} className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span>
                            </td></tr>

                        </tbody>
                    </table>

                </div>

                <div className="col-md-3">
                    <h3><strong>Product Details</strong></h3>
                    <p>
                        {manufacturer.name} {productDisplayed.product_number}<br/>
                        {productDisplayed.description}<br/>

                    </p>

                    <h3><strong>Exploded View</strong></h3>
                    <img className="productImages" src={productDisplayed.image_url} />
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

        getInitialState:function()
        {

            return ({qtyVisibility:"",
                editedQuantity:"1",
                editPartVisibility:"invisible",
                qty:this.props.bi.quantity

            })



        },
        deleteBomItem:function()
        {
            var bi=this.props.bi;

            this.props.deleteBomItem(bi.id);
        },

        editBiQuantity:function()
        {
            this.props.editBom(this.props.bi.id);
        },

        editBiQuantity:function()
        {
            stubApi.updateBomQuantity(this.props.bi.id,this.state.editedQuantity)
            this.setState(
                {
                   qty:this.state.editedQuantity
                });
            this.hideEditPartForm();


        },

        hideEditPartForm:function()
        {
            this.setState(
                {
                    qtyVisibility:"",
                    editPartVisibility:"invisible"
                }
            );
        },

        showEditPartForm:function()
        {
            this.setState(
                {
                    qtyVisibility:"invisible",
                    editPartVisibility:""
                }
            );
        },

        setQuantityOfEditedPart:function(e)
        {
            e.preventDefault();
            console.log("qty: "+e.target.value);
            this.setState({
                editedQuantity:e.target.value
            })
        },


        render:function(){
            var bi=this.props.bi;
            var part = stubApi.getPart(bi.partId);
            console.log(this.state.editedQuantity);
                 return(
                <tr><td><Link to={"parts/"+part.id}>{part.part_number}</Link></td><td>{part.description}</td>
                    <td  className={this.state.qtyVisibility}>{this.state.qty}
                        <span onClick={this.showEditPartForm} className={"glyphicon glyphicon-pencil "+this.props.addButtonVisibility} aria-hidden="true"></span>
                        <span onClick={this.deleteBomItem} className={"glyphicon glyphicon-trash "+this.props.addButtonVisibility } aria-hidden="true"></span>

                    </td>
                    <td className={this.state.editPartVisibility}>
                        <input placeholder= {bi.quantity} type="number" onChange={this.setQuantityOfEditedPart}>

                        </input>

                        <span onClick={this.hideEditPartForm} className={"glyphicon glyphicon-remove "} aria-hidden="true"></span>
                        <span onClick={this.editBiQuantity} className={"glyphicon glyphicon-ok "} aria-hidden="true"></span>

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