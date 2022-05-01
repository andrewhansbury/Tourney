import React, { Component } from 'react';
import { doc, getDoc} from "firebase/firestore";
import { db } from './firebase';
import { BeatLoader } from 'react-spinners';


class Menu extends Component{
    constructor(props){
        super(props);
		this.state = {
			loading : false,
			game_code: null
		}
    }

    
	handleCodeInput = (event) => {
		this.setState({game_code: event.target.value});
		
	}


	enterPress = (e) =>{
		if (e.keyCode === 13) {
			this.handleJoinButtonClick();
		}
	}
	
    async handleJoinButtonClick(){
		if ( this.state.game_code == null || this.state.game_code.length < 6){
			alert("Must be a 6-Digit Code!")
			return;
		}

		this.setState({loading : true});

		const docRef = doc(db, "question_banks", this.state.game_code);
		const docSnap = await getDoc(docRef);

		if (!docSnap.exists()){
			alert("This game doesn't exist!");
			this.setState({loading: false});
			return;

		}

		this.props.setGameCode(this.state.game_code);		
		this.props.setBankName(docSnap.data().bank_name);		

		this.setState({loading:false});
		this.props.setJoinStates();
	}

    handleCreateButtonClick () {
        this.props.setCreateStates();
	}

	handleMadeButtonClick(){
		this.props.setMadeStates();
	}

	displayEntry(){
		if (window.innerWidth > 480){
			return (
				<div className="M_code_entry">
							<input value={this.game_code} autoFocus onChange={this.handleCodeInput} onKeyDown={(e) => this.enterPress(e)}  className = "entry-1" type="text" placeholder="6-DIGIT CODE" maxLength="6" />
				</div>
			);
		}
		else{
			return (
				<div className="M_code_entry">
							<input type="number" inputMode='numeric' value={this.game_code}  onChange={this.handleCodeInput} onKeyDown={(e) => this.enterPress(e)}  className = "entry-1" placeholder="6-DIGIT CODE" maxLength="6" />
				</div>
			);
		}

	}


    render() {

		if (this.state.loading){
            return ( <h1 color='#A2C1FA'>Loading... <BeatLoader color='#A2C1FA'/></h1> );
        }
		
		else{
			return (
				<div className="Menu-container" >

					<div className="M_header">
						<h1 className='pulse animated'>Tourney!</h1>
					</div>

					{this.displayEntry()}
					
					<div className="M_join_button">
						<button className="join-button btn-hover" onClick={() =>
							{this.handleJoinButtonClick()}} >Join!</button>
					</div>

					<div className="M_bottom_container">
						<button className="create-button btn-hover" onClick={ () => 
							{this.handleCreateButtonClick()}}> Create Game </button>
				
						<button className='create-buttons' onClick={ () => 
							{this.handleMadeButtonClick()}}> I Already Made a Game</button>
					</div>

				</div>
			);
		}
    }
}



export default Menu;

