var isPaused : boolean;
var pauseMenu : GameObject;


function Start ()
{
	var sm:SoundManager = GameObject.Find("SoundManager").GetComponent(SoundManager) as SoundManager;
	var audio:AudioSource = sm.PlaySound(sm.themeSong, 0.25f);
	audio.loop = true;
	isPaused = false;	
}

function Update ()
{
	if(Input.GetKeyDown(KeyCode.Escape))
	{
		isPaused = true;
		Time.timeScale = 0;
		pauseMenu.SetActive(true);
	}
}

function OnResume()
{
	isPaused = false;
	Time.timeScale = 1;
	pauseMenu.SetActive(false);
}

function OnRestart()
{
	pauseMenu.SetActive(false);
	Time.timeScale = 1;
    var gameData:GameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	gameData.score = 0;
	gameData.ringsTotal = 0;
	gameData.level = 0;
	gameData.ringsRemaining = 10;
	Application.LoadLevel(1);
}

function OnMain()
{
	pauseMenu.SetActive(false);
	var gameData1:GameData = GameObject.Find("GameData").GetComponent(GameData) as GameData;
	Time.timeScale = 1;
	gameData1.score = 0;
	gameData1.ringsTotal = 0;
	gameData1.level = 0;
	gameData1.ringsRemaining = 10;
	Application.LoadLevel(0);
}
