var guiskin:GUISkin;
var levelNames:String[];

function Start ()
{
	

}

function Update ()
{
	
}

function OnGUI()
{
	GUI.skin = guiskin;
	var gameData:GameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	var finalScore = gameData.ringsTotal * gameData.score;
	
	GUI.Label(Rect(	335, 200, 800, 40), "You made it to level: " + gameData.level);
	GUI.Label(Rect(	340, 240, 800, 40), "Your total score was ");
	GUI.Label(Rect(	275, 280, 800, 40), "Total Rings : " + gameData.ringsTotal.ToString() + " x Gamescore: " + gameData.score + " = " + finalScore); 
}