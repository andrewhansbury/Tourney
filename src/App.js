

import React, {Component, useState } from 'react';



import Create from './Create.js'
import Menu from './Menu.js';
import Game from './Game.js'

import { onSnapshot, collection } from 'firebase/firestore';
import { useEffect } from 'react';
import firebase from './firebase.js';
import db from "./firebase";
import CreateDecider from './CreateDecider.js';

class App extends Component {

	constructor(props){
		super(props)
		this.setCreateStates = this.setCreateStates.bind(this);
		this.setJoinStates = this.setJoinStates.bind(this);
		this.setMenuStates = this.setMenuStates.bind(this);
		// this.setGameCode = this.setGameCode.bind(this);

		this.state = {
			menuScreenState: true,
			joinScreenState: false,
			createScreenState: false,
			game_code: null
		};

	}



	setGameCode(code){
		this.setState({game_code: code});
	}
	

	setCreateStates(){
		this.setState({menuScreenState: false})
		this.setState({createScreenState: true})
	}

	setJoinStates(){
		this.setState({menuScreenState: false})
		this.setState({joinScreenState: true})

	}

	setMenuStates(){
		this.setState({menuScreenState: true})
		this.setState({createScreenState: false})
	}

	


	render(){
		
		return(
			
			this.state.menuScreenState ? 
			<div className="App">
				{}
				
				<Menu setGameCode = {this.setGameCode.bind(this)} setCreateStates = {this.setCreateStates} setJoinStates={this.setJoinStates} />
			</div>
			:
			this.state.createScreenState ? 
			
			<div className="App">
				<CreateDecider setGameCode = {this.setGameCode.bind(this)} game_code={this.state.game_code} setMenuStates ={this.setMenuStates} />

			</div>
			:
			this.state.joinScreenState ?
			<div className="App">
				<Game setMenuStates ={this.setMenuStates} game_code={this.state.game_code}/>
			</div>
			:
			null
		

		)
			
				
	}

}




export default App;
