#pragma strict
//intro variables for gui for scroll and blink
var intro: Transform;
var title: Transform;
var titleSpeed: int = .2;
function Start () {
title.position.y = -.7;
}

function Update () {
if(title.position.y <= .848){
title.transform.Translate(Vector3.up * titleSpeed * Time.deltaTime);
}
else{
titleSpeed = 0; 
title.position.y = .848;
}
}