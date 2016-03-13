var jobs=require('./JobData.js').jobs;
var customers=require('./CustomerData.js').customers;
var products=require('./ProductData.js').products;
var parts=require('./PartData.js').parts;
var customerProducts=('./data/CustomerProductData.js').customerProducts;
var jobParts=('./JobPartData.js').jobParts;
var boms=('./BomData.js').boms;
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

    getJob:function(jobId)
    {
        return _.find(jobs,function(j)
        {
            return j.id=jobId;
        })
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
            partId:partId,
            quantity:quantity

        }) ;
    },

    getJobPartsForJob : function(jobId) {
        var jobPartsToReturn=_.filter(jobParts,function(jp)
        {
            return jp.jobId==jobId;
        })

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
            return jp.id==id;
        })
        if (jobPartToUpdate) {
            jobParts.splice(jobPartId, 1,
                {
                    jobId:jobPartToUpdate.jobId,
                    partId: jobPartToUpdate.partId,
                   quantity:quantity
                });
        }
    },

    getCustomerProduct:function(jobId)
    {
        return _.find(customerProducts,function(cp){
            return cp.jobId==jobId;
        });
    },


//customers##########################################

    addCustomer : function(name,street,town,county,phone,email)
    {
        customers.push
        ({
            id:customers.length,
            name:name,
            street:street,
            town:town,
            county:county,
            phone:phone,
            email:email


        }) ;
    },

    getAllCustomers : function() {
        return customers ;
    },

    getCustomer:function(customerId)
    {
        return _.find(customers,function(c)
        {
            return c.id=customerId;
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

        return jobPartsToReturn;
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

    getAllProducts : function() {
        return products ;
    },


    addBomItem : function(productId,partId,quantity) {
        boms.push({
            id:boms.length,
            partId:partId,
            quantity:quantity

        }) ;
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


    updateBomQuanity : function(id,quantity) {
        var bomToUpdate=_.find(boms,function(bi){
            return bi.id==id;
        })
        if (bomToUpdate) {
            boms.splice(id, 1,
                {
                    productId:bomToUpdate.productId,
                    partId: bomToUpdate.partId,
                    quantity:quantity
                });
        }
    },

    getManufacturer(manId)
    {
        return manufacturers[mId];
    },

    getProduct:function(productId)
    {
        return _.find(products,function(p)
        {
            return p.id=productId;
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
            return p.id=partId;
        })
    },

    getWhereUsed:function(partId){
      var bomsToReturn=  _.find(boms,function(bi)
        {
            return bi.partId==partId;
        })
        return bomsToReturn;

    },

    getJobHistory:function(partId){
        var jobPartsToReturn=  _.find(jobParts,function(jp)
        {
            return jp.partId==partId;
        })
        return jobPartsToReturn;

    },






}
exports.stubApi = stubAPI ;