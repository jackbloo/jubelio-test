'use strict';
const axios = require('axios')
const apiKey = `721407f393e84a28593374cc2b347a98`
const parser = require('xml2json-light');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return new Promise(async (resolve,reject)=>{
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
                    for(let l = 0;l < promises.length;l++){
                        promises[l].gambar = total[l].Product.prdImage01
                        promises[l].description = total[l].Product.htmlDetail.slice(0,240)
                        promises[l].createdAt= new Date()
                        promises[l].updatedAt= new Date()
                        delete promises[l].nomer
                    }
                    return queryInterface.bulkInsert('Products', promises);
                    // resolve('DONE')
                }).catch(error=>{
                    reject(error)
                })


                //Nama Produk, SKU, Gambar, Description, Harga.
            }catch(error){
                reject(error)
            }
      })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
