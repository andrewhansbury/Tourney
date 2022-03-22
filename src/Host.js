import React, { Component } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebase';

class Host extends Component {
    constructor(props){
        super(props)
    }

    displayPlayers(){
   

    }

    
    render() {
        return (
            <div className='All'>
                
                <h1>Waiting for players </h1> 
                <h2>Join at: {this.props.game_code}</h2> 
                <div className="dot-pulse"></div>
                

                


                <button className='begin-button btn-hover' >Begin!</button>
            </div>
        );
    }
}

export default Host;