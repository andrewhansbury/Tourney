import React, { Component } from 'react';
import { ThemeProvider } from '@emotion/react';
import {createTheme, Checkbox, TextFieldAutosize, TextField, Select, FormControl, MenuItem, InputLabel, Button } from '@mui/material';



import { red, white } from '@mui/material/colors';
import {collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';


class Create extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        
            question: '',
            answer_1: '',
            answer_2: '',
            answer_3: '',
            answer_4: '',

            answer_1_correct : false,
            answer_2_correct : false,
            answer_3_correct : false,
            answer_4_correct : false,
            
            seconds : 10,
            question_bank: [],
            question_num : 1,

        }
        this.theme = createTheme({
            palette: {
              mode: 'dark',
            },
          });
    };
    

    handleMenuButtonClick(){
        this.props.setMenuStates();
	}

    // Make sure to add input error handling... 
    // (fields must not be blank etc...)
    handleAddButtonClick(){
        this.setState({question_num: this.state.question_num + 1});

        let correct_answers = [];
        if (this.state.answer_1_correct === true){
            correct_answers.push(1);
        };
        if (this.state.answer_2_correct === true){
            correct_answers.push(2);
        };
        if (this.state.answer_3_correct === true){
            correct_answers.push(3);
        };
        if (this.state.answer_4_correct === true){
            correct_answers.push(4);
        };

        let entry = {
            "question": this.state.question,
            "answer_1": this.state.answer_1,
            "answer_2": this.state.answer_2,
            "answer_3": this.state.answer_3,
            "answer_4": this.state.answer_4,
            "seconds" : this.state.seconds,
            "question_num" : 1,
            "correct_answers" : correct_answers

        };
        
        this.state.question_bank.push(entry);
        this.newQuestion();
        
        console.log(this.state.question_bank);

	}

    async addToDatabse(entry){
        let q_num = entry.question_num;

        const docRef = await addDoc(collection(db, "question_banks"),{
            q_num : {
            question: "penis penis",
            answers : ["cock", "double cock", "booty cheeks"],
            seconds: 20
            }
        });




    }

    async handleFinishedButtonClick(){

        //Creatign the document (getting a docRef ID)
        const docRef = await addDoc(collection(db, "question_banks"),{});
        // const docRef = await addDoc(collection(db, "question_banks"),{
        //     q1: {
        //     question: "penis penis",
        //     answers : ["cock", "double cock", "booty cheeks"],
        //     seconds: 20
        //     }
        // });

        console.log("Document written with ID: ", docRef.id);

        // this.state.question_bank.forEach(entry => this.addToDatabse(entry) );

    }


    handleQuestionChange = (event) => {
        this.setState({question: event.target.value});
    }

    handleSecondsChange = (event) => {
        this.setState({seconds: event.target.value});
    }

    //Answer text field handlers
    // TODO: Compress these to a single function if possible

    handleanswer_1Change = (event) => {
        this.setState({answer_1: event.target.value});
    }
    handleanswer_2Change = (event) => {
        this.setState({answer_2: event.target.value});
    }
    handleanswer_3Change = (event) => {
        this.setState({answer_3: event.target.value});
    }
    handleanswer_4Change = (event) => {
        this.setState({answer_4: event.target.value});
    }

    //Checkbox handlers
    // TODO: Compress these to a single function if possible

    handle_a1_checkbox = () => {
        this.setState({answer_1_correct : !this.state.answer_1_correct})
    }
    handle_a2_checkbox = () => {
        this.setState({answer_2_correct : !this.state.answer_2_correct})
    }
    handle_a3_checkbox = () => {
        this.setState({answer_3_correct : !this.state.answer_3_correct})
    }
    handle_a4_checkbox = () => {
        this.setState({answer_4_correct : !this.state.answer_4_correct})
    }

    newQuestion(){
        this.setState({question : ''});

        this.setState({answer_1 : ''});
        this.setState({answer_2 : ''});
        this.setState({answer_3 : ''});
        this.setState({answer_4 : ''});

        this.setState({answer_1_correct : false,})
        this.setState({answer_2_correct : false,})
        this.setState({answer_3_correct : false,})
        this.setState({answer_4_correct : false,})

        this.setState({seconds : 10})

    }
    
    
    
    render() {
        return (
            
           
            <ThemeProvider theme={this.theme}>
            
            
            <div>  
                    
                    <div className='question-counter'> #{this.state.question_num} </div>
                    <div className='total-questions'> / {this.state.question_bank.length + 1}</div>

                    
                </div>
            <div className='form-container'>

                


                <div> 
                    <label>Question: </label>
                    <TextField value={this.state.question} onChange={this.handleQuestionChange}
                        label= "Question" multiline rows={2} style = {{width: 300}} variant="filled" ></TextField>

                    <div>
                    <FormControl fullWidth style={{minWidth: 125}}>
                    <InputLabel id ="seconds">Length</InputLabel>
                    <Select defaultValue={10} value={this.state.seconds} onChange={this.handleSecondsChange} label="Seconds" name="" id="seconds" >
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
                    <Checkbox color="success" size='large' checked={this.state.answer_1_correct} 
                    onChange={this.handle_a1_checkbox}/>
                
                    {/* <label>Answer 2 (Required)</label> */}
                    <TextField value={this.state.answer_2} onChange={this.handleanswer_2Change}
                     label= "Answer 2" multiline rows={2} variant="filled"></TextField>
                    <Checkbox color="success" size='large' checked={this.state.answer_2_correct} 
                    onChange={this.handle_a2_checkbox}/>
                </div>
                <div>
                    {/* <label>Answer 3</label> */}
                    <TextField value={this.state.answer_3} onChange={this.handleanswer_3Change}
                     label= "Answer 3 (Optional)" multiline rows={2} variant="filled" ></TextField>
                    <Checkbox color="success" size='large' checked={this.state.answer_3_correct} 
                    onChange={this.handle_a3_checkbox}/>
               
                    {/* <label>Answer 4</label> */}
                    <TextField value={this.state.answer_4} onChange={this.handleanswer_4Change}
                    label= "Answer 4 (Optional)"  multiline rows={2} variant="filled"></TextField>
                    <Checkbox color="success" size='large' checked={this.state.answer_4_correct} 
                    onChange={this.handle_a4_checkbox}/>
                </div>


                
            
                <button style={{float:'center'}} className= "create-buttons" onClick={ () => {this.handleAddButtonClick()}}>Add Question</button>

            </div>
            
            <div>
                

                <button className='create-buttons'   onClick={ () => {this.handleMenuButtonClick()}}>Menu</button>

                
                <button className='create-buttons' style={{float:'right'}} onClick={ () => {this.handleFinishedButtonClick()}}>Finished</button>
                
            </div>
            </ThemeProvider>

        );
    }
}

export default Create;