import React, { Component } from 'react';
import { ThemeProvider } from '@emotion/react';
import {createTheme, Checkbox,  TextField, Select, FormControl, MenuItem, InputLabel,  } from '@mui/material';
import { PropagateLoader} from 'react-spinners';




import {collection,  setDoc, doc, query, getDocs } from 'firebase/firestore';
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
            gameID : "",

            loading : false

        }
        this.theme = createTheme({
            palette: {
              mode: 'white',
            },
          });
    };
    

    handleMenuButtonClick(){
        this.props.setMenuStates();
	}

    
    handleAddButtonClick(){
        //error handling if statements
        if (this.state.question === "" && this.state.question_bank.length < 1){
            alert("Your question can't be blank!");
            return 1
        }
        if (this.state.answer_1 === "" || this.state.answer_2 === "" ){
            alert("Both Answer 1 and 2 are required!");
            return 1
        }

        if ( (this.state.answer_1_correct === false) && (this.state.answer_2_correct === false) 
        && (this.state.answer_3_correct === false) && (this.state.answer_4_correct === false)){
            alert("At least one answer has to be correct!")
            return 1
        }
        if ( (this.state.answer_3_correct === true) && (this.state.answer_3 === "")){
            alert("Answer 3 can't be correct if it's blank!");
            return 1
        }
        if ( (this.state.answer_4_correct === true) && (this.state.answer_4 === "")){
            alert("Answer 4 can't be correct if it's blank!");
            return 1
        }
        


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
            "question_num" : this.state.question_num,
            "correct_answers" : correct_answers

        };
        
        this.state.question_bank.push(entry);
        this.newQuestion();
        
        console.log(this.state.question_bank);

	}

    




    async addToDatabase(docRef,entry){        
        
        let q_num = entry.question_num;
        
        let questions =  [];

        if (entry.answer_1 !== ''){
            questions.push(entry.answer_1);
        }
        if (entry.answer_2 !== ''){
            questions.push(entry.answer_2);
        }
        if (entry.answer_3 !== ''){
            questions.push(entry.answer_3);
        }
        if (entry.answer_4 !== ''){
            questions.push(entry.answer_4);
        }
        

// FIREBASE GAME CREATION IS HERE
        await setDoc(doc(db, "question_banks", docRef), 
        {
            questions:{
        
            ["q" +q_num] : {
            question: entry.question,
            answers : questions,
            correct_answers : entry.correct_answers,
            seconds: entry.seconds
            } 
        },
        bank_name: '',
        answered_players : [],
        players:[],
        scores : {},
        started:false,
        show_question:false,
        curr_num : 1,
        matchups: {}
        }, {merge:true});

    }


    async handleFinishedButtonClick(){

        // Dont add to database if theres an issue
        // with the question
        this.setState({loading : true})
        //fix this so finished will create database entry if one question is 
        if (this.state.question !== "");
            if (this.handleAddButtonClick() === 1){
                return
            }

        //Change States to hosting screen
            

        let gameID = String(Math.floor(100000 + Math.random()*900000));
        this.props.setGameCode(gameID);


        let ids = [];
        const deez = query(collection(db, "question_banks"));
        const querySnapshot = await getDocs(deez);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            ids.push(doc.id);
        });
        //If the generated gameID already, regenerate until its unique
        while (gameID in ids){
            gameID = String(Math.floor(100000 + Math.random()*900000));
        } 
        this.setState({gameID : gameID})

        
        //Creating the document in "question_banks"
        await setDoc(doc(db, "question_banks", gameID), {} );//,{});
        console.log("Document written with ID: ", gameID);

        for (const element of this.state.question_bank){
            this.addToDatabase(gameID, element);
        };
        this.setState({loading:false})
        this.props.setHostStates();

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
        if (this.state.loading){
            return (
                <PropagateLoader color='#A2C1FA'/>
            );

        }
        else
        return (
            
           
            <div className='form-container'>
            <div className='question-num-container'>  
                    
                    <div className='question-counter'> #{this.state.question_num}/{this.state.question_bank.length + 1}</div>
        

                </div>

                    <input className='question-entry' placeholder='Question' value={this.state.question} onChange={this.handleQuestionChange}
                        label= "Question" multiline rows={2} variant="filled" ></input>

                <div className='seconds-select'>

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
           


                
                <div className='answers'>

                <div> 
                    <input  className='answer-entry1' value={this.state.answer_1} placeholder='Answer 1' onChange={this.handleanswer_1Change}
                     label= "Answer 1" multiline rows={2} variant="filled" type={"text"}></input>

                    <Checkbox color="success" size='large' checked={this.state.answer_1_correct} 
                    onChange={this.handle_a1_checkbox}/>
                    
                    <input className='answer-entry2' value={this.state.answer_2} placeholder='Answer 2' onChange={this.handleanswer_2Change}
                     label= "Answer 2" multiline rows={2} variant="filled" type={"text"}></input>

                    <Checkbox color="success" size='large' checked={this.state.answer_2_correct} 
                    onChange={this.handle_a2_checkbox}/>

                </div>
                <div>
                    
                    <input className='answer-entry3'  value={this.state.answer_3} placeholder='Answer 3' onChange={this.handleanswer_3Change}
                     label= "Answer 3 (Optional)" multiline rows={2} variant="filled" type={"text"} ></input>
                       
                    <Checkbox color="success" size='large' checked={this.state.answer_3_correct} 
                    onChange={this.handle_a3_checkbox}/>
      
                    <input className='answer-entry4' value={this.state.answer_4} placeholder='Answer 4' onChange={this.handleanswer_4Change}
                     label= "Answer 4 (Optional)"  multiline rows={2} variant="filled" type={"text"}></input>

                    <Checkbox color="success" size='large' checked={this.state.answer_4_correct} 
                    onChange={this.handle_a4_checkbox}/>
                </div>

                </div>   

                        
                <button style={{float:'center'}} className= "create-buttons" onClick={ () => {this.handleAddButtonClick()}}>Add Question</button>

            
            <div>

                <button className='create-buttons'   onClick={ () => {this.handleMenuButtonClick()}}>Menu</button>
                <button className='create-buttons' style={{float:'right'}} onClick={ () => {this.handleFinishedButtonClick()}}>Finished</button>
                
            </div>

        </div>
     

        );
    }
}

export default Create;