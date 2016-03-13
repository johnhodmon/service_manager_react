var customers=require('./CustomerData.js').customers;
var parts=require('./PartData.js').parts;


var jobs=
[


    {
        id:0,
        reported_fault:"Oven not working",
        status:'allocated',
        date:'1st Feb 2016',
        customerId:0,
        customerProduct:customers[0].customerProducts[0],

        jobParts:
        [
            {part:parts[37],
              quantity: "1"
            }
        ]
    },
    {
        id:1,
        reported_fault:"Grill not working",
        status:'unallocated',
        date:'1st Feb 2016',
        customer:customers[0],
        customerProduct:customers[0].customerProducts[0]
    },
    {
        id:2,
        reported_fault:"Noise from machine",
        status:'allocated',
        date:'2nd Feb 2016',
        customer:customers[0],
        customerProduct:customers[0].customerProducts[1],
        jobParts:
            [
                {part:parts[0],
                    quantity: "1"
                }
            ]
    },
    {
        id:3,
        reported_fault:"Machine will not turn on",
        status:'allocated',
        date:'2nd Feb 2016',
        customer:customers[5],
        customerProduct:customers[5].customerProducts[0],
        jobParts:
            [
                {part:parts[14],
                    quantity: "1"
                }
            ]
    },

    {
        id:4,
        reported_fault:"Machine will not empty",
        status:'unallocated',
        date:'3rd Feb 2016',
        customer:customers[3],
        customerProduct:customers[3].customerProducts[0]
    },
    {
        id:5,
        reported_fault:"Ring not working",
        status:'allocated',
        date:'0rd Feb 2016',
        customer:customers[1],
        customerProduct:customers[1].customerProducts[0]
    },
    {
        id:6,
        reported_fault:"Nothing working on cooker",
        status:'allocated',
        date:'3rd Feb 2016',
        customer:customers[4],
        customerProduct:customers[4].customerProducts[0]
    },
    {
        id:7,
        reported_fault:"Machine full of water",
        status:'allocated',
        date:'4th Feb 2016',
        customer:customers[5],
        customerProduct:customers[5].customerProducts[0],
        jobParts:
            [
                {part:parts[16],
                    quantity: "1"
                }
            ]
    },
    {
        id:8,
        reported_fault:"Machine leaking",
        status:'allocated',
        date:'4th Feb 2016',
        customer:customers[2],
        customerProduct:customers[2].customerProducts[0]
    }

]






exports.jobs=jobs;