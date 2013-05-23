#pragma strict

var pieces : GameObject[];
var delay : Number = 2.0;
var speed : Number = 2.0;
var velocity : Vector2;

@HideInInspector
var timer : Number;

@HideInInspector
var currentPiece:Piece;

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
        //speed += 0.5; 
     	
     	// disable player control of previous piece
     	if (currentPiece)
     	{
     		currentPiece.isSelected = false;
     	}
     	
     	// randomly choose a piece
     	var prefab:GameObject = pieces[Random.Range(0, pieces.Length)];
     	
     	// spawn piece
    	var o:GameObject = Instantiate(prefab, this.transform.position, this.transform.rotation);
    	var piece:Piece = o.GetComponent("Piece") as Piece;
    	piece.isSelected = true;
    	piece.speed = speed;
    	piece.velocity.x = this.velocity.x;  
    	piece.velocity.y = this.velocity.y;
    	
    	// hold reference to piece
    	currentPiece = piece;
    }
    
}