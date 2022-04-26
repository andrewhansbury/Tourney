

import React, {Component } from 'react';


import Menu from './Menu.js';
import Game from './Game.js'
import CreateDecider from './CreateDecider.js';

class App extends Component {

	constructor(props){
		super(props)
		this.setCreateStates = this.setCreateStates.bind(this);
		this.setJoinStates = this.setJoinStates.bind(this);
		this.setMenuStates = this.setMenuStates.bind(this);
		this.setBankName = this.setBankName.bind(this);

		this.state = {
			menuScreenState: true,
			joinScreenState: false,
			createScreenState: false,
			madeScreenState: false,
			game_code: null,
			bank_name : null
		};

	}



	setGameCode(code){
		this.setState({game_code: code});
	}

	setBankName(name){
		this.setState({bank_name: name});
		console.log("bank name set", this.state.bank_name)
	}
	

	setCreateStates(){
		this.setState({menuScreenState: false});
		this.setState({createScreenState: true});
	}

	setJoinStates(){
		this.setState({menuScreenState: false});
		this.setState({joinScreenState: true});

	}

	setMenuStates(){
		this.setState({menuScreenState: true});
		this.setState({createScreenState: false});
		this.setState({joinScreenState: false});
		this.setState({madeScreenState: false});

	}

	setMadeStates(){
		this.setState({menuScreenState: false})
		this.setState({madeScreenState: true})

	}

	


	render(){
		
		return(
			
			this.state.menuScreenState ? 
			<div className="App">
				{}
				
				<Menu setMadeStates = {this.setMadeStates.bind(this)} setGameCode = {this.setGameCode.bind(this)}
				 setCreateStates = {this.setCreateStates} setJoinStates={this.setJoinStates} setBankName={this.setBankName} />
			</div>
			:
			this.state.createScreenState ? 
			
			<div className="App">
				<CreateDecider create={true} setGameCode = {this.setGameCode.bind(this)} game_code={this.state.game_code} 
				 setMenuStates ={this.setMenuStates} />

			</div>
			:
			this.state.joinScreenState ?
			<div className="App">
				<Game setMenuStates ={this.setMenuStates} game_code={this.state.game_code} bank_name={this.state.bank_name}/>
			</div>
			
			:

			this.state.madeScreenState ?

			<div className="App">
				<CreateDecider made={true} setGameCode = {this.setGameCode.bind(this)} game_code={this.state.game_code} 
				 setMenuStates ={this.setMenuStates} />

			</div>

			:

			null
		

		)
			
				
	}

}




export default App;
