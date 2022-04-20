import React, { Component } from 'react';

class PostQ extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }

    }

    componentWillUnmount(){
        this.props.setAnweredFalse();
    }

    

    render() {
        return (
            <div>
                <h1>{this.props.feedback}!</h1>
                <h2>Wins: {this.props.wins} Losses: {this.props.losses} </h2>
            </div>
        );
    }
}

export default PostQ;