function isColliding (firstBox,secondBox) {
	if ( firstBox.x <= secondBox.x + secondBox.w && firstBox.x + firstBox.w >= secondBox.x &&
			firstBox.y <= secondBox.y + secondBox.h && firstBox.y + firstBox.h >= secondBox.y )
	{
		return true;
	}
	else
		return false;
}