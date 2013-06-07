var guiskin:GUISkin;
var levelNames:String[];

function Start ()
{
	var linesCleared:int; // total lines 
	var multiplier:int; 
}

function Update ()
{

}

function OnGUI()
{
	GUI.skin = guiskin;
	var gameData:GameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	
	GUI.Label(Rect(	400, 400, 800, 40), "Your total score was: " );
	GUI.Label(Rect(810, 658, 200, 40), levelNames[gameData.level]);
	
	GUI.Label(Rect(623, 690, 200, 40), gameData.ringsTotal.ToString());
	GUI.Label(Rect(817, 690, 200, 40), gameData.ringsRemaining.ToString());
	
	GUI.Label(Rect(628, 724, 200, 40), gameData.score.ToString()); //notice how the rect starts at 0/0 and the matrix handles the position
	GUI.Label(Rect(828, 724, 200, 40), "hiscorehere");
}