import React, { Component } from 'react';
import { ThemeProvider } from '@emotion/react';
import {createTheme, Checkbox, TextFieldAutosize, TextField, Select, FormControl, MenuItem, InputLabel, Button } from '@mui/material';

import App from './App';
import { red, white } from '@mui/material/colors';






class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // createScreenState : false,
            question: '',
            answer_1: '',
            answer_2: '',
            answer_3: '',
            answer_4: '',
            seconds : ''

        }
        this.theme = createTheme({
            palette: {
              mode: 'dark',
            },
          });
    }
    

    handleMenuButtonClick(){
        this.props.setMenuStates();
		
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
           
            <ThemeProvider theme={this.theme}>
            {/* //TODO: Add onsubmit (?) so the form wont cause page refresh */}
            <form className='form-container'>
                {/* <div>
                    <label>Question</label>
                    <input type="text" 
                    value={this.state.question} 
                    onChange={this.handlequestionChange}/>
                </div> */}

                <div> 
                    <label>Question: </label>
                    <TextField value={this.state.question} onChange={this.handlequestionChange}
                        label= "" multiline rows={4} variant="filled" ></TextField>

                    <div>
                    <FormControl fullWidth style={{minWidth: 125}}>
                    <InputLabel id ="seconds">Length</InputLabel>
                    <Select defaultValue={10} value={this.seconds} label="Seconds" name="" id="seconds" >
                        <MenuItem value={10}>10 Seconds</MenuItem>
                        <MenuItem value={20}>20 Seconds</MenuItem>
                        <MenuItem value={30}>30 Seconds</MenuItem>
                        <MenuItem value={60}>60 Seconds</MenuItem>

                    </Select>
                    </FormControl>
                    </div>
                </div>



                

                <div>
                    {/* <label>Answer 1 (Required)</label> */}
                    <TextField value={this.state.answer_1} onChange={this.handleanswer_1Change}
                     label= "Answer 1" multiline rows={2} variant="filled" ></TextField>
                    <Checkbox color="success" size='large'/>
                
                    {/* <label>Answer 2 (Required)</label> */}
                    <TextField value={this.state.answer_2} onChange={this.handleanswer_2Change}
                     label= "Answer 2" multiline rows={2} variant="filled"></TextField>
                    <Checkbox color="success" size='large'/>
                </div>
                <div>
                    {/* <label>Answer 3</label> */}
                    <TextField value={this.state.answer_3} onChange={this.handleanswer_3Change}
                     label= "Answer 3 (Optional)" multiline rows={2} variant="filled" ></TextField>
                    <Checkbox color="success" size='large'/>
               
                    {/* <label>Answer 4</label> */}
                    <TextField value={this.state.answer_4} onChange={this.handleanswer_4Change}
                    label= "Answer 4 (Optional)"  multiline rows={2} variant="filled"></TextField>
                    <Checkbox color="success" size='large'/>
                </div>


                
                <div>
                    <Button variant='contained' onClick={ () => {this.handleAddButtonClick()}}>Add Question</Button>
                </div>

                <div>
                    <Button variant='contained' onClick={ () => {this.handleFinishedButtonClick()}}>Finished</Button>
                </div>

            </form>
            
            <div>
                <button  onClick={ () => {this.handleMenuButtonClick()}}>Exit</button>
                </div>
            </ThemeProvider>

        );
    }
}

export default Form;