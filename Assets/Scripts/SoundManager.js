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

public function PlaySound(sound:AudioClip):AudioSource
{
	return PlaySound(sound, 1.0);
}

public function PlaySound(sound:AudioClip, volume:float):AudioSource
{
	var o:GameObject = Instantiate(soundPrefab, this.transform.position, this.transform.rotation);
	var audio:AudioSource = (o.GetComponent(AudioSource) as AudioSource);
	o.transform.parent = this.transform;
	audio.clip = sound;
	audio.volume = volume;
	
	return audio;
}

public function GetBlockSound():AudioClip
{
	var gameData:GameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	return blockSounds[gameData.level];
}