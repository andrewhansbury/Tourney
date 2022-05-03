import { updateDoc } from 'firebase/firestore';
import React, { Component } from 'react';

class PostQ extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    renderWinLoss(){
        if (this.props.game_data.losers.includes(this.props.player_name) && this.props.feedback === "Incorrect"){
            return (
                <h2>You lost!</h2>
            )
        }
        else if( this.props.game_data.losers.includes(this.props.player_name) && this.props.game_data.matchup_losers.includes(this.props.player_name)  && this.props.feedback === "Correct"){
            return (<h2>You Beat Your Opponent!</h2>)
        }
        
        else if (this.props.game_data.losers.includes(this.props.player_name) && this.props.feedback === "Correct"){
            return (
                <h2>But Your Opponent Was Faster, You Lost the Round!</h2>
            )
        }
        else if (this.props.game_data.matchup_winner.includes(this.props.player_name) && this.props.feedback === "Incorrect"){
            return (
                <h2>Somehow You Still Won The Round!</h2>
            )
        }

        else{
            
            return (
                <h2>You Won The Round, You're Still in the Tourney!!</h2>
            )
        }
    }

    componentWillUnmount(){
        this.props.setAnweredFalse();        
    }
    

    render() {
        if(this.props.game_data.matchup_winner.length <1 && this.props.game_data.losers.length< 1){
            return (<h1>Loading...</h1>);
        }

        return (
        
        <div className='feedback'>
            <h1>{this.props.feedback}!</h1>
            {this.renderWinLoss()}
        </div>)
        // if (this.props.game_data.){
        //     return (
        //         <div>
        //             <h1>{this.props.feedback}!</h1>
        //             {this.renderWinLoss()}
        //             <h2>You're Facing "{this.props.next_matchup}" Next Round!</h2>
        //             {/* <h2>Wins: {this.props.wins} Losses: {this.props.losses} </h2> */}
        //         </div>
        //     );
        // } 
        // else{
        //     return(
        //         <div>
        //             <h1>{this.props.feedback}!</h1>
        //             {this.renderWinLoss()}
        //         </div>
        //     )
        // }
        
    }
}

export default PostQ;