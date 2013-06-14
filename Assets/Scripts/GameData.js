#pragma strict

var score:int;
var ringsTotal:int;
var level:int;
var ringsRemaining:int;
var isLevelChanging : boolean;
var camTurn : float = 0;
var camRotSpeed : float = 400;
 
class HighScoreElement
{
	public var score:int;
	public var name:String;
}

function Awake ()
{
	DontDestroyOnLoad(transform.gameObject);
}

function Start ()
{
	score = 0;
	ringsTotal = 0;
	level = 0;
	ringsRemaining = 10;
}

function Update ()
{
	if (Input.GetKeyDown(KeyCode.Delete))
	{
		PlayerPrefs.DeleteAll();
		print("Scores deleted!");
	}
	
	rotateCamera ();
}

public function OnBlocksCleared(rings:int):void
{
	if (Application.loadedLevel.ToString() == "Game")
	{
		score += (rings * 10) * (rings * 10);
		ringsTotal += rings;
		
		// award 'tetris' bonus
		if (rings == 5)
		{
			score += 500;	
		}
		
		ringsRemaining -= rings;
		if (ringsRemaining - rings <= 0)
		{
			isLevelChanging = true;	
			ringsRemaining = 10 + ringsRemaining;
			level++;
			(GameObject.Find("Planet").GetComponent(Planet) as Planet).OnLevelUp();
		}
	}
}

public function OnFastDrop():void
{
	
	score += 10;
}

public function rotateCamera ()
{
	if (isLevelChanging)
	{
		Camera.mainCamera.transform.Rotate (0, camRotSpeed * Time.deltaTime, 0);
		camTurn += camRotSpeed * Time.deltaTime;
		if (camTurn >= 360)
		{
			isLevelChanging = false;
			camTurn = 0;
			Camera.mainCamera.transform.rotation = Quaternion.Euler (0f, 0f, 0f);
		}
	}
}

function GetHighScores():HighScoreElement[]
{
	var elements:HighScoreElement[] = new HighScoreElement[10];
	
	for (var i:int = 0; i < 10; i++)
	{
		elements[i] = new HighScoreElement();
		elements[i].name = PlayerPrefs.GetString("name" + i.ToString(), "player");
		elements[i].score = PlayerPrefs.GetInt("score" + i.ToString(), 10 - i);
	}
	
	return elements;
}

function SetHighScores(scores:HighScoreElement[]):void
{
	for (var i:int = 0; i < 10; i++)
	{	
		PlayerPrefs.SetString("name" + i.ToString(), scores[i].name);
		PlayerPrefs.SetInt("score" + i.ToString(), scores[i].score);
	}
}

public function SavePlayerScore(playerName:String):boolean
{
	var scores:HighScoreElement[] = GetHighScores();
	var highscore:boolean = false;
	
	var last:HighScoreElement = null;
	for (var i:int = 0; i < 10; i++)
	{
		if (!last)
		{
			if (this.score >= scores[i].score)
			{
				last = new HighScoreElement();
				last.name = scores[i].name;
				last.score = scores[i].score;
				
				scores[i].name = playerName;
				scores[i].score = this.score;
				highscore = true;
			}	
		}
		else
		{
			var temp:HighScoreElement = new HighScoreElement();
			temp.name = last.name;
			temp.score = last.score;
			
			last.name = scores[i].name;
			last.score = scores[i].score;
			
			scores[i].name = temp.name;
			scores[i].score = temp.score;
		}
	}
	
	SetHighScores(scores);
	return highscore;
}