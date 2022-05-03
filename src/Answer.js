import React, { Component } from 'react';

class Answer extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        this.props.calculateWinners();
        this.props.calculateScores();
    }

    getColor(){
        var num = this.props.correctNum;
        if (num === 1){
            return "#e2468f";
        }
        if (num === 2) {
          return "rgb(82, 93, 253)";
        }
        if (num === 3) {
           return "rgb(65, 182, 65)";
        }
        if (num===4){
            return "rgb(221, 119, 23)";
        }

    }
    render() {
        return (
            <div className='q_answer'>
                <h1>The Correct Answer Was: </h1>
                <h2 style={{backgroundColor: this.getColor()}}> {this.props.correct}</h2>

                <div className='begin-button'>
                            <button className='join-button btn-hover' onClick = {() => {this.props.nextButtonClick()}}> Next </button>
                        </div>
            </div>
        );
    }
}

export default Answer;