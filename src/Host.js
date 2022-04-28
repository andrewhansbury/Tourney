import React, { Component } from 'react';
import { doc,  updateDoc, increment, onSnapshot } from "firebase/firestore";
import Ranking from './Ranking';
import { db } from './firebase';
import Timer from 'easytimer.js';

class Host extends Component {
    constructor(props){
        super(props);
        this.state = {
            game_data : this.props.game_data,
            curr_num : this.props.game_data.curr_num,
            docRef : this.props.docRef,
            
            answered_players : [],

            timer_done: false,
            everyone_answered : false,

            timer : new Timer()

        }
    }


    async questionTimer (seconds) {

        var timer = this.state.timer
        timer.start({countdown: true, startValues: {seconds: seconds}});


        var exists = document.getElementById("countdowntimer");
        if (exists){
            timer.addEventListener('secondsUpdated', function (e) {
                document.getElementById("countdowntimer").innerHTML = timer.getTotalTimeValues().seconds;

            });

        }

        

        const updateState = () => {
            this.setState({timer_done:true});
        }

        timer.addEventListener('targetAchieved', function (e){
            updateState();
        });
    
    }

    getQ(){
        var val = "q" + this.state.curr_num;
        return val;
    }

    displayRank(){
        this.setState({timer_done : true})
    }

    stopTimer(){
        this.state.timer.stop();

    }
   
    async nextQuestion(){
        this.setState({curr_num : this.state.curr_num+1 })
        this.setState({timer_done : false})

        const docRef = this.state.docRef;
        console.log("next question")
        await updateDoc(docRef, {curr_num: increment(1), show_question: true, answered_players: [] });

        this.questionTimer(this.state.game_data.questions[this.getQ()].seconds);

    }

    updateMatchups(){

    }

    componentDidMount(){

        onSnapshot(
            doc(db, "question_banks", this.props.game_code), 
            { includeMetadataChanges: true }, 
            (doc) => {

            this.setState({answered_players: doc.data().answered_players})
    
        });

        this.questionTimer(this.state.game_data.questions[this.getQ()].seconds);


        
    }


   
    render() {
    
        
        if (!this.state.timer_done && this.state.answered_players.length < this.state.game_data.players.length){ 
            return (
            <div>
                <div className='question-info'> 
                <h3>Question {this.state.curr_num}/{Object.keys(this.state.game_data.questions).length}</h3> 
                <span id="countdowntimer"> {this.state.game_data.questions[this.getQ()].seconds} </span>
                
                </div>
                
                
                <h1>{this.state.game_data.questions[this.getQ()].question}</h1>

                
                <div className='answers'>
                    <div>
                        <button className='button1' >{this.state.game_data.questions[this.getQ()].answers[0]}</button>
                        <button className='button2'>{this.state.game_data.questions[this.getQ()].answers[1]} </button>

                    </div>
                    
                    <div>
                        <button className='button3'>{this.state.game_data.questions[this.getQ()].answers[2]}</button>
                        <button className='button4'>{this.state.game_data.questions[this.getQ()].answers[3]} </button>

                    </div>
                </div>

                
            </div>
        )}
            else{

                return (
                <Ranking game_code={this.props.game_code} game_data={this.props.game_data}
                 nextQuestion={this.nextQuestion.bind(this)} stopTimer = {this.stopTimer.bind(this)} />
            )}
        
    
        
    }
}

export default Host;