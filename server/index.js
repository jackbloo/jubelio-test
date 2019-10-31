'use strict';
const Hapi = require('@hapi/hapi');

const {Product} = require('./models/index')

const init = async () => {

    const server = Hapi.server({
        port: 3200,
        host: 'localhost',
        "routes": {
            "cors": true
        }
    });


    server.route({
        method:['GET'],
        path: '/products',
        handler: async function(request,h){
            try{
                let data = await Product.findAll({order: [['updatedAt','DESC']]})
                return data
            }catch(error){
                return error
            }
    }
    })

    server.route({
        method:['GET'],
        path:`/products/{id}`,
        handler:async function(request,h){
            let {id} = request.params
            try{
                let data = await  Product.findOne({
                    where:{id}
                })
                return data
            }catch(error){
                return error
            }

        }
    })

    server.route({
        method:['DELETE'],
        path:`/products/{id}`,
        handler:async function(request,h){
            let {id} = request.params
            try{
                let data = await Product.destroy({
                    where:{id}
                })
                return 'Successfully Deleted'
            }catch(error){
                return error
            }

        }
    })

    server.route({
        method:['PATCH'],
        path:`/products/{id}`,
        handler: async function(request,h){
            console.log(request.payload, request.params)
            let {id} = request.params
            let {name,sku,gambar,description,harga} = request.payload
            let updateData = {}
            name && (updateData.name = name)
            sku && (updateData.sku = sku)
            gambar && (updateData.gambar = gambar)
            description && (updateData.description = description)
            harga && (updateData.harga = harga)
            try{
                let data = await Product.update(updateData,
                    {where:{id}
                })
                return 'Successfully Updated!'
            }catch(error){
                return error
            }

        }
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();