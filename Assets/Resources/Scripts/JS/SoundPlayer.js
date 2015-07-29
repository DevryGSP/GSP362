#pragma strict

function Start ()
{
	(this.GetComponent(AudioSource) as AudioSource).Play();
}

function Update ()
{
	if (!(this.GetComponent(AudioSource) as AudioSource).isPlaying)
	{
		Destroy(this.gameObject);
	}
}