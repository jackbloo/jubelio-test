import React,{Component} from 'react'
import './index.css'
import Box from '../../components/box'
import {toJS} from 'mobx'
import {observer,inject} from 'mobx-react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

 


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
        if(this.props.store.loading){
            return(<div className="loading"><div className="spinner"></div></div>)
        }else{
            return (
                <div className="groups">
                        <Carousel className="jumbotron" showThumbs={false} showIndicators={false} showStatus={false} autoPlay={true}>
                            <div>
                                <img src="https://cdn.elevenia.co.id/browsing/banner/2019/10/25/8558/2019102516272557534_9795098_1.jpg" className="gambar" alt="1"/>
                            </div>
                            <div>
                                <img src="https://cdn.elevenia.co.id/browsing/banner/2019/10/29/7710/2019102915302920275_9791761_1.jpg" className="gambar" alt="2"/>
                            </div>
                            <div>
                                <img src="https://cdn.elevenia.co.id/browsing/banner/2019/09/10/8263/2019091010541036767_9111919_1.jpg" className="gambar" alt="3"/>
                            </div>
                        </Carousel>
                    <div className="items">
                        {
                            toJS(this.props.store.products).map((el,i)=>{
                                return <Box  key={el.id} id={el.id} name={el.name} gambar={el.gambar} description={el.description} harga={el.harga} sku={el.sku}/>
                            })
                        }
                    </div>


                </div>
              
        )
        }
        }

}

export default inject('store')(observer(Products))