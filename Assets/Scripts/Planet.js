#pragma strict

var planets:Material[];

function Start ()
{

}

function Update ()
{

}

public function OnLevelUp():void
{
	var gameData:GameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	this.renderer.material = planets[gameData.level];
}