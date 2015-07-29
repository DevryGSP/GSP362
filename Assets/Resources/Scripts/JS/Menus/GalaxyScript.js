#pragma strict
var rotationSpeed = 5;

function Start () {

}

function Update () {
	transform.Rotate (Vector3.up * Time.deltaTime * rotationSpeed);
}