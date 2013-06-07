#pragma strict

var score:int;
var ringsTotal:int;
var level:int;
var ringsRemaining:int;
 
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
}

public function OnBlocksCleared(rings:int):void
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
		ringsRemaining = 10 + ringsRemaining;
		level++;
		(GameObject.Find("Planet").GetComponent(Planet) as Planet).OnLevelUp();
	}
}

public function OnFastDrop():void
{
	score += 10;	
}

function GetHighScores():HighScoreElement[]
{
	var elements:HighScoreElement[] = new HighScoreElement[10];
	
	for (var i:int = 0; i < 10; i++)
	{
		elements[i] = new HighScoreElement();
		elements[i].name = PlayerPrefs.GetString("name" + i.ToString(), "player");
		elements[i].score = PlayerPrefs.GetInt("score" + i.ToString(), i);
	}
	
	return elements;
}

function SetHighScores(scores:HighScoreElement[]):void
{
	print("----");
	for (var i:int = 0; i < 10; i++)
	{	
		PlayerPrefs.SetString("name" + i.ToString(), scores[i].name);
		PlayerPrefs.SetInt("score" + i.ToString(), scores[i].score);
	}
}

public function SavePlayerScore(playerName:String):boolean
{
	var scores:HighScoreElement[] = GetHighScores();
	var varReturn: boolean  = false;
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
				varReturn = true;
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
	return varReturn;
}