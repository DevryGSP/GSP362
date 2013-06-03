#pragma strict

var guiskin:GUISkin;

function Start ()
{

}

function Update ()
{

}

function OnGUI()
{
	GUI.skin = guiskin;
	GUI.Label(Rect(618, 658, 200, 40), (GameData.level + 1).ToString());
	GUI.Label(Rect(810, 658, 200, 40), "levelname");
	
	GUI.Label(Rect(623, 690, 200, 40), GameData.rings.ToString());
	GUI.Label(Rect(817, 690, 200, 40), GameData.ringsRemaining.ToString());
	
	GUI.Label(Rect(628, 724, 200, 40), GameData.score.ToString()); //notice how the rect starts at 0/0 and the matrix handles the position
	GUI.Label(Rect(828, 724, 200, 40), "hiscorehere");
}