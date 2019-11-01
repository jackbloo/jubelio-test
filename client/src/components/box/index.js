import React,{Component} from 'react'
import './index.css'
import { withRouter } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast} from 'react-toastify';
import {observer,inject} from 'mobx-react'
import axios from 'axios' 

class Box extends Component{
    constructor(props){
        super(props)
        this.state = {

        }

    }

    handleClick(){
        this.props.history.push(`/${this.props.id}`)
    }

    deleteItem = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick:()=>{
                    axios({
                        method:'DELETE',
                        url:'http://localhost:3200/products/' + this.props.id
                    })
                    .then(async({data})=>{
                        toast.success('Success', 'Your Item is deleted ')
                        return this.props.store.fetchProducts()
                    })
                    .catch(error =>{
                        let message = (error.response && error.response.data.message) || 'Fail to Delete'
                        toast.error('Fail',message)
                    })
                }
              },
              {
                label: 'No',
              }
            ]
          });
    }

    render(){
        return (
            <div className="box" >
                <img src={this.props.gambar} className="pict" alt={this.props.name}/>
                <h1 style={{fontSize:"12px"}}>{this.props.name}</h1>
                <p><i className="fas fa-tag"></i> {this.props.harga.toLocaleString('en-ID', {style: 'currency', currency: 'IDR'})}</p>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between", alignItems:"space-around",width:"30%"}}>
                    <button onClick={this.handleClick.bind(this)}>Edit</button>
                    <button onClick={this.deleteItem.bind(this)}>Delete</button>
                </div>
            </div>
        )
      }
}

export default withRouter(inject('store')(observer(Box))) 