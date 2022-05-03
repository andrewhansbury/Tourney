import React, { Component } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebase';


class Made extends Component {

    constructor(props){
        super(props)
        this.state = {
            game_code : 0,
            game_data : null
        };
    }

    handleCodeInput = (event) =>{
        this.setState({game_code: event.target.value});
    }

    enterPress = (e) =>{
		if (e.keyCode === 13) {
			this.handleStartButtonClick();
		}
	}

    handleStartButtonClick =(event) => {

        if (this.state.game_code.length != 6 || this.checkGameCode(this.state.game_code) == false) 
        {
            alert("That game code doesn't exist!");
            this.setState({game_code: null});
            return
        }
        else {
            this.props.setGameCode(this.state.game_code);
            
            this.props.setHostStates();
        }
    }

    handleMenuButtonClick() {
        this.props.setMenuStates();

    }

    async checkGameCode(code){
        const docRef = doc(db, "question_banks", code);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // var data = docSnap.data()
            // console.log("Document data:", data);
            // this.setState({game_data : data})
            return true;

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            return false;
        }

    }



    render() {
        return (
            <div className='made-container'>
                <div className='made-text'>
                    <h1>Enter your Tourney's Code!</h1>

                </div>
                <div className="M_code_entry">
					<input value={this.game_code} onChange={this.handleCodeInput} autoFocus onKeyDown={(e) => this.enterPress(e)} className = "entry-1" type="text" placeholder="6-DIGIT CODE" maxLength="6" />
            
                </div>
                    
                    <div>
                        <button className="join-button btn-hover" onClick={() => {this.handleStartButtonClick()}}>Start!</button>
                    </div>

                    <div className='bottom-button'>
                        <button className='create-buttons'  onClick={() => {this.handleMenuButtonClick()}}>Main Menu</button>

                    </div>

            </div>
        );
    }
}

export default Made;