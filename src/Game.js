
import React, { Component } from 'react';
import { doc, updateDoc, arrayUnion, onSnapshot, increment } from "firebase/firestore";
import { db } from './firebase';
import { BarLoader, ClockLoader } from 'react-spinners';
import PostQ from './PostQ';

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            game_code: props.game_code,
            player_name: '',
            joined : false,
            game_data: null,
            started : false,
            bank_name : '',
            curr_num : 0,
            timer_done : false,
            show_question : false,

            feedback : null,
            answered : false,
            wins : 0,
            losses : 0
            
        };
        
    }

    handleNameInput = (event) => {
        this.setState({player_name: event.target.value});
        
    }

    async handleJoinButtonClick(){
        
        const gameRef = doc(db, "question_banks", this.state.game_code);
        
        await updateDoc(gameRef, {
            players: arrayUnion(this.state.player_name),
  
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
            this.setState({show_question : doc.data().show_question});
            this.setState({bank_name : doc.data().bank_name})


            });
        }



    handleMenuButtonClick(){
        this.props.setMenuStates();
    }


    async handleAnswerClick(choice){
        this.setState({answered : true})

        const answers = this.state.game_data.questions[this.getQ()].correct_answers;
        const docRef  = doc(db, "question_banks", this.props.game_code);

        const update_wins = "scores." + this.state.player_name  + ".wins";
        const update_lossess = "scores." + this.state.player_name  + ".losses";

        if (answers.includes(choice)){
            await updateDoc(docRef, {
                [update_wins] : increment(1)}
            );
            this.setState({feedback : "Correct"})
            this.setState({wins:this.state.wins+1})
        }
        else{
            await updateDoc(docRef, {
                [update_lossess] : increment(1)}
            );
            this.setState({feedback : "Incorrect"})
            this.setState({losses:this.state.losses+1})

        }
    
    }


    setAnweredFalse(){
        this.setState({answered:false});
    }

    getQ(){
        var val = "q" + this.state.curr_num;
        return val;
    }

    render() {
        

        if (this.state.joined == false){
            return (
                <div className='join-container'>

                    <div>
                        <h1>Enter a name to join "{this.state.bank_name}"!</h1>
                    </div>

                    <div>
                        <h3>Game Code: {this.state.game_code}</h3>

                    </div>

                    <div>
                        <input className='entry-1' placeholder='Name' type= "text" value={this.state.player_name} onChange={this.handleNameInput}/> 
                    </div>
                    <div>
                        <button className="join-button btn-hover" onClick={ () => {this.handleJoinButtonClick()}}>Enter Game!</button>
                    </div>
                    
                    <div>
                        <button className='create-buttons' onClick={ () => {this.handleMenuButtonClick()}}>Menu</button>

                    </div>
                </div>
            );
        }

        else if (this.state.started == false) {
            return(
                <div className='waiting-container'>
                    <h1> Welcome, {this.state.player_name}!</h1>

                    <h2> We're waiting for the host to start the game.</h2>

                    <BarLoader color={'#A2C1FA'} height={12} width={250}/>
                </div>  
            )
            
        }
    

        else if (this.state.show_question ==true){
            if (this.state.answered == false){
                return(
                    <div>
                            <div className='question-info'> 
                            <h3>Question {this.state.curr_num}/{Object.keys(this.state.game_data.questions).length}</h3> 
                            {/* <span id="countdowntimer">10 </span> */}
                            
                        </div>
                        <div className='game-answers'>
                            <div>
                                <button className='buttona1' onClick={() => this.handleAnswerClick(1)}> </button>
                                <button className='buttona2' onClick={() => this.handleAnswerClick(2)}> </button>
    
                            </div>
                            
                            <div>
                                <button className='buttona3' onClick={() => this.handleAnswerClick(3)}> </button>
                                <button className='buttona4' onClick={() => this.handleAnswerClick(4)}> </button>
    
                            </div>
                        </div>
                    </div>
                
                );
            }
            else{
                return (
                    <div className='answered-container'>
                        <h1>Waiting for the question to finish!</h1>
                        <div>
                            <ClockLoader size={100} color={'#A2C1FA'}/>

                        </div>
                    </div>
                )
            }
            


        }

        else{
            return (

                <PostQ feedback = {this.state.feedback} setAnweredFalse={this.setAnweredFalse.bind(this)}
                wins= {this.state.wins} losses={this.state.losses} />

            );

        }
               
       
    }
}

export default Game;