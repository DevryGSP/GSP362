#pragma strict

var score:int;
var ringsTotal:int;
var level:int;
var ringsRemaining:int;
 
function Start ()
{
	score = 0;
	ringsTotal = 0;
	level = 0;
	ringsRemaining = 10;
}

function Update ()
{

}

public function OnBlocksCleared(rings:int):void
{
	score += (rings * 10) * (rings * 10);
	ringsTotal += rings;
	
	// award 'tetris' bonus
	if (rings == 5)
	{
		score += 500;	
	}
	
	ringsRemaining -= rings;
	if (ringsRemaining - rings <= 0)
	{
		ringsRemaining = 10 + ringsRemaining;
		level++;
		(GameObject.Find("Planet").GetComponent(Planet) as Planet).OnLevelUp();
	}
}

public function OnFastDrop():void
{
	score += 10;	
}