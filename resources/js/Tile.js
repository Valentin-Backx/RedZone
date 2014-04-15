function Tile (x,y,image) {
	this.x = x
	this.y = y
	this.w = 32 * ratio;
	this.h = 32 * ratio

	// this.width = image.width * ratio;
	// this.height = image.height * ratio;

	this.box = new Box(x,y,this.w, this.h);
}

Tile.prototype.draw = function() {
	// context.drawImage
	context.fillStyle = "#FF0000";
	context.fillRect(this.x,this.y,this.w,this.h);
};