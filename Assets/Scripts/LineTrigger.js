#pragma strict

var maxBlocks:int;
var blocks:ArrayList;
var position:int;
var toCenter:Vector2;
var count:int;

function Start()
{
	blocks = new ArrayList(maxBlocks);
}

function Update()
{
	count = blocks.Count;
	if (blocks.Count == maxBlocks)
	{
		ClearBlocks();
	}
}

function OnTriggerEnter(other:Collider):void
{
	
}

function OnTriggerStay(other:Collider):void
{
	if (other.transform.parent.name == "BlockContainer")
	{
		if (!blocks.Contains(other))
		{
			blocks.Add(other);
		}
	}
}

function OnTriggerExit(other:Collider):void
{
	if (blocks.Contains(other))
	{
		blocks.Remove(other);
	}
}

function ClearBlocks():void
{
	for(var o:Object in blocks)
	{
		if (o)
		{
			Destroy((o as Collider).gameObject);
		}
	}
	
	blocks.Clear();
	
	(this.transform.parent.transform.parent.GetComponent("Gameboard") as Gameboard).OnLineClear(this, this.transform.parent.name);
}

public function MoveBlocksTowardsCenter():void
{
	for(var o:Object in blocks)
	{
		if (o)
		{
			(o as Collider).transform.position.x -= toCenter.x;
			(o as Collider).transform.position.y -= toCenter.y;
		}
	}
}