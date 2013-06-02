#pragma strict

var score:int;
var lines:int;
var level:int;
var linesRemaining:int;
public var guiskin:GUISkin;

    
function Start (){

}

function Update (){

}

function OnGUI(){
	GUI.skin = guiskin;
	GUI.Label(Rect(618, 661, 200, 20), "levelhere");
	GUI.Label(Rect(810, 661, 200, 20), "levelname");
	
	GUI.Label(Rect(623, 694, 200, 20), "lineshere");
	GUI.Label(Rect(817, 694, 200, 20), "linesremain");
	
	GUI.Label(Rect(628, 725, 200, 20), "scorehere"); //notice how the rect starts at 0/0 and the matrix handles the position
	GUI.Label(Rect(828, 725, 200, 20), "hiscorehere");
	
   }