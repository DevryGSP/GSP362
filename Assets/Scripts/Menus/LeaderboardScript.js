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
        
        	if (hit.collider.name == "ExitCube"){
         		Application.Quit();
        		}
      		}
		}
	}

function OnGUI()
{
	GUI.skin = guiskin;
	var gameData:GameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;

	
	GUI.Label(Rect(	315, 200, 450, 40), "You made it to level: " + gameData.level);
	 


	//}


}