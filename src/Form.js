import { Checkbox, TextFieldAutosize, TextField, Select } from '@mui/material';
import React, { Component } from 'react';
import App from './App';


class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer_1: '',
            answer_2: '',
            answer_3: '',
            answer_4: ''
            
        }
    }

    handleMenuButtonClick(){
        App.setJoinScreenState(false)
		App.setMenuScreenState(true)
	}

    handleAddButtonClick(){
        
	}

    handlequestionChange = (event) => {
        this.setState({
            question: event.target.value
        })
    }

    // TODO: Compress these to a single function if possible

    handleanswer_1Change = (event) => {
        this.setState({
            answer_1: event.target.value
        })
    }
    handleanswer_2Change = (event) => {
        this.setState({
            answer_2: event.target.value
        })
    }
    handleanswer_3Change = (event) => {
        this.setState({
            answer_3: event.target.value
        })
    }
    handleanswer_4Change = (event) => {
        this.setState({
            answer_4: event.target.value
        })
    }
    
    render() {
        return (
            //TODO: Add onsubmit (?) so the form wont cause page refresh
            <form className='form-container'>
                <div>
                    <label>Question</label>
                    <input type="text" 
                    value={this.state.question} 
                    onChange={this.handlequestionChange}/>
                </div>


                <div>
                    <Select name="" id="" >
                        <option value="">10s</option>
                        <option value="" selected>20s</option>
                        <option value="">30s</option>
                        <option value="">60s</option>

                    </Select>
                </div>

                <div>
                    <label>Answer 1 (Required)</label>
                    <TextField value={this.state.answer_1} onChange={this.handleanswer_1Change}></TextField>
                    <Checkbox color="success" size='large'/>
                </div>
                <div>
                    <label>Answer 2 (Required)</label>
                    <TextField value={this.state.answer_2} onChange={this.handleanswer_2Change}></TextField>
                    <Checkbox color="success" size='large'/>
                </div>
                <div>
                    <label>Answer 3</label>
                    <TextField value={this.state.answer_3} onChange={this.handleanswer_3Change}></TextField>
                    <Checkbox color="success" size='large'/>
                </div>
                <div>
                    <label>Answer 4</label>
                    <TextField value={this.state.answer_4} onChange={this.handleanswer_4Change}></TextField>
                    <Checkbox color="success" size='large'/>
                </div>


                
                <div>
                    <button onClick={ () => {this.handleAddButtonClick()}}>Next</button>
                </div>

                <div>
                    <button onClick={ () => {this.handleFinishedButtonClick()}}>Finished</button>
                </div>

                <div>
                    <button onClick={ () => {this.handleMenuButtonClick()}}>Home</button>
                </div>



            </form>
        );
    }
}

export default Form;