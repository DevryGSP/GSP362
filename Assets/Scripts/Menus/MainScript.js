#pragma strict
//intro variables for gui for scroll and blink
var intro: Transform;
var title: Transform;
var titleSpeed: int = .2;

function Start () {
title.position.y = -.7;
}
var count: int;
function Update () {
	count = 0;
	if(title.position.y <= .848){
	title.transform.Translate(Vector3.up * titleSpeed * Time.deltaTime);
	}
	else{
	titleSpeed = 0; 
	title.position.y = .848;
	}
	
	if(Input.GetButton("Starter")){
	count++;
	Application.LoadLevel(1);
	}
}