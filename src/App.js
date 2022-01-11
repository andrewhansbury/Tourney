

import React, {Component, useState } from 'react';

import Form from './Form.js'
import Menu from './Menu.js';




class App extends Component {

	constructor(props){
		super(props)
		this.setCreateStates = this.setCreateStates.bind(this)
		this.setJoinStates = this.setJoinStates.bind(this)
		this.setMenuStates = this.setMenuStates.bind(this)

		this.state = {
			menuScreenState: true,
			joinScreenState: false,
			createScreenState: false
		}
		
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
			// console.log(this.state.menuScreenState)
			this.state.menuScreenState ? 
			<div className="App">
				
				<Menu setCreateStates = {this.setCreateStates} setJoinStates={this.setJoinStates} />
			</div>
			:
			this.state.createScreenState ? 
			
			<div className="App">
				<Form setMenuStates ={this.setMenuStates} />

			</div>
			:
			this.state.joinScreenState ?
			<div className="App">
				<h1>deez nutz</h1>
			</div>
			:
			null
		

		)
			
				
	}

}




export default App;
