#pragma strict
/////////////////////////////////////
// MainScript created by patrick rasmussen 
// Main script handles the titles splash screen.
/////////////////////////////////////

//intro variables for gui for scroll and blink

///public
var intro: Transform;
var title: Transform;
//private
private var titleSpeed: float = .30f;

// handles setting the title position when the program starts.
function Awake(){
title.position.y = 0;
}

// continuly upates the position until it rreaches set height
function Update () {
	// check title transform before moving the vector up	
	if(title.position.y <= .848){
	title.transform.Translate(Vector3.up * titleSpeed * Time.deltaTime);
	}
	// if the title is in position turn off speed and set position.
	else{
	titleSpeed = 0; 
	title.position.y = .848;
	}
	// waits for player to press start on gamepad or enter on controller
	if(Input.GetButton("Starter")){
	Application.LoadLevel(2);
	}
}