import React,{Component} from 'react'
import './index.css'
import Box from '../../components/box'
import {toJS} from 'mobx'
import {observer,inject} from 'mobx-react'


class Products extends Component{
    constructor(props){
        super(props)
        this.state = {
        }

    }
   async componentDidMount(){
    await this.props.store.fetchProducts()
    }

    render(){
            return (
                <div className="groups">
                    <div className="jumbotron">
                        <h1>Welcome to Project</h1>  
                    </div>
                    <div className="items">
                        {
                            toJS(this.props.store.products).map((el,i)=>{
                                return <Box key={el.id} name={el.name} gambar={el.gambar} description={el.description} harga={el.harga} sku={el.sku}/>
                            })
                        }
                    </div>


                </div>
              
        )
        }

}

export default inject('store')(observer(Products))