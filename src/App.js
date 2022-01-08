
import React, { useState } from 'react';



function App() {

	const[menuScreenState, setMenuScreenState] = useState(true)
	const [createScreenState, setCreateScreenState]  = useState(false);
	const [joinScreenState, setJoinScreenState]  = useState(false);

	function handleJoinButtonClick(){
		setJoinScreenState(true);
		setMenuScreenState(false);

	}

	function handleCreateButtonClick () {
	
		setCreateScreenState(true);
		setMenuScreenState(false);
		  
	}

	function joinScreen(){
		return (
			<h1> Join Screen! </h1>
		)
	}

	function createScreen(){
		return (
			<h1> Create Screen! </h1>
		)
	}
	
	function ShowMenu(){

		
		return (
		
		<div className="Menu-container">

			<div className="M_header">
				<h1>Tourney!</h1>
			</div>

			<div className="M_code_entry">
				<input className = "entry-1" type="text" placeholder="6-DIGIT CODE" maxLength="6" />
			</div>

			<div className="M_join_button">
				<button className="join-button btn-hover" onClick={() =>
					{handleJoinButtonClick()}}>Join!</button>
			</div>

			<div className="M_join_button">
				<button className="create-button btn-hover" onClick={ () => 
					{ handleCreateButtonClick()}}> Create Game </button>
			</div>

		</div>

		);

	}



  return (
    <div className="App">


		{menuScreenState ? ShowMenu() : createScreenState ? createScreen() : joinScreenState ? joinScreen() : null } 
		{/* {createScreenState ? createScreenState() : joinScreenState ? joinScreenState() : ShowMenu() }  */}
				

		{/* { createScreenState ? (<h1>DEEZNUTZ</h1>) : (ShowMenu())} */}
		
			
    </div>
  );
}

export default App;
