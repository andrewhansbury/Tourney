
import React, { Component } from 'react';
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { db } from './firebase';

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            game_code: props.game_code,
            player_name: '',
            joined : false,
            game_data: null,
            started : false,
            curr_num : 0,
            timer_done : false,
            show_question : false
            

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

    componentDidMount(){
        

        // const docRef = doc(db, "question_banks", this.props.game_code);
        const unsub = onSnapshot(
            doc(db, "question_banks", this.props.game_code), 
            { includeMetadataChanges: true }, 
            (doc) => {

            this.setState({game_data: doc.data()})
            this.setState({started:  doc.data().started});
            this.setState({curr_num:  doc.data().curr_num});
            this.setState({show_question : doc.data().show_question})

            });

        }



    handleMenuButtonClick(){
        this.props.setMenuStates();
    }


    async handleAnswerClick1(){
        


    }


    // questionTimer(seconds){
    //     setTimeout(function(){
    //         this.setState({timer_done:true});
    //    }.bind(this), seconds * 1000);

    //     var timeleft = seconds;
    //     var downloadTimer = setInterval(function(){
    //     timeleft--;
    //     var exists = document.getElementById("countdowntimer");
    //     if (exists){
    //         document.getElementById("countdowntimer").textContent = timeleft;
    //     }
    //     if(timeleft <= 0)
    //         clearInterval(downloadTimer);
    //     },1000);

    // }

    getQ(){
        var val = "q" + this.state.curr_num;
        return val;
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

        else if (this.state.started == false) {
            return(
                <div>
                    <h1> Welcome {this.state.player_name}!</h1>

                    <h2> We're waiting for the host to start the game.</h2>
                </div>
            )
            

        }

       

        else if (this.state.show_question ==true){
            return(
                <div>
                        <div className='question-info'> 
                        {/* {this.questionTimer(this.state.game_data.questions[this.getQ()].seconds)} */}
                        <h3>Question {this.state.curr_num}/{Object.keys(this.state.game_data.questions).length}</h3> 
                        <span id="countdowntimer">10 </span>
                        
                    </div>
                    <div className='game-answers'>
                        <div>
                            <button className='buttona1'> </button>
                            <button className='buttona2'> </button>

                        </div>
                        
                        <div>
                            <button className='buttona3'> </button>
                            <button className='buttona4'> </button>

                        </div>
                    </div>
                </div>
            
            );

        }

        else{
            return (
                <h1>RANK</h1>
            );

            

        }
       
            
        
       
    }
}

export default Game;