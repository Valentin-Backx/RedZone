function Tile (x,y,image) {
	this.x = x
	this.y = y

	this.width = image.width * ratio;
	this.height = image.height * ratio;
}

Tile.prototype.draw = function() {
	context.drawImage
};