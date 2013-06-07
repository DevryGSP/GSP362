var guiskin:GUISkin;
var levelNames:String[];

function Start ()
{
	

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
        	if (hit.collider.name == "RestartCube"){
         		Application.LoadLevel(2);
        		}
        	if (hit.collider.name == "LeaderboardCube"){
         		Application.LoadLevel(8);
        		}
        	if (hit.collider.name == "ExitCube"){
         		Application.Quit();
        		}
      		}
		}
	}
var stringToEdit:String = " ";
function OnGUI()
{
	GUI.skin = guiskin;
	var gameData:GameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	var finalScore = gameData.ringsTotal * gameData.score;

	GUI.Label(Rect(	315, 200, 450, 40), "You made it to level: " + gameData.level);
	GUI.Label(Rect(	320, 240, 800, 40), "Your total score was ");
	GUI.Label(Rect(	255, 280, 800, 40), "Total Rings : " + gameData.ringsTotal.ToString() + " x Gamescore: " + gameData.score + " = " + finalScore); 
	
	GUI.Label (Rect (10, 10, 100, 30), "Enter Name:");
 	stringToEdit = GUI.TextField (Rect (90, 10, 200, 25), stringToEdit, 40);
	
	if (gameData.SavePlayerScore("New_Player")){
	
	GUI.Label(Rect( 180, 360, 600, 40), "Your score has made it to the leaderboard!!!"); 
	GUI.Label(Rect( 207, 400, 600, 40), "Click the leaderboards to enter the fame. ");
	}
}