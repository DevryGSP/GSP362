#pragma strict
/////////////////////////////////////
// ControllerGuideScript created by patrick rasmussen 
// Script handles the back button for player to learn possible controls.
/////////////////////////////////////

// updates to see if raycast returns a hit and checks that hit name for advancement or exit.
function Update()
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
        // backs to the main menu.
        if (hit.collider.name == "back")
         {
         	Application.LoadLevel(2);
         }
      }
    }
}