var products=require('./ProductData.js').products;
var customers= [
    {
        name:'Stella Byrne',
        email:'stellabyrne@jmail.com',
        street: "2 south street",
        town: "New Ross",
        county: "Wexford",
        phone: "0519242233",
        customerProducts:[
            {
               product: products[0],
                serialNumber:"12345678"

            },
            {
                product: products[4],
                serialNumber:"12345679"

            }


        ]
    },

    {
        name:'Roy Murphy',
        email:'roymurphy@jmail.com',

        street: "2 bride street",
        town: "Wexford",
        county: "Wexford",
        phone: "0539124528",

        customerProducts:[
            {
                product:products[3],
                serialNumber:"12345680"
            }

        ]
    },
    {
        name:'Ciaran Meaney',
        email:'ciaranmeaney@jmail.com',

        street: "15 Patrick Street",
        town: "Enniscorthy",
        county: "Wexford",
        phone: "0539255687",

        customerProducts:[
            {
                product: products[2],
                serialNumber:"12345681"

            },
            {
                product: products[6],
                serialNumber:"12345682"

            }


        ]
    },
    {
        name:'Rie Nolan',
        email:'roynolan@jmail.com',

        street: "Ballyhack",
        town: "New Ross",
        county: "Wexford",
        phone: "0513892305",
        customerProducts:[
            {
                product: products[7],
                serialNumber:"12345683"

            },



        ]
    },
    {
        name:'Mary Hennessey',
        email:'mhennessey@jmail.com',

        street: "16 The Faythe",
        town: "Wexford",
        county: "Wexford",
        phone: "0539155876",
        customerProducts:[
            {
                product: products[1],
                serialNumber:"12345684"

            },



        ]

    },
    {
        name: 'Olly Murphy',
        email: 'omurphy@jmail.com',
        street: "Beach View",
        town: "Duncannon",
        county: "Wexford",
        phone: "0515587657",
        lat_lng: "52.220624,-6.9413368",
        customerProducts: [
            {
                product: products[5],
                serialNumber: "12345685"

            },


        ]

    }



]

exports.customers=customers