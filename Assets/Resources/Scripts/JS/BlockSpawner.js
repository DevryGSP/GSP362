#pragma strict
var pieceMats:Material[]; // array of materials
var pieces:GameObject[]; // array of pieces to choose from
var speed:float = 25.0; // speed the block falls
var delay:float = 0.5; // delay before a new block is spawned

@HideInInspector
var currentPiece:Piece;

@HideInInspector
var timer:float;

@HideInInspector
var index:int;

@HideInInspector
var rotateClockwise:boolean;

function Start ()
{
	index = Random.Range(0, 3);
	rotateClockwise = (Random.value < 0.5) ? true : false;
	
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
	// ---- GET INDEX
	if (rotateClockwise)
	{
		index = (index < 3) ? index + 1: 0;
	}
	else
	{
		index = (index > 0) ? index - 1: 3;
	}
	
	// ---- POSITION
	var locations:Vector2[] = [Vector2(0, 32), Vector2(32, 0), Vector2(0, -32), Vector2(-32, 0)];
	var direction:Vector2[] = [Vector2(0, -1), Vector2(-1, 0), Vector2(0, 1), Vector2(1, 0)];
	// set spawner to location
	this.transform.position.x = locations[index].x;
	this.transform.position.y = locations[index].y;
	
	// ---- ROTATION
	var rotations:float[] = [0f, 90f, 180f, 270f];
	// give random rotation
	this.transform.rotation = Quaternion.Euler(0f, 0f, rotations[Random.Range(0, rotations.Length-1)]);
	
	// ---- SPAWN
	var gameData:GameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	// randomly choose a piece
 	var prefab:GameObject = pieces[Random.Range(0, pieces.Length)];
 	// spawn piece
	var o:GameObject = Instantiate(prefab, this.transform.position, this.transform.rotation);
	// init vars
	var piece:Piece = o.GetComponent("Piece") as Piece;
	piece.isSelected = true;
	piece.speed = speed;
	piece.velocity = direction[index];
	// assign material
	var matIndex:int = gameData.level + Random.Range(0,2);
	for (var i:int = 0; i < o.transform.childCount; i++)
	{
		o.transform.GetChild(i).renderer.material = pieceMats[matIndex];
	}
	
	// store references
	currentPiece = piece;
}