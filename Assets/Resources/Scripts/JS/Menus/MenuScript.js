#pragma strict
/////////////////////////////////////
// menuScript created by patrick rasmussen 
// Main menu script handles the selections through the games menu system.
/////////////////////////////////////

public function OnStart()
{
	Application.LoadLevel(1);
}

public function OnExit()
{
	Application.Quit();
}

function OnLeaderboards()
{
	Application.LoadLevel(6);
}



// updates to see if raycast returns a hit and checks that hit name for advancement or exit.
function InUpdate()
{

}