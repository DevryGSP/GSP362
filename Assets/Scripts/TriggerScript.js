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
var currentObject:GameObject;

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
		this.transform.position.x = 5;
		this.transform.position.y = 25;
		velocity = new Vector2(0,-1);
		CreatePiece();
		GetRotation();
	}
	if (targetNumber == 2){
		this.transform.position.x = 25;
		this.transform.position.y = 5;		
		velocity = new Vector2(-1,0);
		CreatePiece();
		GetRotation();
	}
	if (targetNumber == 3){
		this.transform.position.x = 5;
		this.transform.position.y =-25;
		velocity = new Vector2(0,1);
		CreatePiece();
		GetRotation();
	}
	if (targetNumber == 4){
		this.transform.position.x = -25;
		this.transform.position.y = 5;
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
    	currentPiece = piece;
    	currentObject = o;
    	
    	


}

function GetRotation(){
var getRotation = Random.Range(1,5);


if ( getRotation == 1){
currentObject.transform.rotation = Quaternion.Euler(0f,0f,0f);
}

if ( getRotation == 2){
currentObject.transform.rotation = Quaternion.Euler(0f,0f,90f);
}

if ( getRotation == 3){
currentObject.transform.rotation = Quaternion.Euler(0f,0f,180f);
}

if ( getRotation == 4){
	currentObject.transform.rotation = Quaternion.Euler(0f,0f,270f);
	}

}