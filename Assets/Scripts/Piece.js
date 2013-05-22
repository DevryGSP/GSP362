#pragma strict

@HideInInspector
var velocity:Vector2;

@HideInInspector
var speed:int;

@HideInInspector
var isSelected:boolean;

function Start ()
{
	velocity.x *= speed;
	velocity.y *= speed;
}

function Update ()
{
	this.transform.position.x += Time.deltaTime * velocity.x;	
	this.transform.position.y += Time.deltaTime * velocity.y;	
	
	if (isSelected)
	{
		// block rotation
		if (Input.GetKeyDown(KeyCode.Q))
		{
			this.transform.Rotate(Vector3(0, 0, 90));
			
			// if rotating puts piece in collision
			if (Collide(this.transform.position.x, this.transform.position.y))
			{
				// rotate back
				this.transform.Rotate(Vector3(0, 0, -90));
			}
		}
		else if (Input.GetKeyDown(KeyCode.E))
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
			if (Input.GetKeyDown(KeyCode.UpArrow))
			{
				if (!Collide(this.transform.position.x, this.transform.position.y + 1))
				{
					this.transform.position.y += 1;
				}
			}
			else if (Input.GetKeyDown(KeyCode.DownArrow))
			{
				if (!Collide(this.transform.position.x, this.transform.position.y - 1))
				{
					this.transform.position.y -= 1;
				}
			}
		}
		// if moving up or down
		else if (this.velocity.y != 0)
		{
			if (Input.GetKeyDown(KeyCode.LeftArrow))
			{
				if (!Collide(this.transform.position.x - 1, this.transform.position.y))
				{
					this.transform.position.x -= 1;
				}
			}
			else if (Input.GetKeyDown(KeyCode.RightArrow))
			{
				if (!Collide(this.transform.position.x + 1, this.transform.position.y))
				{
					this.transform.position.x += 1;
				}
			}
		}
	}
}

// moves peice to specified position and check children for collisions
function Collide(x:Number, y:Number)
{
	// save position
	var oldX:Number = this.transform.position.x;
	var oldY:Number = this.transform.position.y;
	
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

// when a child collides with a sold, this function is called
function OnChildTriggerEnter (other : Collider)
{
	// snap pice to the grid
	this.transform.position.x = Mathf.Ceil(this.transform.position.x / 1);
	this.transform.position.y = Mathf.Ceil(this.transform.position.y / 1);
            
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
