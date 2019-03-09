import React, {Component} from 'react';
import io from 'socket.io-client'

const socketURL = ""
export default class Layout extends Component{

    constructor([props]){
        super(props);

        this.state = {
            socket:null
        };
    }

    initSocket = ()=>{
        const socket = io(socketURL)

        this.setState({socket})
    }

    render(){
        const { title } = title.this
        return(
            <div class="container">
                {title}
            </div>
        );
    }
}