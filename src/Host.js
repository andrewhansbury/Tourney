import React, { Component } from 'react';

class Host extends Component {
    constructor(props){
        super(props);
        this.state = {
            game_data : this.props.game_data,
            // curr_num : this.props.game_data.curr_num,
            // curr_question : this.props.game_data.questions.q1,
            // seconds : this.props.game_data.questions.q1.seconds 

        }

        this.setState({curr_num: false})
        console.log(this.state.game_data)
        console.log(this.state.curr_num)
        console.log(this.state.curr_question)
        console.log(this.state.seconds)


    }


    render() {
        return (
            <div>
                <h1>Deez Nutz</h1>
                {/* <h2> {this.state.curr_question.question} </h2> */}
            </div>
        );
    }
}

export default Host;