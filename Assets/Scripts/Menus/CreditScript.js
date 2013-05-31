#pragma strict

//intro variables for gui for scroll and blink
///public
var title: Transform;
//private
private var titleSpeed: float = .10f;

function Awake(){

}


function Update () {	
	
	// handles the transform of the title
	if(title.position.y <= 1.52){
	title.transform.Translate(Vector3.up * titleSpeed * Time.deltaTime);
	}
	else{
		title.position.y = -.32f;
	}
	
	//check if the left mouse has been pressed down this frame
    if (Input.GetMouseButtonDown(0)){
        //empty RaycastHit object which raycast puts the hit details into
        var hit : RaycastHit;
        //ray shooting out of the camera from where the mouse is
        var ray : Ray = Camera.main.ScreenPointToRay(Input.mousePosition);
 
 		// checks the hit if so tells us the name in debug and then checks what to do with that name.
        if (Physics.Raycast(ray, hit)){
        
        Debug.Log(hit.collider.name);
        // starts game.
        if (hit.collider.name == "Back2"){
         	Application.LoadLevel(2);
         }
      }
   }
}