

import React, { Component } from 'react';
import Create from './Create';
import Host from './Host';

class CreateDecider extends Component {
    constructor(props){

        super(props);
        this.setHostStates = this.setHostStates.bind(this)
        this.state = {
            createNewScreenState : true,
            hostScreenState : false
            
        }
    }

    setHostStates(){
        console.log(this.props.game_code)
        this.setState({hostScreenState: true})
		this.setState({createNewScreenState: false})
    }

    //figure out how to pass gameid from create component to the host component
    // create gameId state here and pass it to child?
        

    render() {
        
        return (
            
            this.state.createNewScreenState ?

            <Create setGameCode = {this.props.setGameCode.bind(this)} setMenuStates = {this.props.setMenuStates} setHostStates = {this.setHostStates} /> 
            :
            this.state.hostScreenState ?

            <Host game_code={this.props.game_code} setHostStates = {this.setHostStates} />
            :
            <div>Beans</div>
        );
    }
}

export default CreateDecider;