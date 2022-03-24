import React, { Component } from 'react';
import { doc, onSnapshot, getDoc, updateDoc} from "firebase/firestore";
// import {onValue} from 'firebase/database'
import { db } from './firebase';

import Host from './Host';


class PreHost extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            loading : true,
            game_data : null,
            started : false
            
        }

        console.log(this.props.game_code)
                
    }

    async getGameData(){
        this.setState({loading: true})
    
        const docRef = doc(db, "question_banks", this.props.game_code);
        const docSnap = await getDoc(docRef);
        let data = docSnap.data();
        
        this.setState({game_data: data});
        this.setState({loading: false})
        
    }

  

    componentDidMount(){
        this.getGameData()

        // const docRef = doc(db, "question_banks", this.props.game_code);
        const unsub = onSnapshot(
            doc(db, "question_banks", this.props.game_code), 
            { includeMetadataChanges: true }, 
            (doc) => {

              this.setState({game_data: doc.data()})
            });

    }


    async beginButtonClick(){
        this.setState({started : true})
        const docRef = doc(db, "question_banks", this.props.game_code);
        await updateDoc(docRef, {
            started: true
        });

    }

 
    render() {


        if (this.state.loading){
            return ( <h1>Loading...</h1> );
        }

        else if (this.state.started == false){


            return (   

                <div className='All'>
                    <div className='top-text'>
                        <h1 className='made'> Waiting for players </h1> 
                        <h2>Join at: {this.props.game_code}</h2> 
                        <div className="dot-pulse"></div>
                    </div>

                    {/* Show all Player names */}
                    <div className='players'>
                    {this.state.game_data.players.map(
                        (player, index) => <li key ={index}>{player}</li>
                        )}

                    </div>

                    <div className='begin'>
                    <button className='begin-button btn-hover' onClick = {() => {this.beginButtonClick()}}> Begin! </button>
                    </div>
                </div>
            );
        }

        else if (this.state.started == true){

            return (
                // <h1>HI</h1>
                    
                <Host game_data = {this.state.game_data} />


            );
        }
    }
}

export default PreHost;