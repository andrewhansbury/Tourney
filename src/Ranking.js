import React, { Component } from 'react';
import { doc, updateDoc } from "firebase/firestore";

import { db } from './firebase';

class Ranking extends Component {
    constructor(props){
        super(props);
        this.state = {
            scores : props.game_data.scores

        }
    }

    async updateShowQuestion(){
        const docRef  = doc(db, "question_banks", this.props.game_code);
        await updateDoc(docRef, {show_question:false});
    }


    sortScores (scores){
        let entries = Object.entries(scores);
// [["you",100],["me",75],["foo",116],["bar",15]]

        let sorted = entries.sort((a, b) =>  b[1] - a[1] );
        // [["bar",15],["me",75],["you",100],["foo",116]]
        console.log(sorted)
        return sorted;
    }
    

    componentDidMount(){
        this.updateShowQuestion();
    }

    renderObject(){
        // Display the top 5 ranked players
		return Object.entries(this.sortScores(this.state.scores).slice(0,5)).map(([key, value], i) => {

			return (
				<div key={key}>
					<h3>{parseInt(key)+1}. {value[0]}: {value[1]} </h3>
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