#pragma strict

var triggerPrefab:GameObject;
var lineCount:int;

@HideInInspector
var sides : boolean[,];

function Start ()
{
	// names of sides
	var sideNames:String[] = ["Top", "Right", "Bottom", "Left"];
	// directions to place triggers
	var directions:Vector2[] = [Vector2(0, 1), Vector2(1,0), Vector2(0,-1), Vector2(-1,0)];
	//
	sides = new boolean[4,lineCount];
	
	for (var i:int = 0; i < sideNames.length; i++)
	{
		// create "side" to place triggers in
		var parent:GameObject = new GameObject();
		parent.name = sideNames[i];
		parent.transform.parent = this.transform;
		
		// create triggers
		for (var j:int = 0; j < lineCount; j++)
		{
			sides[i,j] = false;
		
			// move in direction
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

function getSideIndex(side:String):int
{
	switch(side)
	{
		case "Top": return 0; 
		case "Right": return 1;
		case "Bottom": return 2;
		case "Left": return 3;
	}
}

public function onLineFull(trigger:LineTrigger, side:String):void
{
	// get side trigger list and set to true
	sides[getSideIndex(side), trigger.position] = true;
	
	// check if same line in other sides is full
	for (var i:int = 0; i < 4; i++)
	{
		if (sides[i, trigger.position] == false)
		{
			// a line wasn't full, quit function here
			return;
		}
	}
	
	// clear ring
	(this.transform.Find("Top").GetChild(trigger.position).GetComponent("LineTrigger") as LineTrigger).ClearBlocks();
	(this.transform.Find("Left").GetChild(trigger.position).GetComponent("LineTrigger") as LineTrigger).ClearBlocks();
	(this.transform.Find("Right").GetChild(trigger.position).GetComponent("LineTrigger") as LineTrigger).ClearBlocks();
	(this.transform.Find("Bottom").GetChild(trigger.position).GetComponent("LineTrigger") as LineTrigger).ClearBlocks();
}

public function OnLineClear(trigger:LineTrigger, side:String):void
{
	// get side trigger list and set to true
	sides[getSideIndex(side), trigger.position] = false;
	
	// find the correct side
	var boardSide:GameObject = this.transform.Find(side).gameObject;
	
	// loop through linetriggers and move their blocks down
	var count:int = boardSide.transform.GetChildCount();
   	for (var i:int = trigger.position + 1; i < count; i++)
   	{
   		(boardSide.transform.GetChild(i).GetComponent("LineTrigger") as LineTrigger).MoveBlocksTowardsCenter();
   	}
	
}