'use strict';
const Hapi = require('@hapi/hapi');
const axios = require('axios')
const apiKey = `721407f393e84a28593374cc2b347a98`
const parser = require('xml2json-light');
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
        method: ['GET'],
        path: '/products/add',
        handler: async function (request, h) {
            try{
                let {data} = await axios({
                    method:'GET',
                    url:'http://api.elevenia.co.id/rest/prodservices/product/listing?page=1',
                    headers: {
                        "openapikey": apiKey,
                        "Content-type" : "application/xml"
                    }
                })
                let newData = parser.xml2json(data)
                let promises = []
                let myData = newData.Products.product
                for(let i = 0; i < myData.length;i++){
                    let item = {}
                    let name = myData[i].prdNm
                    let sku = myData[i].sellerPrdCd
                    let harga = myData[i].selPrc
                    let nomer = myData[i].prdNo
                    item["name"] = name
                    item["sku"] = sku
                    item["harga"] = Number(harga)
                    item["nomer"] = nomer
                    promises.push(item)
                }

                let promises2 = []
                for(let j = 0; j < promises.length;j++){
                    let response = await axios({
                        method:'GET',
                        url:`http://api.elevenia.co.id/rest/prodservices/product/details/${promises[j].nomer}`,
                        headers: {
                            "openapikey": apiKey,
                            "Content-type" : "application/xml"
                        }
                    })
                    promises2.push(response)
                }

                
                return Promise.all(promises2)
                .then(tes =>{
                    let total = []
                    tes.forEach((el)=>{
                        total.push(parser.xml2json(el.data))
                    })
                    let adding = []
                    for(let l = 0;l < promises.length;l++){
                        promises[l].gambar = total[l].Product.prdImage01
                        promises[l].description = total[l].Product.htmlDetail.slice(0,240)
                        delete promises[l].nomer
                        let create = Product.create(promises[l])
                        adding.push(create)
                    }


                    return Promise.all(adding)
                    .then(resp => {
                        return 'berhasil'
                    }).catch(error =>{
                        console.log(error)
                    })

                }).catch(error=>{
                    return error
                })


                //Nama Produk, SKU, Gambar, Description, Harga.
            }catch(error){
                return error
            }
        }
    });


    server.route({
        method:['GET'],
        path: '/products',
        handler: async function(request,h){
            try{
                let data = await Product.findAll()
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