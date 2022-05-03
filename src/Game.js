
import React, { Component } from 'react';
import { doc, updateDoc, arrayUnion, onSnapshot, increment } from "firebase/firestore";
import { db } from './firebase';
import { BarLoader, HashLoader, BeatLoader } from 'react-spinners';
import PostQ from './PostQ';
import Question from './Question';


class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading : true,
            docRef : null,

            game_code: props.game_code,
            bank_name : props.bank_name,
            player_name: '', 
            joined : false, //false
            game_data: null,
            started : false,
            curr_num : 0,
            timer_done : false,
            show_question : false,

            
            matchup_id : null,
            curr_matchup : "No one! (Bye Round)",
            feedback : "Incorrect",
            answered : false,
            wins : 0,
            losses : 0,
            question_points: 50,
            
        };
    }


    handleNameInput = (event) => {
        this.setState({player_name: event.target.value});
    }


    enterPress = (e) =>{
		if (e.keyCode === 13) {
			this.handleJoinButtonClick();
		}
	}



    async handleJoinButtonClick(){
        if (this.state.player_name === ""){
            alert("Your name can't be blank!");
            return;
        }

        if (this.state.game_data.players >= 4){
            alert("Game is full!");
            return;
        }

        this.setState({loading : true});
        
        const docRef = doc(db, "question_banks", this.state.game_code);
        this.setState({docRef : docRef});
        
        await updateDoc(docRef, {
            players: arrayUnion(this.state.player_name),
  
        });

        this.setState({loading:false});
        this.setState({joined: true})
    }


    getMatchup (matchups){

        for (const index in matchups){
            const pos = matchups[index].indexOf(this.state.player_name)
           if(pos !== -1){
               this.setState({matchup_id : index})
                if (pos === 0){
                    return matchups[index][1];
                }
                else{
                    return matchups[index][0];
                }               
           } 
        }
    }

    async calculateWinner(){
        console.log("Calculating winner");

        if (this.state.matchup_id in this.state.game_data.matchup_winner){
            return;
        }
        else{
            await updateDoc(this.state.docRef, {
                ["matchup_winner." + this.state.matchup_id]: this.state.player_name
              });
        }
    }


    componentDidMount(){

        onSnapshot(
            doc(db, "question_banks", this.props.game_code), 
            { includeMetadataChanges: true }, 
            (doc) => {

            this.setState({game_data: doc.data()})
            this.setState({started:  doc.data().started});
            this.setState({curr_num:  doc.data().curr_num});
            this.setState({show_question : doc.data().show_question});

            if (!this.state.game_data.losers.includes(this.state.player_name)){
                this.setState({curr_matchup : this.getMatchup(this.state.game_data.matchups)});
            }
            else{
                this.setState({curr_matchup : this.getMatchup(this.state.game_data.matchups_losers)})
            }

        });

        this.setState({loading: false});
    }

    // componentWillUnmount(){
    //     if (!this.state.game_data.losers.includes(this.state.player_name)){
    //         this.setState({curr_matchup : this.getMatchup(this.state.game_data.matchups)});
    //     }
    //     else{
    //         this.setState({curr_matchup : this.getMatchup(this.state.game_data.matchups_losers)})
    //     }
    // }
   

    handleMenuButtonClick(){
        this.props.setMenuStates();
    }

    async setAnswerTime(val){
        const timeObj = {[this.state.player_name] : val};  
        await updateDoc(this.state.docRef, {
            answer_time : arrayUnion(timeObj)
        });
    }


    async handleAnswerClick(choice){
        this.setState({answered : true});
        
        const answers = this.state.game_data.questions[this.getQ()].correct_answers;
        const docRef  = this.state.docRef

        await updateDoc(docRef, {answered_players: arrayUnion(this.state.player_name)});

        if (answers.includes(choice)){
            await updateDoc(docRef, {
                answered_correctly : arrayUnion(this.state.player_name)
            });
            this.setState({feedback : "Correct"})
            // await updateDoc(docRef, {
            //     scores : this.state.question_points}
            // );
            // this.setState({wins:this.state.wins+1})

            // this.calculateWinner();
        }
        else{
            await updateDoc(docRef, {
                answered_incorrectly : arrayUnion(this.state.player_name)
            });
            this.setState({feedback : "Incorrect"})
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

        if (this.state.loading){
            return ( <h1 color='#A2C1FA'>Loading... <BeatLoader color='#A2C1FA'/></h1> );
        }
		
		else if (this.state.joined === false){
            return (
                <div className='join-container'>

                    <div>
                        <h1>Enter a name to join "{this.state.bank_name}"!</h1>
                    </div>

                    <div>
                        <h3>Game Code: {this.state.game_code}</h3>

                    </div>

                    <div>
                        <input className='entry-1' placeholder='Name' type= "text" autoFocus value={this.state.player_name} onChange={this.handleNameInput} onKeyDown={(e) => this.enterPress(e)}/> 
                    </div>
                    <div>
                        <button className="join-button btn-hover" onClick={ () => {this.handleJoinButtonClick()}}>Enter Game!</button>
                    </div>
                    
                    <div className='J_bottom_button'>
                        <button className='create-buttons' onClick={ () => {this.handleMenuButtonClick()}}>Main Menu</button>
                    </div>
                </div>
            );
        }

        else if (this.state.started === false) {
            return(
                <div className='waiting-container'>
                    <h1> Welcome, {this.state.player_name}!</h1>

                    <h2> We're waiting for the host to start the game.</h2>

                    <BarLoader color={'#A2C1FA'} height={12} width={300}/>
                </div>  
            )   
        }
    

        else if (this.state.show_question === true){

            if (this.state.answered === false){
                return (
                    <Question
                    curr_num = {this.state.curr_num}
                    game_data = {this.state.game_data}
                    docRef = {this.state.docRef}
                    player_name = {this.state.player_name}
                    curr_matchup = {this.state.curr_matchup}
                    setAnswerTime = {this.setAnswerTime.bind(this)}
                    handleAnswerClick = {this.handleAnswerClick.bind(this)} />
                )
            
            }
            else{
                return (
                    <div className='answered-container'>
                        <h1>Waiting for the question to finish!</h1>
                        <div>
                            <HashLoader size={100} color={'#A2C1FA'}/>
                        </div>
                    </div>
                )
            }
        }

        else{
            return (

                <PostQ game_data = {this.state.game_data} feedback = {this.state.feedback} next_matchup={this.state.curr_matchup} setAnweredFalse={this.setAnweredFalse.bind(this)}
                wins= {this.state.wins} losses={this.state.losses} player_name = {this.state.player_name}/>

            );
        }
    }
}

export default Game;