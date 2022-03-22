
import React, { Component } from 'react';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from './firebase';

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            game_code: props.game_code,
            player_name: ''
            
        };
        
    }

    handleNameInput = (event) => {
        this.setState({player_name: event.target.value});
        
    }

    async handleJoinButtonClick(){
        
        const gameRef = doc(db, "question_banks", this.state.game_code);
        
        await updateDoc(gameRef, {
            players: arrayUnion(this.state.player_name)
        });


    }

    handleMenuButtonClick(){
        this.props.setMenuStates();
    }

    render() {
        return (
            <div>
                
                Name:
                <input type= "text" value={this.state.player_name} onChange={this.handleNameInput}/> 
                <button onClick={ () => {this.handleJoinButtonClick()}}>Join!</button>
                <h1>{this.state.game_code}</h1>
                <button onClick={ () => {this.handleMenuButtonClick()}}>Menu</button>
            </div>
        );
    }
}

export default Game;