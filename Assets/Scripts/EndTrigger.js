#pragma strict

function Start ()
{

}

function Update ()
{

}

function OnTriggerStay(other:Collider):void
{
	if (other.transform.parent.name == "BlockContainer")
	{
		// TODO: goto game over screen
	}
}