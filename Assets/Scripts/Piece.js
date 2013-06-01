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

@HideInInspector
var hasCollided:boolean;

function Start ()
{
	hasCollided = false;
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
		if (!Collide(this.transform.position.x + velocity.x, this.transform.position.y + velocity.y))
		{	
			moveTimer = speed;
			this.transform.position.x += velocity.x;
			this.transform.position.y += velocity.y;
		}
		else
		{
			if (!hasCollided)
			{
				hasCollided = true;
				moveTimer = 20;
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
	}
	
	if (isSelected)
	{
		// fast drop
		if (Input.GetButtonDown("QuickDrop"))
		{
			while (!Collide(this.transform.position.x + velocity.x, this.transform.position.y + velocity.y))
			{
				this.transform.position.x += velocity.x;
				this.transform.position.y += velocity.y;
			}
		}
	
		// block rotation
		var c:Collider;
		if (Input.GetButtonDown("RotCountClock"))
		{
			this.transform.Rotate(Vector3(0, 0, 90));
			
			CheckRotatedCollisions(90);
		}
		else if (Input.GetButtonDown("RotClock"))
		{
			this.transform.Rotate(Vector3(0, 0, -90));
			
			CheckRotatedCollisions(-90);
		}
		
		// if moving left or right
		if (this.velocity.x != 0)
		{
			if (canMovePiece && (Input.GetAxis("Vertical") < 0 || Input.GetAxis("GP_Vertical") < 0 || Input.GetAxis("DPad_Vertical") < 0))
			{
				canMovePiece = false;
				if (!Collide(this.transform.position.x, this.transform.position.y + 1))
				{
					this.transform.position.y += 1;
				}
			}
			else if (canMovePiece && (Input.GetAxis("Vertical") > 0 || Input.GetAxis("GP_Vertical") > 0 || Input.GetAxis("DPad_Vertical") > 0))
			{
				canMovePiece = false;
				if (!Collide(this.transform.position.x, this.transform.position.y - 1))
				{
					this.transform.position.y -= 1;
				}
			}
			else if (Input.GetAxis("Vertical") == 0 && Input.GetAxis("DPad_Vertical") == 0)
			{
				canMovePiece = true;
			}
		}
		// if moving up or down
		else if (this.velocity.y != 0)
		{
			if (canMovePiece && (Input.GetAxis("Horizontal") < 0 || Input.GetAxis("GP_Horizontal") < 0 || Input.GetAxis("DPad_Horizontal") < 0))
			{
				canMovePiece = false;
				if (!Collide(this.transform.position.x - 1, this.transform.position.y))
				{
					this.transform.position.x -= 1;
				}
			}
			else if (canMovePiece && (Input.GetAxis("Horizontal") > 0 ||  Input.GetAxis("GP_Horizontal") > 0 || Input.GetAxis("DPad_Horizontal") > 0))
			{
			 	canMovePiece = false;
				if (!Collide(this.transform.position.x + 1, this.transform.position.y))
				{
					this.transform.position.x += 1;
				}
			}
			else if (Input.GetAxis("Horizontal") == 0 && Input.GetAxis("DPad_Horizontal") == 0)
			{
				canMovePiece = true;
			}
		}
	}
}

function CheckRotatedCollisions(rotation:float):void
{
	var c = Collide(this.transform.position.x, this.transform.position.y);
	var itr:int = 0;
	while (c)
	{		
		// take a step out of collision
		switch(c.name)
		{
			case "NorthLeft":	this.transform.position.x++; break;
			case "NorthRight":	this.transform.position.x--; break;
			case "SouthLeft":	this.transform.position.x--; break;
			case "SouthRight":	this.transform.position.x++; break;
			case "EastLeft":	this.transform.position.y--; break;
			case "EastRight":	this.transform.position.y++; break;
			case "WestLeft":	this.transform.position.y++; break;
			case "WestRight":	this.transform.position.y--; break;
			case "Gameboard":
				this.transform.position.x -= this.velocity.x;
				this.transform.position.y -= this.velocity.y;
				break;
			default: 
				//print("collider not defined!");
				this.transform.Rotate(Vector3(0, 0, -rotation));
				return;
		}
		
		// in case stuck in collision too long, break from loop
		itr++;
		if (itr > 100)
		{
			//print("too many iterations"); 
			this.transform.Rotate(Vector3(0, 0, -rotation));
			return;
		}
		
		// check for collisions at new position
		c = Collide(this.transform.position.x, this.transform.position.y);
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
	var count:int = this.transform.GetChildCount();
   	for (var i:int = 0; i < count; i++)
   	{
   		var block:Block = this.transform.GetChild(i).GetComponent("Block") as Block;
   		var c:Collider = block.Collide(block.transform.position.x, block.transform.position.y);
   		if (c)
   		{
   			// move back to original pos
   			this.transform.position.x = oldX;
   			this.transform.position.y = oldY;
   		
   			return c;
   		}
   	}
   	
   	// move back to original pos
   	this.transform.position.x = oldX;
   	this.transform.position.y = oldY;
   	
   	return null;
}
