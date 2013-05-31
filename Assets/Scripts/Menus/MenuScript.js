#pragma strict
/////////////////////////////////////
// menuScript created by patrick rasmussen 
// Script handles mouseclicks on triggers for menu system.
/////////////////////////////////////

// updates to see if raycast returns a hit and checks that hit name for advancement or exit.
function Update()
{
Debug.Log("This works");

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
        // starts game.
        if (hit.collider.name == "Start")
         {
         	Application.LoadLevel(1);
         }
         // loads controller guide
         if (hit.collider.name == "ControllerGuide")
         {
         	Application.LoadLevel(3);
         } 
         
         if (hit.collider.name == "HowToPlay")
         {
         	Application.LoadLevel(4);
         } 
         
         if (hit.collider.name == "Credits")
         {
         	Application.LoadLevel(3);
         } 
         
         // exits game 
         if (hit.collider.name == "Exit")
         {
         	Application.Quit();
         }   
        }
    }
}