var parts=require('./PartData.js').parts;
var manufacturers=require('./ManData').manufacturers;
var products=[

    {
        id:0,
        manufacturer:manufacturers[0],
        product_number:'HCK1489',
        description:'Cooker, free standing, 60 CM, Electric',
        image_url:"/img/beko_cooker.jpg",
    },

    {
        id:1,
        manufacturer:manufacturers[1],
        product_number:'ECK6461',
        description:'Cooker, free standing, 60 CM, Electric',
        image_url:"/img/electrolux_cooker.png",

    },
    {
        id:2,
        manufacturer:manufacturers[2],
        product_number:'FSE60DOBLK',
        description:'Cooker, double oven, electric',
        image_url:"/img/belling_cooker.png",


    },
    {
        id:3,
        manufacturer:manufacturers[4],
        product_number:'BSVC563AK',
        description:'Cooker, double oven, electric',
        image_url:"/img/hotpoint_cooker.png",

    },

    {
        id:4,
        manufacturer:manufacturers[4],
        product_number:'IWSD61251',
        description:'Washing machine, 6KG, A+',
        image_url:"/img/hotpoint_machine.png",

    },
    {
        id:5,
        manufacturer:manufacturers[5],
        product_number:'WAT24460GB',
        description:'Washing machine, 8KG',
        image_url:"/img/bosch_machine.png",

    },
    {
        id:6,
        manufacturer:manufacturers[3],
        product_number:'WMBF944G',
        description:'Washing machine, 9KG, A+++, 1400 Spin',
        image_url:"/img/indesit_machine.png",

    },

    {
        id:7,
        manufacturer:manufacturers[0],
        product_number:'WMG 11464',
        description:'Washing Machine, 11KG, 1400 Spin',
        image_url:"/img/beko_machine.png",

    },
]

exports.products=products;