
import React, { Component } from 'react';

class Game extends Component {
    constructor(props){
        super(props);
        
    }

    handleMenuButtonClick(){
        this.props.setMenuStates();
    }

    render() {
        return (
            <div>
                <h1>DEEZ NUTZ</h1>
                <button onClick={ () => {this.handleMenuButtonClick()}}>Menu</button>
            </div>
        );
    }
}

export default Game;