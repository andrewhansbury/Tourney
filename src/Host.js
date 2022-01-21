

import React, { Component } from 'react';
import Create from './Create';

class Host extends Component {
    constructor(props){

        super(props);
        this.state = {
            createScreenState : false,
            hostScreenState : false
            
        }
    }
        
    render() {

        return (
            <Create/>
        );
    }
}

export default Host;