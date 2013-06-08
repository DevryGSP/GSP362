#pragma strict

function Start ()
{
	var sm:SoundManager = GameObject.Find("SoundManager").GetComponent(SoundManager) as SoundManager;
	var audio:AudioSource = sm.PlaySound(sm.themeSong, 0.5f);
	audio.loop = true;
}

function Update ()
{

}