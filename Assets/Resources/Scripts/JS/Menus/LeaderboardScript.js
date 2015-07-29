import UnityEngine.UI;

var objectName:Text;
var objectScore:Text;
var canvas:Canvas;
function Start ()
{
	var gameData:GameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	var scores:HighScoreElement[] = gameData.GetHighScores();
	
	for(var i = 9; i > -1  ; i--)
	{
		var nextNamePos:Vector3 = Vector3(objectName.transform.position.x, objectName.transform.position.y - (i*50), objectName.transform.position.z);
		var nextScorePos:Vector3 = Vector3(objectScore.transform.position.x, objectScore.transform.position.y -(i *50), objectScore.transform.position.z);
		
		var nextName:Text = Instantiate(objectName, nextNamePos, Quaternion.identity);
		nextName.transform.SetParent(canvas.transform);
		nextName.text = scores[i].name;
		
		var nextScore:Text = Instantiate(objectScore, nextScorePos,Quaternion.identity);
		nextScore.transform.SetParent(canvas.transform);
			nextScore.text = scores[i].score.ToString();
	}
}

function Update ()
{
	
}
function OnMain()
{
	Application.LoadLevel(0);
}
