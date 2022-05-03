import React, { Component } from 'react';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { db } from './firebase';
import RankTable from './RankTable';

import Matchups from './Matchups';
import Answer from './Answer';


class Ranking extends Component {
    constructor(props){
        super(props);
        this.state = {
            scores : props.game_data.scores,
            docRef : null,
            show_matchups : false,
            show_answer: true,
            game_over: false,
        }
    }


    async updateShowQuestion(){
        const docRef  = doc(db, "question_banks", this.props.game_code);
        this.setState({docRef : docRef})
        await updateDoc(docRef, {show_question:false});
    }

    
    async calculateWinners(){

        var answer_times = this.props.game_data.answer_time;

        answer_times = Object.assign({}, ...answer_times);


        var matchups = this.props.game_data.matchups
        var losers_matchups = this.props.game_data.losers_matchups

        var correct = this.props.game_data.answered_correctly
        var incorrect = this.props.game_data.answered_incorrectly


        

        for (const property in matchups){
            const p1 = matchups[property][0];
            const p2 = matchups[property][1];

      
            // If p1 right and p2 wrong...
            if (correct.includes(p1) && incorrect.includes(p2)){
                await updateDoc(this.props.docRef, {matchup_winner: arrayUnion(p1), losers: arrayUnion(p2)});
            }
            else if (correct.includes(p2) && incorrect.includes(p1)){
                await updateDoc(this.props.docRef, {matchup_winner: arrayUnion(p2) , losers: arrayUnion(p1)});
            }    
            // if theyre both right or both wrong the faster player wins
            else if ( (correct.includes(p1) && correct.includes(p2)) || (incorrect.includes(p1) && incorrect.includes(p2)) )

                if (answer_times[p1] > answer_times[p2]){
                    await updateDoc(this.props.docRef, {matchup_winner: arrayUnion(p1), losers: arrayUnion(p2)});
                }
                else{
                    await updateDoc(this.props.docRef, {matchup_winner: arrayUnion(p2), losers: arrayUnion(p1)});
            }
        }

        for (const property in losers_matchups){
            const p1 = losers_matchups[property][0];
            const p2 = losers_matchups[property][1];
            if (correct.includes(p1) && incorrect.includes(p2)){
                await updateDoc(this.props.docRef, {matchup_losers: arrayUnion(p1)});
            }
            else if (correct.includes(p2) && incorrect.includes(p1)){
                await updateDoc(this.props.docRef, {matchup_losers: arrayUnion(p2)});
            }    
            // if theyre both right or both wrong the faster player wins
            else if ( (correct.includes(p1) && correct.includes(p2)) || (incorrect.includes(p1) && incorrect.includes(p2)) ){
                if (answer_times[p1] > answer_times[p2]){
                    await updateDoc(this.props.docRef, {matchup_losers: arrayUnion(p1)});
                }
                else{
                    await updateDoc(this.props.docRef, {matchup_losers: arrayUnion(p2)});
                }        
            }

            
        }
    }

    showMatchups(){
        if(this.props.game_data.curr_num >= this.props.game_data.num_questions){
            this.setState({game_over : true});
            return;
        }
        this.setState({show_matchups: true});
        
    }

    calculateScores(){
        console.log("calculating scores")
    }
    

    componentDidMount(){
        this.props.stopTimer();
        this.updateShowQuestion();
    }

    setShowAnswer(){
        this.setState({show_answer : false})
    }


    render() {

        if ((this.props.game_data.answered_correctly.length + this.props.game_data.answered_incorrectly.length) < this.props.game_data.players.length){
            // console.log(this.props.game_data.answered_correctly.length, this.props.game_data.answered_incorrectly.length, this.props.game_data.players.length)
            return (<h1>Loading...</h1>)
        }
        else if (this.state.game_over){
            return (
            <div className='game-over'>
                <h1>Game Over!</h1>
                <h2>Tourney Winner:</h2>
                <h2>{this.props.game_data.matchups[0][0]}</h2>
            </div>
            )
        }

        else if (!this.state.show_matchups){
            if (this.state.show_answer === true)

            return (
                    <Answer nextButtonClick={this.setShowAnswer.bind(this)} correct ={this.props.correct}  correctNum={this.props.correctNum} calculateScores = {this.calculateScores.bind(this)} calculateWinners = {this.calculateWinners.bind(this)}/>
            );

            else{
                
                return (<RankTable next={this.showMatchups.bind(this)} scores = {this.state.scores}/>)
            }
        }
        else{
            return(
                <Matchups game_data={this.props.game_data} nextButtonClick={this.props.nextQuestion.bind(this)} 
                docRef={this.state.docRef} 
                players={this.props.game_data.matchup_winner}
                losers = {this.props.game_data.losers}  
                  />
            );
        }
    }
}

export default Ranking;