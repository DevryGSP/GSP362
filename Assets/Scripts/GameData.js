#pragma strict

var levelNames:String[];

static var score:int;
static var rings:int;
static var level:int;
static var ringsRemaining:int;

function Start ()
{
	score = 0;
	rings = 0;
	level = 0;
	ringsRemaining = 10;
}

function Update ()
{

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