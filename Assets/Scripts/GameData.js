#pragma strict

static var score:int;
static var rings:int;
static var level:int;
static var ringsRemaining:int;
var guiskin:GUISkin;

function Start ()
{
	score = 0;
	rings = 0;
	level = 1;
	ringsRemaining = 10;
}

function Update ()
{

}

function OnGUI()
{
	GUI.skin = guiskin;
	GUI.Label(Rect(618, 658, 200, 40), level.ToString());
	GUI.Label(Rect(810, 658, 200, 40), "levelname");
	
	GUI.Label(Rect(623, 690, 200, 40), rings.ToString());
	GUI.Label(Rect(817, 690, 200, 40), ringsRemaining.ToString());
	
	GUI.Label(Rect(628, 724, 200, 40), score.ToString()); //notice how the rect starts at 0/0 and the matrix handles the position
	GUI.Label(Rect(828, 724, 200, 40), "hiscorehere");
}

public function OnBlocksCleared(rings:int):void
{
	score += (rings * 10) * (rings * 10);
	rings += rings;
	
	// TODO: "tetris" bonus
	
	if (ringsRemaining - rings > 0)
	{
		ringsRemaining -= rings;
	}
	else
	{
		ringsRemaining = 10;
		level++;
	}
}

public function OnFastDrop():void
{
	// TODO: fast drop/speed award
}