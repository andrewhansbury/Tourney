

import React, { Component } from 'react';
import Create from './Create';
import PreHost from './PreHost';
import Made from './Made';

class CreateDecider extends Component {
    constructor(props){

        super(props);
        this.setHostStates = this.setHostStates.bind(this)
        if (this.props.create == true){
            this.state = {
                createNewScreenState : true,
                hostScreenState : false,
                madeScreenState: false,
            }
            
        }
        else if (this.props.made == true){
            this.state = {
                createNewScreenState : false,
                hostScreenState : false,
                madeScreenState: true
            }
            
        }
        
    }

    setHostStates(){

        this.setState({createNewScreenState: false});
        this.setState({madeScreenState:false});
        this.setState({hostScreenState: true});
    }

    //figure out how to pass gameid from create component to the host component
    // create gameId state here and pass it to child?
        

    render() {
        
        return (
            
            this.state.createNewScreenState ?

            <Create setGameCode = {this.props.setGameCode.bind(this)} setMenuStates = {this.props.setMenuStates} setHostStates = {this.setHostStates} /> 
            :
            this.state.hostScreenState ?

            <PreHost game_code={this.props.game_code} setHostStates = {this.setHostStates} />
            :
            
			this.state.madeScreenState ?

				<Made setGameCode = {this.props.setGameCode.bind(this)} 
                setMenuStates ={this.props.setMenuStates}
                setHostStates = {this.setHostStates}
                />

            :
            <div>Beans</div>
        );
    }
}

export default CreateDecider;