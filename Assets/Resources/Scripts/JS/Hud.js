#pragma strict
import UnityEngine.UI;

var gameData: GameData;
var levelNames:String[];
var levelNameText:Text;

var highScoreText: Text;
var currentScoreText: Text;
var currentLines: Text;


var currentScore:float;
var lastScore:int;
function Awake ()
{
	gameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	highScoreText.text = gameData.GetHighScores()[0].score.ToString();
	lastScore = gameData.score;
}

function Update ()
{
	levelNameText.text = levelNames[gameData.level].ToString();
	
	if(lastScore != gameData.score)
	{
		
		StartCoroutine(UpdateScore());
		lastScore = gameData.score;
	}
	
	currentLines.text = gameData.ringsTotal.ToString() + "/" + gameData.ringsRemaining.ToString();
}

function UpdateScore()
{
	while(currentScore < gameData.score)
	{
		currentScore += 5 * Time.deltaTime;
		currentScoreText.text = currentScore.ToString("f0");
		yield;
	}
		currentScore = gameData.score;
	
	currentScoreText.text = currentScore.ToString();
}