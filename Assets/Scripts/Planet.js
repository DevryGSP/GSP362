#pragma strict

var planets:Material[];

function Start ()
{
	var sm:SoundManager = GameObject.Find("SoundManager").GetComponent(SoundManager) as SoundManager;
	sm.PlaySound(sm.planetNarrations[0]);
}

function Update ()
{

}

public function OnLevelUp():void
{
	var gameData:GameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	this.renderer.material = planets[gameData.level];
	
	var sm:SoundManager = GameObject.Find("SoundManager").GetComponent(SoundManager) as SoundManager;
	sm.PlaySound(sm.planetNarrations[gameData.level]);
}