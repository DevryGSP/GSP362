#pragma strict

@HideInInspector
var velocity:Vector2;

@HideInInspector
var speed:int;

@HideInInspector
var moveTimer:float;

@HideInInspector
var isSelected:boolean;

@HideInInspector
var canMovePiece:boolean;

function Start ()
{
	canMovePiece = true;
	moveTimer = speed;
}

function Update ()
{
	if (moveTimer > 0.0)
	{
		moveTimer -= 100 * Time.deltaTime;
	}
	else
	{	
		moveTimer = speed;
		
		if (!Collide(this.transform.position.x + velocity.x, this.transform.position.y + velocity.y))
		{	
			this.transform.position.x += velocity.x;
			this.transform.position.y += velocity.y;
		}
		else
		{
			isSelected = false;
		   	
		   	// remove all children from this parent
		   	var count:int = this.transform.GetChildCount();
		   	for (var i:int = 0; i < count; i++)
		   	{
		   		this.transform.GetChild(0).parent = GameObject.Find("BlockContainer").transform;
		   	}
		   	
		   	// destroy self
			Destroy(this.gameObject);
		}
	}
	
	if (isSelected)
	{
		// block rotation
		if (Input.GetButtonDown("RotateCounter"))
		{
			this.transform.Rotate(Vector3(0, 0, 90));
			
			// if rotating puts piece in collision
			if (Collide(this.transform.position.x, this.transform.position.y))
			{
				// rotate back
				this.transform.Rotate(Vector3(0, 0, -90));
			}
		}
		else if (Input.GetButtonDown("RotateClock"))
		{
			this.transform.Rotate(Vector3(0, 0, -90));
			
			// if rotating puts piece in collision
			if (Collide(this.transform.position.x, this.transform.position.y))
			{
				// rotate back	
				this.transform.Rotate(Vector3(0, 0, 90));
			}
		}
		
		// if moving left or right
		if (this.velocity.x != 0)
		{
			if ((Input.GetAxis("Vertical") < 0 && canMovePiece) || Input.GetKeyDown("up"))
			{
				canMovePiece = false;
				if (!Collide(this.transform.position.x, this.transform.position.y + 1))
				{
					this.transform.position.y += 1;
				}
			}
			else if ((Input.GetAxis("Vertical") > 0 && canMovePiece) || Input.GetKeyDown("down"))
			{
				canMovePiece = false;
				if (!Collide(this.transform.position.x, this.transform.position.y - 1))
				{
					this.transform.position.y -= 1;
				}
			}
			else if (Input.GetAxis("Vertical") == 0)
			{
				canMovePiece = true;
			}
		}
		// if moving up or down
		else if (this.velocity.y != 0)
		{
			if ((Input.GetAxis("Horizontal") < 0 && canMovePiece) || Input.GetKeyDown("left"))
			{
				canMovePiece = false;
				if (!Collide(this.transform.position.x - 1, this.transform.position.y))
				{
					this.transform.position.x -= 1;
				}
			}
			else if ((Input.GetAxis("Horizontal") > 0 && canMovePiece) ||  Input.GetKeyDown("right"))
			{
			 	canMovePiece = false;
				if (!Collide(this.transform.position.x + 1, this.transform.position.y))
				{
					this.transform.position.x += 1;
				}
			}
			else if (Input.GetAxis("Horizontal") == 0)
			{
				canMovePiece = true;
			}
		}
	}
}

// moves peice to specified position and check children for collisions
function Collide(x:float, y:float):boolean
{
	// save position
	var oldX:float = this.transform.position.x;
	var oldY:float = this.transform.position.y;
	
	// move to new position
	this.transform.position.x = x;
	this.transform.position.y = y;
	
	// make sure none of children collide
	var count:int = this.transform.GetChildCount();
   	for (var i:int = 0; i < count; i++)
   	{
   		var block:Block = this.transform.GetChild(i).GetComponent("Block") as Block;
   		if (block.Collide(block.transform.position.x, block.transform.position.y))
   		{
   			// move back to original pos
   			this.transform.position.x = oldX;
   			this.transform.position.y = oldY;
   		
   			return true;
   		}
   	}
   	
   	// move back to original pos
   	this.transform.position.x = oldX;
   	this.transform.position.y = oldY;
   	
   	return false;
}
