#pragma strict

var triggerPrefab:GameObject;
var lineCount:int;

function Start ()
{
	// names of sides
	var subNames:String[] = ["Top", "Right", "Bottom", "Left"];
	// directions to place triggers
	var directions:Vector2[] = [Vector2(0, 1), Vector2(1,0), Vector2(0,-1), Vector2(-1,0)];
	
	for (var i:int = 0; i < subNames.length; i++)
	{
		// create "side" to place triggers in
		var parent:GameObject = new GameObject();
		parent.name = subNames[i];
		parent.transform.parent = this.transform;
		
		// create triggers
		for (var j:int = 0; j < lineCount; j++)
		{
			var dX:float = (this.transform.localScale.x * 0.5 + j + 0.5) * directions[i].x;
			var dY:float = (this.transform.localScale.y * 0.5 + j + 0.5) * directions[i].y;
		
			var pos:Vector3 = new Vector3(this.transform.position.x + dX, this.transform.position.y + dY, 0);
			
			var trigger:GameObject = Instantiate(triggerPrefab, pos, Quaternion.Euler(0, 0, (directions[i].x != 0) ? 90 : 0));
			trigger.transform.parent = parent.transform;
			(trigger.GetComponent("LineTrigger") as LineTrigger).position = j;
			(trigger.GetComponent("LineTrigger") as LineTrigger).toCenter = directions[i];
		}
	}
}

function Update ()
{
	
}

public function OnLineClear(trigger:LineTrigger, side:String):void
{
	// find the correct side
	var boardSide:GameObject = this.transform.Find(side).gameObject;
	
	// loop through linetriggers and move their blocks down
	var count:int = boardSide.transform.GetChildCount();
   	for (var i:int = trigger.position + 1; i < count; i++)
   	{
   		(boardSide.transform.GetChild(i).GetComponent("LineTrigger") as LineTrigger).MoveBlocksTowardsCenter();
   	}
	
}