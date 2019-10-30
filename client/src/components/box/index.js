import React,{Component} from 'react'
import './index.css'

export default class Box extends Component{
    constructor(props){
        super(props)
        this.state = {

        }

    }
    render(){
        return (
            <div className="box">
                <img src={this.props.gambar} style={{height:"100px",width:"100px"}}/>
                <h1 style={{fontSize:"15px"}}>{this.props.name}</h1>
            </div>
        )
      }
}