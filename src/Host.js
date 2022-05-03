import React, { Component } from 'react';
import { doc,  updateDoc, increment, onSnapshot, arrayUnion, Timestamp } from "firebase/firestore";
import Ranking from './Ranking';
import { db } from './firebase';
import Timer from 'easytimer.js';
import { BeatLoader } from 'react-spinners';


class Host extends Component {
    constructor(props){
        super(props);
        this.state = {
            game_data : this.props.game_data,
            curr_num : this.props.game_data.curr_num,
            docRef : this.props.docRef,
            
            answered_players : [],
            loading : false,

            timer_done: false,
            everyone_answered : false,

            

            timer : new Timer()
        }
    }

    async setAnswerTime(player, val){

        console.log("setting " + player )
        const timeObj = {[player] : val};  
        await updateDoc(this.state.docRef, {
            answer_time : arrayUnion(timeObj)
        });
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
        
        const updateState = async () => {
            this.setState({timer_done:true});
            var players = this.state.game_data.players
            console.log(this.state.answered_players)

            for(const player in players){
                if (!this.state.answered_players.includes(players[player])){
                    console.log(players[player])

                    await updateDoc(this.state.docRef, {answered_incorrectly : arrayUnion(players[player]), answered_players : arrayUnion(players[player])});
                    this.setAnswerTime(players[player], 0);
                }
            }
        }

        timer.addEventListener('targetAchieved', function (e){
            updateState();
            timer.stop();
        });
    }


    correctNum(){
        var questions = this.state.game_data.questions[this.getQ()]
        var answers =  questions.answers
        var correctNum = questions.correct_answers[0]
        return correctNum;
    }
    correctAnswer(){
        var questions = this.state.game_data.questions[this.getQ()]
        var answers =  questions.answers
        var correctNum = questions.correct_answers[0]

        return answers[correctNum -1]
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

        await updateDoc(this.state.docRef,{
            answer_time : [],
            answered_correctly : [],
            answered_incorrectly : [],
            answered_players : [],
            matchup_winner : [],
            matchup_losers : [],
        })

        const docRef = this.state.docRef;
        console.log("next question")
        await updateDoc(docRef, {curr_num: increment(1), show_question: true, answered_players: [] });

        this.questionTimer(this.state.game_data.questions[this.getQ()].seconds);
    }


    updateMatchups(){

    }

    setLoading(bool){
    
        this.setState({loading : bool});
    }


    async componentDidMount(){
        
        onSnapshot(
            doc(db, "question_banks", this.props.game_code), 
            { includeMetadataChanges: true }, 
            (doc) => {

            this.setState({game_data : doc.data()})
            this.setState({answered_players: doc.data().answered_players})
            this.setState({curr_num: doc.data().curr_num})
        });

        this.questionTimer(this.state.game_data.questions[this.getQ()].seconds);

            
    }


   
    render() {

        if (this.state.loading){
            return ( <h1 color='#A2C1FA'>Loading... <BeatLoader color='#A2C1FA'/></h1> );
        }
    
        
        else if (!this.state.timer_done && this.state.answered_players.length < this.state.game_data.players.length){ 
            return (
            <div className='q-container'>
                <div className='question-info'> 
                <h3>Question {this.state.curr_num}/{Object.keys(this.state.game_data.questions).length}</h3> 
                <p id="countdowntimer"> {this.state.game_data.questions[this.getQ()].seconds} </p>
                
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
                <Ranking game_code={this.props.game_code} docRef ={this.props.docRef} game_data={this.props.game_data}
                 nextQuestion={this.nextQuestion.bind(this)} 
                correct = {this.correctAnswer()}
                correctNum = {this.correctNum()}
                 stopTimer = {this.stopTimer.bind(this)} setLoading={this.setLoading.bind(this)} />
            )}
    }
}

export default Host;