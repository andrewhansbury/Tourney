import React, { Component } from 'react';

class Host extends Component {
    constructor(props){
        super(props)
    }

    
    render() {
        return (
            <div className='All'>
                
                <h1>Waiting for players </h1> <div className="dot-pulse"></div>
                <button className='begin-button btn-hover' >Begin!</button>
            </div>
        );
    }
}

export default Host;