function isColliding (firstBox,secondBox) {

	if ( firstBox.x <= secondBox.x + secondBox.w && firstBox.x + firstBox.w >= secondBox.x &&
			firstBox.y <= secondBox.y + secondBox.h && firstBox.y + firstBox.h >= secondBox.y )
	{
		return true;
	}
	else
		return false;
}

function isCollidingSide (firstBox,secondBox) {
	if ( firstBox.x <= secondBox.x + secondBox.w && firstBox.x + firstBox.w >= secondBox.x &&
			firstBox.y + 1 <= secondBox.y + secondBox.h && firstBox.y + firstBox.h - 1 >= secondBox.y )
	{
		return true;
	}
	else
		return false;
}

function isCollidingRight (firstBox,secondBox) {
	if (firstBox.x + firstBox.w >= secondBox.x && firstBox.x < secondBox.x&&
			firstBox.y + 1 <= secondBox.y + secondBox.h && firstBox.y + firstBox.h - 1 >= secondBox.y )
	{
		return true;
	}
	else
		return false;		
}

function isCollidingLeft (firstBox,secondBox) {
	if ( firstBox.x <= secondBox.x + secondBox.w && firstBox.x > secondBox.x &&
			firstBox.y + 1 <= secondBox.y + secondBox.h && firstBox.y + firstBox.h - 1 >= secondBox.y )
	{
		return true;
	}
	else
		return false;	
}

function isCollidingBottom (firstBox,secondBox) {
	if ( firstBox.x - 1 <= secondBox.x + secondBox.w && firstBox.x + 1 > secondBox.x &&
			firstBox.y < secondBox.y && firstBox.y + firstBox.h >= secondBox.y )
	{
		return true;
	}
	else
		return false;	
}

var debugCollision = [];