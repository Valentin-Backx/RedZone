function Tile (x,y,image,j) {
	this.x = x * ratio;
	this.y = y * ratio;
	this.w = BASE_TILE_SIZE * ratio;
	this.h = BASE_TILE_SIZE * ratio;

	// this.width = image.width * ratio;
	// this.height = image.height * ratio;

	this.box = new Box(this.x,this.y,this.w, this.h);
	if(j==5||j==6)
	{
		// console.log("this.x: "+this.x+" this.y: "+this.y+" this.w: "+this.w+" this.h: "+this.h);
		// console.log("image: "+this.image);
	}
	// console.log("image: "+image);
	this.image = image;
}

Tile.prototype.draw = function() {
	// context.drawImage
	if(!this.image){
		context.fillStyle = "#FF0000";
		context.fillRect(this.x,this.y,this.w,this.h);
		return;
	}
	context.drawImage(this.image,0,0,this.image.width,this.image.height,this.x,this.y,this.w,this.h);
	
};