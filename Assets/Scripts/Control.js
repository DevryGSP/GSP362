#pragma strict

var velocity : Vector2;

@HideInInspector
var speed : int;

@HideInInspector
var canMove : boolean;

function Start ()
{
	canMove = true;
	speed = 5;
	velocity.x *= speed;
	velocity.y *= speed;
}

function Update ()
{
	if (canMove)
	{
		this.transform.position.x += Time.deltaTime * velocity.x;	
		this.transform.position.y += Time.deltaTime * velocity.y;	
		
		if (Input.GetKeyDown(KeyCode.UpArrow))
		{
			if (this.velocity.x != 0)
			{
				this.transform.position.y += 1;
			}
		}
		else if (Input.GetKeyDown(KeyCode.DownArrow))
		{
			if (this.velocity.x != 0)
			{
				this.transform.position.y -= 1;
			}
		}
		else if (Input.GetKeyDown(KeyCode.LeftArrow))
		{
			if (this.velocity.y != 0)
			{
				this.transform.position.x -= 1;
			}
		}
		else if (Input.GetKeyDown(KeyCode.RightArrow))
		{
			if (this.velocity.y != 0)
			{
				this.transform.position.x += 1;
			}
		}
	}
}

function OnTriggerEnter (other : Collider)
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
}