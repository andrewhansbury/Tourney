import React, { Component } from 'react';
import { doc, updateDoc } from "firebase/firestore";

import { db } from './firebase';

class Ranking extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    async updateShowQuestion(){
        const docRef  = doc(db, "question_banks", this.props.game_code);
        await updateDoc(docRef, {show_question:false});
    }

    

    componentDidMount(){
        this.updateShowQuestion();
    }

    renderObject(){
		return Object.entries(this.props.game_data.scores).map(([key, value], i) => {
            if (value.wins == undefined){
                value.wins = 0;
            } 
            if (value.losses == undefined){
                value.losses = 0;
            } 
			return (
				<div key={key}>
					{key}: {value.wins} Win, {value.losses} Loss
				</div>
			)
		})
	}

    render() {


        return (
            <div>
                <h1>Rankings:</h1>

                <div>
                    {this.renderObject()}
            
                </div>

                
                

                <div className='next-button'>
                    <button className='create-buttons' onClick={() => {this.props.nextQuestion()}}>Next</button>
                </div>
            </div>
        );
    }
}

export default Ranking;