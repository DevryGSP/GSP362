#pragma strict

function Start ()
{

}

function Update ()
{

}

function UpdatePosition(position:Vector3, rotation:Quaternion, velocity:Vector2):void
{
	this.transform.rotation = rotation;
	
	this.transform.position = position;
	while (!Collide(this.transform.position.x + velocity.x, this.transform.position.y + velocity.y))
	{
		this.transform.position.x += velocity.x;
		this.transform.position.y += velocity.y;
	}
}

// moves peice to specified position and check children for collisions
function Collide(x:float, y:float):Collider
{
	// save position
	var oldX:float = this.transform.position.x;
	var oldY:float = this.transform.position.y;
	
	// move to new position
	this.transform.position.x = x;
	this.transform.position.y = y;
	
	// make sure none of children collide
	var count:int = this.transform.childCount;
   	for (var i:int = 0; i < count; i++)
   	{
   		var block:Block = this.transform.GetChild(i).GetComponent("Block") as Block;
   		var c:Collider = block.Collide(block.transform.position.x, block.transform.position.y);
   		if (c)
   		{
   			if (c.transform.name == "Gameboard")
   			{
   					// move back to original pos
		   			this.transform.position.x = oldX;
		   			this.transform.position.y = oldY;
		   		
		   			return c;
   			}
   			else
   			{
	   			if (c.transform.parent.name == "BlockContainer")
	   			{
		   			// move back to original pos
		   			this.transform.position.x = oldX;
		   			this.transform.position.y = oldY;
		   		
		   			return c;
		   		}
		   	}
   		}
   	}
   	
   	// move back to original pos
   	this.transform.position.x = oldX;
   	this.transform.position.y = oldY;
   	
   	return null;
}