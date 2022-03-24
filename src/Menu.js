import React, { Component } from 'react';


class Menu extends Component{
    constructor(props){
        super(props);
		this.state = {
			game_code: null
		}
    }

    
	handleCodeInput = (event) => {
		this.setState({game_code: event.target.value});
		
	}

	
    handleJoinButtonClick(){
		if ( this.state.game_code == null || this.state.game_code.length < 6){
			alert("Must be a 6-Digit Code!")
			return
		}

		this.props.setGameCode(this.state.game_code);		
		this.props.setJoinStates();
	}

    handleCreateButtonClick () {
        this.props.setCreateStates();
	
	}

	handleMadeButtonClick(){
        // this.props.setCreateStates();
		this.props.setMadeStates();
	}


    render() {
        return (
			<div className="Menu-container">

				<div className="M_header">
					<h1>Tourney!</h1>
				</div>

				<div className="M_code_entry">
					<input value={this.game_code} onChange={this.handleCodeInput} className = "entry-1" type="text" placeholder="6-DIGIT CODE" maxLength="6" />
				</div>

				<div className="M_join_button">
					<button className="join-button btn-hover" onClick={() =>
						{this.handleJoinButtonClick()}}>Join!</button>
				</div>

				<div className="M_join_button">
					<button className="create-button btn-hover" onClick={ () => 
						{this.handleCreateButtonClick()}}> Create Game </button>
				</div>

				<div> 
					<button className='create-buttons' onClick={ () => 
						{this.handleMadeButtonClick()}}> I Already Made a Game</button>
				</div>

			</div>
		);
    }
}



export default Menu;

