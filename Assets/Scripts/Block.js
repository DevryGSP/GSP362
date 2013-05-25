#pragma strict

function Start ()
{
}

function Update ()
{

}

// checks for collisions at the specified position
function Collide(x:Number, y:Number):boolean
{
	// get all overlapping colliders
	var colliders = Physics.OverlapSphere(new Vector3(x, y, this.transform.position.z), 0.48);
	for (var i:int = 0; i < colliders.length; i++)
	{
		if (colliders[i].transform.tag == "block" 
		|| colliders[i].transform.tag == "gameboard"
		|| colliders[i].transform.tag == "border")
		{
			// if has parent
			if (colliders[i].transform.parent)
			{
				// if block is not in the block container
				if (colliders[i].transform.parent.name != "BlockContainer")
				{	
					// check that the parent is not the same
					if (colliders[i].transform.parent != this.transform.parent)
					{
						// collided with block
						return true;
					}
				}
				else
				{
					// collided with block that was part of another piece
					return true;
				}
			}
			else
			{
				// collided game board
				return true;
			}
		}
	}
	
	// collided with none or colliders were part of same piece
	return false;
}