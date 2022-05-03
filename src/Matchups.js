import React, { Component } from 'react';
import Brackety from './bracket';
import {updateDoc} from "firebase/firestore";


class Matchups extends Component {
    constructor(props){
        super(props)

        this.state = {
            loading : true,
            matchups : null,
            losers_matchups : null,

            winners : props.players,
            losers : props.losers,
            docRef : props.docRef

        }


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

    async componentDidMount(){

        var matches = this.createMatchups(this.state.winners);
        if (this.state.losers.length >0)
            var matches_losers = this.createMatchups(this.state.losers)

        this.setState({matchups : matches});
        this.setState({losers_matchups : matches_losers});


        const matches_obj = Object.assign({}, matches);
        const matches_loser_obj = Object.assign({}, matches_losers);

        await updateDoc(this.state.docRef, {
            matchups: matches_obj,
            losers_matchups : matches_loser_obj
        });

        this.setState({loading : false});

    }

    render() {
        if (this.state.loading){
            return( <h1>Loading</h1>);
        }
        else{  
            return (
                <div className='matchup-container'>
    
                        <h1>Tourney Matchups!</h1>
                        <Brackety matchups={this.state.matchups}/>
    
                        <div className='begin-button'>
                            <button className='join-button btn-hover' onClick = {() => {this.props.nextButtonClick()}}> Begin! </button>
                        </div>
    
                    </div>
            );
        }
    }
}

export default Matchups;