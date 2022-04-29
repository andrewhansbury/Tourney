import React, { Component } from 'react';
import { doc, onSnapshot, getDoc, updateDoc} from "firebase/firestore";
// import {onValue} from 'firebase/database'
import { db } from './firebase';
import { PropagateLoader, BeatLoader } from 'react-spinners';
import Brackety from './bracket';
import Host from './Host'


class PreHost extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            loading : true,
            docRef: doc(db, "question_banks", this.props.game_code),
            game_data : null,
            matchups : null,

            show_lobby : true,
            show_matchups : false,
            started : false
               
        }
    }

    async getGameData(){
        this.setState({loading: true})
        
        const docRef = this.state.docRef;
        const docSnap = await getDoc(docRef);
        let data = docSnap.data();
       
        
        this.setState({game_data: data});
        this.setState({loading: false})
        
    }

  

    componentDidMount(){
        this.getGameData()

        // const docRef = doc(db, "question_banks", this.props.game_code);
        onSnapshot(
            doc(db, "question_banks", this.props.game_code), 
            { includeMetadataChanges: true }, 
            (doc) => {

              this.setState({game_data: doc.data()})
            });
    }

    async matchupsButtonClick(){
        if (this.state.game_data.players.length < 2){
            alert("You need at least 2 players to play!");
            return;
        }
        var matches = this.createMatchups(this.state.game_data.players);
        this.setState({matchups : matches})

        this.setState({show_lobby : false});
        this.setState({show_matchups : true});

        const matches_obj = Object.assign({}, matches);
        await updateDoc(this.state.docRef, {
            matchups: matches_obj
        });

    }

    createMatchups(players){
    
        this.shuffle(players);
        var groups = [];
    
        for (var i =0; i<players.length; i+=2){
          groups.push(players.slice(i,i+2));
        }
        
        // Checking for uneven matchup (last elem in arr)
        if (groups[groups.length -1].length === 1){
            groups[groups.length -1].push("");
        }
    
        return groups;
    
      }

    shuffle(arr) {
        for (var i = 0; i < arr.length; i++) {
            var x = Math.floor(Math.random() * arr.length);
            var y = Math.floor(Math.random() * arr.length);
            if (x === y) { //for dont change arr[index] with self !!!
                continue;
            }
            var temp0 = arr[x];
            arr[x] = arr[y];
            arr[y] = temp0;
        }
        return arr
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
                        <h1 className='made'> Waiting for players!</h1> 
                        <h2>Join at: {this.props.game_code}</h2>
                        <PropagateLoader color='#A2C1FA'/>
                    </div>

                    {/* Show all Player names */}
                    <div className='players'>
                    {this.state.game_data.players.map(
                        (player, index) => <li key ={index}>{player}</li>
                        )}

                    </div>

                    <div className='matchup-button'>
                    <button className='join-button btn-hover' onClick = {() => {this.matchupsButtonClick()}}> Show Matchups! </button>
                    </div>
                </div>
            );
        }

        else if (this.state.show_matchups === true){
            
            return (
              
                <div className='hmmm'>

                    <h1>Matchups!</h1>
                    <Brackety matchups={this.state.matchups}/>

                    <div className='begin'>
                    <button className='join-button btn-hover' onClick = {() => {this.beginButtonClick()}}> Begin! </button>
                    </div>

                </div>
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



