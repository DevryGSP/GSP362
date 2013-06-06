#pragma strict

var soundPrefab:GameObject;
var planetNarrations:AudioClip[];
var blockSounds:AudioClip[];
var blockTris:AudioClip;

function Start ()
{

}

function Update ()
{

}

public function PlaySound(sound:AudioClip):void
{
	var o:GameObject = Instantiate(soundPrefab, this.transform.position, this.transform.rotation);
	o.transform.parent = this.transform;
	(o.GetComponent(AudioSource) as AudioSource).clip = sound;
}

public function GetBlockSound():AudioClip
{
	var gameData:GameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	return blockSounds[gameData.level];
}