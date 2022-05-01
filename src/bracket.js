import { Bracket, RoundProps } from 'react-brackets';

import React, { Component } from 'react';


class Brackety extends Component {
  constructor (props){
    super(props);

    
    // var matches = this.createMatchups(props.players);
    var roundz = this.populateMatches(props.matchups);


    this.state = {
      
      // matchups : matches,
      rounds : roundz
    }
  
  }

  // need to add id's!
  populateMatches(matchups){

    const round = []
    const seeds = []
    matchups.forEach(pair => seeds.push({ teams: [{ name: pair[0] }, { name: pair[1] }] }));
  
    
    round.push({title:'', seeds});
    
    return round;
  }

  componentDidMount(){
  }

  createMatchups(players){
    
    this.shuffle(players);
    
    var groups = [];

    for (var i =0; i<players.length; i+=2){
      groups.push(players.slice(i,i+2));
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

    render() {
        return (
          
          <Bracket rounds={this.state.rounds} mobileBreakpoint={500} />

        );
    }
}


export default Brackety;