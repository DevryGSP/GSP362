#pragma strict

function Start ()
{
}

function Update ()
{

}

// checks for collisions at the specified position
function Collide(x:Number, y:Number)
{
	return Physics.CheckSphere(new Vector3(x, y, this.transform.position.z), 0.48);
}

function OnTriggerEnter (other : Collider)
{
    if (other.tag == "gameboard" || other.tag == "block")
    {
    	// if part of a piece
    	if (this.transform.parent.tag == "piece")
    	{
    		var o:Piece = this.transform.parent.GetComponent("Piece") as Piece;
    		o.OnChildTriggerEnter(other);
    	}
    }
}