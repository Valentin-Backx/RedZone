function Tile (x,y,image,box) {
	this.x = x * ratio;
	this.y = y * ratio;
	this.w = BASE_TILE_SIZE * ratio;
	this.h = BASE_TILE_SIZE * ratio;

	// this.width = image.width * ratio;
	// this.height = image.height * ratio;

	if(box)
	{
		this.box = box;//overriding default generated box
	
	}else
	{
		this.box = new Box(this.x,this.y,this.w, this.h);	
	}
	
	// console.log(this.box)

	this.image = image;
}

Tile.prototype.draw = function() {
	if(!this.image){
		context.fillStyle = "#FF0000";
		context.fillRect(this.x,this.y,this.w,this.h);
		return;
	}
	context.drawImage(this.image,0,0,this.image.width,this.image.height,this.x,this.y,this.w,this.h);
	
};