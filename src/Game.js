
import React, { Component } from 'react';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from './firebase';

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            game_code: props.game_code,
            player_name: '',
            joined : false,
            game_data: null

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

        this.setState({joined: true})


    }

    handleMenuButtonClick(){
        this.props.setMenuStates();
    }

    render() {

        if (this.state.joined == false){
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

        else{
            return(
                <div>
                    <h1> Welcome {this.state.player_name}!</h1>

                    <h2> We're waiting for the host to start the game.</h2>
                </div>
            )
            

        }
       
    }
}

export default Game;