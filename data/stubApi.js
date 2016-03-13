var jobs=require('./JobData.js').jobs;
var customers=require('./CustomerData.js').customers;
var products=require('./ProductData.js').products;
var parts=require('./PartData.js').parts;
var customerProducts=('./data/CustomerProductData.js').customerProducts;
var JobParts=('./JobPartData.js').jobParts;
var Boms=('./BomData.js').boms;
var _ = require('lodash');


var stubAPI = {


    addJob : function(date,reportedFault,customerId,customerProductId) {
        jobs.push({
            date: date,
            reportedFault : reportedFault,
            customerId:customerId
            customerProductId:customerProductId


        }) ;
    },

    getAllJobs : function() {
        return jobs ;
    },

    deleteJob : function(id) {
        var elements = _.remove(jobs,
            function(job) {
                return job.id == job;
            });
    },


    addJobPart : function(date,reportedFault,customerId,customerProductId) {
        jobs.push({
            date: date,
            reportedFault : reportedFault,
            customerId:customerId
            customerProductId:customerProductId


        }) ;
    },

    getJobParts : function(job) {
        return jobs ;
    },

    deleteJob : function(id) {
        var elements = _.remove(jobs,
            function(job) {
                return job.id == job;
            });
    },


    update : function(key,n,a,p) {
        var index = _.findIndex(contacts, function(contact) {
            return contact.phone_number == key;
        } );
        if (index != -1) {
            contacts.splice(index, 1, {name: n, address: a, phone_number: p});
        }
    }
}
exports.api = stubAPI ;