import React, { Component } from 'react';
import { doc, onSnapshot, getDoc, updateDoc} from "firebase/firestore";
// import {onValue} from 'firebase/database'
import { db } from './firebase';
import { PropagateLoader, BeatLoader } from 'react-spinners';
import Host from './Host'
import Matchups from './Matchups';


class PreHost extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            loading : true,
            docRef: doc(db, "question_banks", this.props.game_code),
            game_data : {},
            matchups : null,



            show_lobby : true,
            show_matchups : false,
            started : false
        }
        this.state.game_data.players = [];
    }


    async getGameData(){
        this.setState({loading: true})
        
        const docRef = this.state.docRef;
        const docSnap = await getDoc(docRef);
        let data = docSnap.data();
       
        this.setState({game_data: data});
        this.setState({loading: false})
        
    }


    async componentDidMount(){
        this.getGameData()

        // const docRef = doc(db, "question_banks", this.props.game_code);
        onSnapshot(
            doc(db, "question_banks", this.props.game_code), 
            { includeMetadataChanges: true }, 
            (doc) => {
              this.setState({game_data: doc.data()})
            }
        );

        console.log("moounted")
        await updateDoc(this.state.docRef,{
            answer_time : [],
            answered_correctly : [],
            answered_incorrectly : [],
            answered_players : [],
            matchup_winner : [],
            matchup_losers : [],
            losers: [],
            losers_matchups: [],
            matchups : [],
            curr_num:1
        })

    }


    getRemainingPlayers(){
        return 16 - this.state.game_data.players.length
    }


    async matchupsButtonClick(){
        // if (this.state.game_data.players.length !== 4){
        //     alert("You need exactly 4 players to start the game!")
        //     return;
        // }

        if (this.state.game_data.players.length < 2){
            alert("You need at least 2 players to play!");
            return;
        }

        this.setState({show_lobby : false});
        this.setState({show_matchups : true});
 
    }


    

    async beginButtonClick(){
        this.setState({show_matchups : false});
        this.setState({started : true});
        const docRef = this.state.docRef;
        await updateDoc(docRef, {
            started: true,
            show_question : true
        });
    }

 
    render() {

        if (this.state.loading){
            return ( <h1 color='#A2C1FA'>Loading... <BeatLoader color='#A2C1FA'/></h1> );
        }

        else if (this.state.show_lobby === true){
            
            return (   

                <div className='Waiting-container'>
                    <div className='top-text'>
                        <h1 className='made'> Waiting for  players!</h1> 
                        <h2>Join at: {this.props.game_code}</h2>
                        <div>
                            <PropagateLoader color='#A2C1FA'/>
                        </div>
                    </div>

                    {/* Show all Player names */}
                    <div className='players'>
                        {this.state.game_data.players.map(
                            (player, index) => <li className='animate pulse' key ={index}>{player}</li>
                        )}
                    </div>

                    <div></div>

                    <div className='matchup-button'>
                        <button className='join-button btn-hover' onClick = {() => {this.matchupsButtonClick()}}> Show Matchups! </button>
                    </div>
                </div>
            );
        }

        else if (this.state.show_matchups === true){
            
            return (
              <Matchups game_data = {this.state.game_data} nextButtonClick = {this.beginButtonClick.bind(this)} 
              docRef={this.state.docRef} players= {this.state.game_data.players}
              losers = {[]}
              />
                
            );
        }

        else if (this.state.started === true){
                
            return (
                <Host game_data = {this.state.game_data} game_code = {this.props.game_code} docRef = {this.state.docRef} />
            );
        }
    }
}

export default PreHost;



