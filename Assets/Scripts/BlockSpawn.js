#pragma strict

var block : GameObject;
var delay : Number = 2.0;
var speed : Number = 2.0;
var velocity : Vector2;

@HideInInspector
var timer : Number;

function Start ()
{
    timer = 0.0;
}

function Update ()
{
    if (timer > 0.0)
    {
        timer -= Time.deltaTime;
        
    }
    else
    {
        timer = delay;
        speed += 0.5; 
        
    	var o : GameObject = Instantiate(block, this.transform.position, this.transform.rotation);
    	var piece : Piece = o.GetComponent("Piece") as Piece;
    	piece.isSelected = true;
    	piece.speed = speed;
    	piece.velocity.x = this.velocity.x;  
    	piece.velocity.y = this.velocity.y;  
    }
    
}