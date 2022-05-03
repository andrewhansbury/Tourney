import React, { Component } from 'react';
import Timer from 'easytimer.js';
import { updateDoc, arrayUnion } from 'firebase/firestore';



class Question extends Component {
    constructor(props){
        super(props);
        this.state = {
            curr_num : props.curr_num,
            game_data : props.game_data,
            player_name : props.player_name,
            curr_matchup : props.curr_matchup,
            docRef : props.docRef,

            timer : new Timer()
            
        };
    }


    async handleAnswerClick(num){
        
        this.state.timer.pause();
        this.props.setAnswerTime(this.state.timer.getTimeValues().toString(['seconds', 'secondTenths']));
        this.state.timer.stop();
        
        this.props.handleAnswerClick(num);
    }

    getQ(){
        var val = "q" + this.state.curr_num;
        return val;
    }

    async setIncorrectAnswer(){
        this.props.setFeedbackFalse();
        await updateDoc(this.state.docRef, {
            answered_incorrectly : arrayUnion(this.state.player_name)});
    }

    componentDidMount(){
        console.log("QUESTION MOUNTED")

        var timer = this.state.timer;
        var numSeconds = this.state.game_data.questions[this.getQ()].seconds;
        timer.start({countdown:true, startValues:{seconds:numSeconds}, precision:'secondTenths'});
        
        const incorrectAnswer = () => {
            console.log("HIT HIT")
            this.setIncorrectAnswer();
        }

        // const setTime = (numSeconds) => {
        //     this.props.setAnswerTime(numSeconds);
        // }
        timer.addEventListener('targetAchieved', function (e) {
            this.props.setFeedbackFalse();
            // if (!this.state.game_data.show_question){
            //     setTime(0);
            //     timer.stop();
            //     incorrectAnswer();
            // }
           
        });

    }


    render() {
        return (
            <div className='game-container'>
                <div className='question-info'> 

                    <h2>Question {this.state.curr_num}/{Object.keys(this.state.game_data.questions).length}</h2> 
                    <h3>{this.state.player_name} (YOU) vs {this.state.curr_matchup}</h3>

                </div>
                
                <div className='game-answers'>
                    <div className='answers-row-1'>
                        <button className='buttona1' onClick={() => this.handleAnswerClick(1)}> </button>
                        <button className='buttona2' onClick={() => this.handleAnswerClick(2)}> </button>

                    </div>
                    
                    <div className='answers-row-2'>
                        <button className='buttona3' onClick={() => this.handleAnswerClick(3)}> </button>
                        <button className='buttona4' onClick={() => this.handleAnswerClick(4)}> </button>

                    </div>
                </div>
            </div>
        );
    }
}

export default Question;