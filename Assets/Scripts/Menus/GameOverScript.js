var guiskin:GUISkin;
var levelNames:String[];
var playerName:String;
var hasEnteredName:boolean;
var hasHighScore:boolean;

function Start ()
{
	playerName = "PLAYER";
	hasEnteredName = false;
	hasHighScore = false;
}

function Update ()
{
	//check if the left mouse has been pressed down this frame
    if (Input.GetMouseButtonDown(0))
    {
        //empty RaycastHit object which raycast puts the hit details into
        var hit : RaycastHit;
        //ray shooting out of the camera from where the mouse is
        var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
 
 		// checks the hit if so tells us the name in debug and then checks what to do with that name.
        if (Physics.Raycast(ray, hit))
        {
	        Debug.Log(hit.collider.name);
	        // back to menu.
        	if (hit.collider.name == "RestartCube")
        	{
         		Application.LoadLevel(2);
        	}
        	if (hit.collider.name == "LeaderboardCube")
        	{
         		Application.LoadLevel(8);
        	}
        	if (hit.collider.name == "ExitCube")
        	{
         		Application.Quit();
        	}
      	}
	}
	
	
}


function OnGUI()
{
	GUI.skin = guiskin;
	var gameData:GameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	var finalScore = gameData.ringsTotal * gameData.score;

	GUI.Label(Rect(	315, 200, 450, 40), "You made it to level: " + gameData.level);
	GUI.Label(Rect(	320, 240, 800, 40), "Your total score was ");
	GUI.Label(Rect(	255, 280, 800, 40), "Total Rings : " + gameData.ringsTotal.ToString() + " x Gamescore: " + gameData.score + " = " + finalScore); 
	
	if (Event.current.keyCode == KeyCode.Return && !hasEnteredName)
	{
		hasEnteredName = true;
		hasHighScore = gameData.SavePlayerScore(playerName);
	}
	
	if (!hasEnteredName)
	{
		GUI.Label(Rect (375, 360, 200, 30), "Enter Name:");
 		playerName = GUI.TextField (Rect (350, 400, 200, 25), playerName, 40);
	}
	else
	{
		if (hasHighScore)
		{
			GUI.Label(Rect( 180, 360, 600, 40), "Your score has made it to the leaderboard!!!"); 
			GUI.Label(Rect( 207, 400, 600, 40), "Click the leaderboards to enter the fame. ");
		}
		else
		{
			GUI.Label(Rect( 180, 360, 600, 40), "Sorry, you didn't make it on the leaderboards."); 
		}
	}
}