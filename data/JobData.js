var customers=require('CustomerData.js').customers;
var parts=require('PartData.js').parts;


var jobs
[


    {
        reported_fault:"Oven not working",
        status:'allocated',
        customer:customers[0],
        customerProduct:this.customer.customerProducts[0],
        jobParts:
        [
            {part:parts[37],
              quantity: "1"
            }
        ]
    },
    {
        reported_fault:"Grill not working",
        status:'unallocated',
        customer:customers[0],
        customerProduct:this.customer.customerProducts[0]
    },
    {
        reported_fault:"Noise from machine",
        status:'allocated',
        customer:customers[0],
        customerProduct:this.customer.customerProducts[1],
        jobParts:
            [
                {part:parts[0],
                    quantity: "1"
                }
            ]
    },
    {
        reported_fault:"Machine will not turn on",
        status:'allocated',
        customer:customers[5],
        customerProduct:this.customer.customerProducts[0],
        jobParts:
            [
                {part:parts[14],
                    quantity: "1"
                }
            ]
    },

    {
        reported_fault:"Machine will not empty",
        status:'unallocated',
        customer:customers[3],
        customerProduct:this.customer.customerProducts[0]
    },
    {
        reported_fault:"Ring not working",
        status:'allocated',
        customer:customers[1],
        customerProduct:this.customer.customerProducts[0]
    },
    {
        reported_fault:"Nothing working on cooker",
        status:'allocated',
        customer:customers[4],
        customerProduct:this.customer.customerProducts[0]
    },
    {
        reported_fault:"Machine full of water",
        status:'allocated',
        customer:customers[5],
        customerProduct:this.customer.customerProducts[0],
        jobParts:
            [
                {part:parts[16],
                    quantity: "1"
                }
            ]
    },
    {
        reported_fault:"Machine leaking",
        status:'allocated',
        customer:customers[2],
        customerProduct:this.customer.customerProducts[0]
    }

]






exports.jobs=jobs;