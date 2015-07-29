var originalCursor : Texture2D;
 
 
var cursorSizeX: int = 64;  
var cursorSizeY: int = 64;  
 
static var showOriginal : boolean = true;
 
function Start(){
Screen.showCursor = false;
//Screen.lockCursor = true;
}
 
 
function OnGUI(){
 
    if(showOriginal == true){
        GUI.DrawTexture (Rect(Input.mousePosition.x-cursorSizeX/2 , (Screen.height-Input.mousePosition.y)-cursorSizeY/2, cursorSizeX, cursorSizeY),originalCursor);
        }
        }