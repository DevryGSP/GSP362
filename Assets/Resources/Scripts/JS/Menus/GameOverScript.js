import UnityEngine.UI;

var levelNames:String[];
var playerName:String;
var hasEnteredName:boolean;
var hasHighScore:boolean;
var finalScore:float;
var nameEnter: GameObject;
var nameEntered:Text;
var gameData: GameData;
var accomplishedLevel:Text;
var totalScore:Text;
var scoreExplained:Text;
var gameMessage:Text;

function Start ()
{
	playerName = "PLAYER";
	gameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	hasEnteredName = false;
	hasHighScore = false;
	
	if(gameData.ringsTotal == 0)
		finalScore = gameData.score;
	else
		finalScore = gameData.ringsTotal * gameData.score;
	
	for(var i = 0; i < 10; i++)
	{
		if(finalScore > gameData.GetHighScores()[i].score)
		{
			gameMessage.text = "You have made the top 10. Enter your name.";
			hasHighScore = true;
			nameEnter.SetActive(true);
			
		}
		else
		{
			gameMessage.text = "You failed to make the top 10!";
			nameEnter.SetActive(false);
		}
	}	
	accomplishedLevel.text = "You made it to level: " + levelNames[gameData.level];
	totalScore.text = "Your total score was: " + finalScore;
	scoreExplained.text = " Total Rings: " + gameData.ringsTotal + " x Gamescore: " + gameData.score + " = " + finalScore;
	
	
}
function OnReset()
{
	Application.LoadLevel(1);
}

function OnSubmit()
{
	gameData.score = finalScore;
	gameData.SavePlayerScore(nameEntered.text);
	nameEnter.SetActive(false);
}
function OnNameEnter()
{
	TouchScreenKeyboard.Open("", TouchScreenKeyboardType.Default, false,false,true);
}
function OnLeaderboards()
{
	Application.LoadLevel(6);
}

function OnMain()
{
	Application.LoadLevel(0);
}
function Update ()
{
	
		
	
	
}
