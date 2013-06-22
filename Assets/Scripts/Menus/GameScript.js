var isPaused : boolean;
var restartBox: Transform;
var resumeBox: Transform;
var restartScreen:Vector3;
var resumeScreen:Vector3;
var defaultscreen:Vector3;
var pauseSkin : GUISkin;


function Start ()
{
	var sm:SoundManager = GameObject.Find("SoundManager").GetComponent(SoundManager) as SoundManager;
	var audio:AudioSource = sm.PlaySound(sm.themeSong, 0.25f);
    restartScreen = Vector3(.7,3.3,-40);
	resumeScreen = Vector3(0,-1.2,-40);
	defaultPosition = Vector3.zero;
	audio.loop = true;
	isPaused = false;
	restartBox.position = defaultscreen;
	resumeBox.position = defaultscreen;
}

function Update ()
{
	if(Input.GetKeyDown(KeyCode.Escape)){
		isPaused = true;
		Time.timeScale = 0;
		}
		

    if(isPaused)
    {
    	restartBox.position = restartScreen;
		resumeBox.position = resumeScreen;
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
        		// restarts game.
        	if (hit.collider.name == "restartBox")
         		{
         		Time.timeScale = 1;
         		Application.LoadLevel(1);
       			}
       			// exits game 
         		if (hit.collider.name == "resumeBox")
        		{
        	 	isPaused = false;
    	     	Time.timeScale = 1;
    	     	}
        	 }  
		}
	}
	if(!isPaused){
	restartBox.position = defaultscreen;
	resumeBox.position = defaultscreen;
	}
}


function OnGUI(){
	if(isPaused){
		GUI.skin = pauseSkin;
		
		GUI.Label(Rect(	440, 240, 800, 40), "Restart");
		GUI.Label(Rect(	443, 280, 800, 40), "Resume");
	}
}