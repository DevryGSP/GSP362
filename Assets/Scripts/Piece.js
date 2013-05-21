#pragma strict

@HideInInspector
var velocity:Vector2;

@HideInInspector
var speed:int;

@HideInInspector
var canMove:boolean;

@HideInInspector
var isSelected:boolean;

function Start ()
{
	canMove = true;
	
	velocity.x *= speed;
	velocity.y *= speed;
}

function Update ()
{
	if (canMove)
	{
		this.transform.position.x += Time.deltaTime * velocity.x;	
		this.transform.position.y += Time.deltaTime * velocity.y;	
	}
	
	if (isSelected)
	{
		// if moving left or right
		if (this.velocity.x != 0)
		{
			if (Input.GetKeyDown(KeyCode.UpArrow))
			{
				this.transform.position.y += 1;
			}
			else if (Input.GetKeyDown(KeyCode.DownArrow))
			{
				this.transform.position.y -= 1;
			}
		}
		// if moving up or down
		else if (this.velocity.y != 0)
		{
			if (Input.GetKeyDown(KeyCode.LeftArrow))
			{
				if (!collide(this.transform.position.x - 1, this.transform.position.y))
				{
					this.transform.position.x -= 1;
				}
			}
			else if (Input.GetKeyDown(KeyCode.RightArrow))
			{
				if (!collide(this.transform.position.x + 1, this.transform.position.y))
				{
					this.transform.position.x += 1;
				}
			}
		}
	}
}

public function collide(x:Number, y:Number)
{
	var colliders = Physics.OverlapSphere(new Vector3(x, y, 0), 0.5);
	if (colliders.Length > 1)
	{
		return true;
	}
	else
	{
		return false;
	}
}

public function OnChildTriggerEnter (other : Collider)
{
	if (canMove)
	{
		if (this.velocity.x > 0)
	    {
	        this.transform.position.x = other.transform.position.x - other.transform.localScale.x * 0.5 - this.transform.localScale.x * 0.5;
	    }
	    else if (this.velocity.x < 0)
	    {
	        this.transform.position.x = other.transform.position.x + other.transform.localScale.x * 0.5 + this.transform.localScale.x * 0.5;
	    }
	    
	    if (this.velocity.y > 0)
	    {
	        this.transform.position.y = other.transform.position.y - other.transform.localScale.y * 0.5 - this.transform.localScale.y * 0.5;
	    }
	    else if (this.velocity.y < 0)
	    {
	        this.transform.position.y = other.transform.position.y + other.transform.localScale.y * 0.5 + this.transform.localScale.y * 0.5;
	    }
	            
	    canMove = false;
	   	isSelected = false;
	   	
	   	var count:int = this.transform.GetChildCount();
	   	for (var i:int = 0; i < count; i++)
	   	{
	   		this.transform.GetChild(0).parent = null;
	   	}
	   	
	   	Destroy(this);
	}
}
