#pragma strict

var pieces:GameObject[]; // array of pieces to choose from
var speed:float = 2.0; // speed the block falls
var delay:float = 0.5; // delay before a new block is spawned

@HideInInspector
var currentPiece:Piece;

@HideInInspector
var timer:float;

@HideInInspector
var index:int; // holds the last spawned position index

function Start ()
{
	index = 0;
	timer = delay;
	
    SpawnPiece();
}

function Update ()
{
    if (!currentPiece.isSelected)
    {
    	if (timer > 0.0)
    	{
    		timer -= Time.deltaTime;       
    	}
    	else
    	{
    		timer = delay;
			SpawnPiece();
		}
    }
}

function SpawnPiece()
{
	// ---- POSITION
	var locations:Vector2[] = [Vector2(0, 32), Vector2(32, 0), Vector2(0, -32), Vector2(-32, 0)];
	var direction:Vector2[] = [Vector2(0, -1), Vector2(-1, 0), Vector2(0, 1), Vector2(1, 0)];
	var indices:int[] = [0, 1, 2, 3];
	// remove last used index
	Array(indices).RemoveAt(index);
	// choose index
	index = Random.Range(0, locations.Length-1);
	// set spawner to location
	this.transform.position.x = locations[index].x;
	this.transform.position.y = locations[index].y;
	
	// ---- ROTATION
	var rotations:float[] = [0f, 90f, 180f, 270f];
	// give random rotation
	this.transform.rotation = Quaternion.Euler(0f, 0f, rotations[Random.Range(0, rotations.Length-1)]);
	
	// ---- SPAWN
	// randomly choose a piece
 	var prefab:GameObject = pieces[Random.Range(0, pieces.Length-1)];
 	// spawn piece
	var o:GameObject = Instantiate(prefab, this.transform.position, this.transform.rotation);
	var piece:Piece = o.GetComponent("Piece") as Piece;
	piece.isSelected = true;
	piece.speed = speed;
	piece.velocity = direction[index];
	
	// store references
	currentPiece = piece;
}