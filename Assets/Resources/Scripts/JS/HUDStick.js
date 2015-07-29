#pragma strict

function Start ()
{

}

function Update ()
{
	this.transform.rotation = Quaternion.Euler(-Input.GetAxis("GP_Vertical") * 90, 0, -Input.GetAxis("GP_Horizontal") * 90);
}