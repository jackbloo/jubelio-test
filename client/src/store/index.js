import {observable,action,configure, decorate,runInAction} from 'mobx'
import axios from 'axios'
configure({ enforceActions: "observed" })
let baseURL = 'http://localhost:3200/'


class Store {
 products = []
 loading = false

async fetchProducts(){
    try{
        this.loading = true
        let {data} = await axios({
            method:'GET',
            url:baseURL + 'products'
        })
        runInAction(()=>{
            this.loading = false
            this.products = data
        })
    }catch(error){
        console.log(error)
    }
}

    setData(data){
        this.products = data
        this.loadig = false
    }
}

decorate(Store,{
    products:observable,
    loading:observable,
    fetchProducts:action,
    setData:action,
})

export const store = new Store()