import React, { Component } from 'react';
import { doc, increment, updateDoc, } from "firebase/firestore";
import { db } from './firebase';

class Host extends Component {
    constructor(props){
        super(props);
        this.state = {
            game_data : this.props.game_data,
            curr_num : 1,
            timer_done: false


            // curr_num : this.props.game_data.curr_num,
            // curr_question : this.props.game_data.questions.q1,
            // seconds : this.props.game_data.questions.q1.seconds 

        }

    }

    async questionTimer (seconds) {

        setTimeout(function(){
             this.setState({timer_done:true});
        }.bind(this), seconds * 1000);

        var timeleft = seconds;
        var downloadTimer = setInterval(function(){
        timeleft--;
        
        var exists = document.getElementById("countdowntimer");
        if (exists){
            document.getElementById("countdowntimer").textContent = timeleft;
        }
        if(timeleft <= 0){
        
            clearInterval(downloadTimer);

        }
            
        },1000);


    }

    getQ(){
        var val = "q" + this.state.curr_num;
        return val;
    }

    displayRank(){
        this.setState({timer_done : true})
    }

    async updateShowQuestion(){
        const docRef  = doc(db, "question_banks", this.props.game_code);
        await updateDoc(docRef, {show_question:false})
    }


    async nextQuestion(){
        this.setState({curr_num : this.state.curr_num+1 })
        this.setState({timer_done : false})



        const docRef  = doc(db, "question_banks", this.props.game_code);
        await updateDoc(docRef, {curr_num: increment(1)});
        await updateDoc(docRef, {show_question:true});

       
    }

   
    render() {

        if (this.state.timer_done == false){

            {this.questionTimer(this.state.game_data.questions[this.getQ()].seconds)}

            return (
                

                <div>
                    <div className='question-info'> 
                    <h3>Question {this.state.curr_num}/{Object.keys(this.state.game_data.questions).length}</h3> 
                    <span id="countdowntimer">10 </span>
                    
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
            );
        }

        else {
            {this.updateShowQuestion()}
            return(
          
                <div>
                    <h1>Rankings:</h1>

                    <div className='next-button'>
                        <button className='create-buttons' onClick={() => {this.nextQuestion()}}>Next</button>
                    </div>
                </div>
                
            );
            
        }


        
    }
}

export default Host;