#pragma strict
//intro variables for gui for scroll and blink
///public
var intro: Transform;
var title: Transform;
//private
private var titleSpeed: float = .30f;

function Awake(){
title.position.y = 0;
}


function Update () {	
	if(title.position.y <= .848){
	title.transform.Translate(Vector3.up * titleSpeed * Time.deltaTime);
	}
	else{
	titleSpeed = 0; 
	title.position.y = .848;
	}
	
	if(Input.GetButton("Starter")){
	Application.LoadLevel(2);
	}
}