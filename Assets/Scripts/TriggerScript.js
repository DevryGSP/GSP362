#pragma strict

var pieces : GameObject[];
var delay : Number = 5.0;
var speed : Number = 2.0;
var velocity : Vector2;


var targetNumber : float;
//@HideInInspector
var timer : Number;

//@HideInInspector
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
		StartCreation();
    }
    
}

function StartCreation(){
PickTargetLocation();

}

function PickTargetLocation(){
	
	targetNumber = Random.Range(1,5);
	if (targetNumber == 5){
	targetNumber = 4;
	}
	if (targetNumber == 1){
		this.transform.position.x = 0;
		this.transform.position.y = 25;
		velocity = new Vector2(0,-1);
		CreatePiece();
		GetRotation();
	}
	if (targetNumber == 2){
		this.transform.position.x = 32;
		this.transform.position.y = 0;		
		velocity = new Vector2(-1,0);
		CreatePiece();
		GetRotation();
	}
	if (targetNumber == 3){
		this.transform.position.x = 0;
		this.transform.position.y =-25;
		velocity = new Vector2(0,1);
		CreatePiece();
		GetRotation();
	}
	if (targetNumber == 4){
		this.transform.position.x = -32;
		this.transform.position.y = 0;
		velocity = new Vector2(1,0);
		CreatePiece();
		GetRotation();
	}
}

function CreatePiece(){
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
    	
    	


}

function GetRotation(){
var getRotation = Random.Range(1,5);
var target: GameObject;
target = GameObject.FindWithTag("piece");

if ( getRotation == 1){
//target.transform.localRotation.x = 0;
}

if ( getRotation == 2){
//target.transform.localRotation.x = 90;
}

if ( getRotation == 3){
//target.transform.localRotation.x = 180;
}

if ( getRotation == 1){
//target.transform.localRotation.x = 270;
}

}