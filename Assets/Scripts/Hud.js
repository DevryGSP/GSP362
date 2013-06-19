#pragma strict

var guiskin:GUISkin;
var levelNames:String[];
var highScore:int;

function Start ()
{
	var gameData:GameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	highScore = gameData.GetHighScores()[0].score;
}

function Update ()
{

}

function OnGUI()
{
	GUI.skin = guiskin;
	var gameData:GameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	
	GUI.Label(Rect(600, 510, 200, 40), gameData.level.ToString());
	GUI.Label(Rect(710, 510, 200, 40), levelNames[gameData.level]);
	
	GUI.Label(Rect(605, 535, 200, 40), gameData.ringsTotal.ToString());
	GUI.Label(Rect(720, 535, 200, 40), gameData.ringsRemaining.ToString());
	
	GUI.Label(Rect(610, 560, 200, 40), gameData.score.ToString()); //notice how the rect starts at 0/0 and the matrix handles the position
	GUI.Label(Rect(720, 560, 200, 40), highScore.ToString());
}