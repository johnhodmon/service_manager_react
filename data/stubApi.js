var jobs=require('./JobData.js').jobs;
var customers=require('./CustomerData.js').customers;
var products=require('./ProductData.js').products;
var parts=require('./PartData.js').parts;
var customerProducts=require('./CustomerProductData.js').customerProducts;
var jobParts=require('./JobPartData.js').jobParts;
var boms=require('./BomData.js').boms;
var manufacturers=require('./ManData.js').manufacturers;
var _ = require('lodash');


var stubAPI = {

//jobs
    addJob : function(date,reportedFault,customerProductId) {
        jobs.push({
            id:jobs.length,
            date: date,
            reported_fault : reportedFault,
            customerProductId:customerProductId


        }) ;
    },

    getAllJobs : function() {
        return jobs ;
    },

    getCustomerNameForJob:function(jobId)
    {
        var job=this.getJob(jobId);
        var customerProduct=this.getCustomerProduct(job.customerProductId);
        var customer=this.getCustomer(customerProduct.customerId);
        return customer.name;
    },

    getJob:function(jobId)
    {
        return _.find(jobs,function(j)
        {
            return j.id==jobId;
        })
    },

    getJobsForCustomer:function(customerid)
    {

        var jobsToReturn=_.filter(jobs,function(j)
        {
            return (this.getCustomerProduct(j.customerProductId).customerId)==customerid;
        }.bind(this));

        return jobsToReturn;
    },

    deleteJob : function(id) {
        var elements = _.remove(jobs,
            function(job) {
                return job.id == id;
            });
    },


    addJobPart : function(jobId,partId,quantity) {
        jobParts.push({
            id:jobParts.length,
            jobId:jobId,
            partId:partId,
            quantity:quantity

        }) ;

        console.log ( "id: "+jobParts.length+
            "jobId: "+jobId+
            "partId: "+partId+
            "quantity: "+quantity);

        console.log (jobParts.length);
    },

    getJobPartsForJob : function(jobId) {
        var jobPartsToReturn=_.filter(jobParts,function(jp)
        {
            return jp.jobId==jobId;
        })
        console.log("job parts size"+jobPartsToReturn.size);
        return jobPartsToReturn;
    },

    deleteJobPart : function(id) {
        var elements = _.remove(jobParts,
            function(jobPart) {
                return jobPart.id == id;
            });
    },


    updateJobPartQuanity : function(jobPartId,quantity) {
        var jobPartToUpdate=_.find(jobParts,function(jp){
            return jp.id==jobPartId;
        });

        console.log("updated jobpart"+

                "id: "+jobPartId+
                "jobId: "+jobPartToUpdate.jobId+
                "partId: " +jobPartToUpdate.partId+
                "quantity: "+quantity);
        if (jobPartToUpdate) {
            jobParts.splice(jobPartId, 1,
                {
                    id:jobPartId,
                    jobId:jobPartToUpdate.jobId,
                    partId: jobPartToUpdate.partId,
                   quantity:quantity
                });
        }
    },

    getCustomerProduct:function(id)
    {
        console.log("cp size"+customerProducts.length);
        return _.find(customerProducts,function(cp){
            return cp.id==id;
        });
    },


//customers##########################################

    addCustomer : function(customer)
    {
        var customer=customer;
        customer.id=customers.length;
        customers.push(customer);
        return customer.id;



    },

    getAllCustomers : function() {
        return customers ;
    },

    getCustomer:function(customerId)
    {
        return _.find(customers,function(c)
        {
            return c.id==customerId;
        })
    },


    addCustomerProduct : function(customerId,productId,serialNumber) {
        customerProducts.push({
            id:customerProducts.length,
            customerId:customerId,
            productId:productId,
            serialNumber:serialNumber
        }) ;
    },

    getCustomerProductsForCustomer : function(customerId) {
        var customerProductsToReturn=_.filter(customerProducts,function(cp)
        {
            return cp.customerId==customerId;
        })

        return customerProductsToReturn;
    },

    deleteCustomerProduct : function(id) {
        var elements = _.remove(customerProducts,
            function(cp) {
                return cp.id == id;
            });
    },

//products#################################################

    addProduct : function(manufacturerId,product_number,description) {
        products.push({

            id:products.length,
            manufacturerId:manufacturerId,
            product_number:product_number,
            description:description

        }) ;
    },

    getProduct:function(productId)
    {
       console.log("products length"+products.length);
        return _.find(products,function(p)
        {
            return p.id==productId;
        })
    },

    getAllProducts : function() {
        return products ;
    },


    addBomItem : function(productId,partId,quantity) {
        boms.push({
            id:boms.length,
            productId:productId,
            partId:partId,
            quantity:quantity

        }) ;

        console.log(
            "id: "+boms.length+
            "productId: "+productId+
            "partId: "+partId+
            "quantity: "+quantity
        )

        console.log(
            boms.length
        );
    },

    getBomForProduct : function(productId) {
        var bomsToReturn=_.filter(boms,function(bi)
        {
            return bi.productId==productId;
        })

        return bomsToReturn;
    },

    deleteBomItem : function(id) {
        var elements = _.remove(boms,
            function(bi) {
                return bi.id == id;
            });
    },


    updateBomQuantity : function(id,quantity) {
        var bomToUpdate=_.find(boms,function(bi){
            return bi.id==id;
        })


        if (bomToUpdate) {
            console.log("in function bomToUpdate: "+bomToUpdate.id);
            boms.splice(id, 1,
                {
                    id:id,
                    productId:bomToUpdate.productId,
                    partId: bomToUpdate.partId,
                    quantity:quantity
                });
        }
    },

    getManufacturer(manId)
    {
        return manufacturers[manId];
    },

    getProduct:function(productId)
    {
        return _.find(products,function(p)
        {
            return p.id==productId;
        })
    },

    //#################### Parts################


    getAllParts : function() {
        return parts ;
    },

    getPart:function(partId)
    {
        return _.find(parts,function(p)
        {
            return p.id==partId;
        })
    },

    getWhereUsed:function(partId){
      var bomsToReturn=  _.filter(boms,function(bi)
        {
            return bi.partId==partId;
        })
        return bomsToReturn;

    },

    getJobHistory:function(partId){
        var jobPartsToReturn=  _.filter(jobParts,function(jp)
        {
            return jp.partId==partId;
        })
        return jobPartsToReturn;

    },






}
exports.stubApi = stubAPI ;