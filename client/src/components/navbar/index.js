import React,{Component} from 'react'
import './index.css'
import {withRouter} from 'react-router-dom'

class Navbar extends Component{
    constructor(props){
        super(props)
        this.state = {

        }

    }

    handleMove(){
        this.props.history.push('/')
    }
    render(){
        return (
                <div className="navs">
                    <div className="title">
                        <h1 onClick={this.handleMove.bind(this)}>Project</h1>  
                    </div>


                </div>
              
  

        )
      }
}

export default withRouter(Navbar)