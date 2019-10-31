import React,{Component} from 'react'
import './index.css'
import {observer,inject} from 'mobx-react'
import { withRouter } from "react-router-dom";
import axios from 'axios'

class Edit extends Component{
    constructor(){
        super()
        this.state ={
            name:'',
            sku:'',
            harga:null,
            gambar:'',
            description:'',
        }
    }


    async componentDidMount(){
            try{
                let {data} = await axios({
                    method:'GET',
                    url:'http://localhost:3200/products/' + this.props.match.params.id
                })
                 this.setState({
                    name:data.name,
                    sku:data.sku,
                    harga:data.harga,
                    gambar:data.gambar,
                    description:data.description,
                })
            }catch(error){
                console.log(error)
            }
    }

    clickUpdate(){
        axios({
            method:'PATCH',
            url:`http://localhost:3200/products/${this.props.match.params.id}`,
            data: {
                name:this.refs.name.value,
                sku:this.refs.sku.value,
                harga:this.refs.harga.value,
                gambar:this.refs.gambar.value,
                description:this.refs.description.value,
            }
        }).then(({data})=>{
            console.log('masuk')
        }).catch(error => {
            console.log(error)
        })
    }

    render(){
        return (
        <div className="grouping">
            <div className="jumbotron">
                <h2>Edit {this.state.name}</h2>
            </div>
            <div className="edit">
                <div className="forms">
                    <input type="text" placeholder="name" ref="name" defaultValue={this.state.name}/>
                    <input  type="text" placeholder="sku" ref="sku" defaultValue={this.state.sku}/>
                    <input  type="number" placeholder="harga" ref="harga" defaultValue={this.state.harga}/>
                    <input  type="text" placeholder="gambar" ref="gambar" defaultValue={this.state.gambar}/>
                    <textarea  placeholder="description" ref="description" defaultValue={this.state.description}/>
                    <input type="submit" onClick={this.clickUpdate.bind(this)}/>
                </div>
            </div>              
        </div>

        )
      }
}

export default withRouter(inject('store')(observer(Edit)))