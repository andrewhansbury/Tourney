import React, { Component } from 'react';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { db } from './firebase';
import RankTable from './RankTable';

import Matchups from './Matchups';


class Ranking extends Component {
    constructor(props){
        super(props);
        this.state = {
            scores : props.game_data.scores,
            docRef : null,
            show_matchups : false
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
            // else{
            //     console.log(correct, incorrect)
            //     await updateDoc(this.props.docRef, {matchup_winner: arrayUnion(p2)});
                
            // }
        }
    }

    showMatchups(){
        this.setState({show_matchups: true});
        

    }
    



    componentDidMount(){
        this.props.stopTimer();
        this.updateShowQuestion();
    }


    render() {

        if ((this.props.game_data.answered_correctly.length + this.props.game_data.answered_incorrectly.length) !== this.props.game_data.players.length){
            
            return (<h1>Loading</h1>)
        }

        else if (!this.state.show_matchups){
            return (
                <RankTable next={this.showMatchups.bind(this)} calculateWinners = {this.calculateWinners.bind(this)} scores = {this.state.scores}/>
            );
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