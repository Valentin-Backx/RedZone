function Box (x,y,w,h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

Box.prototype.debugDraw = function() {
	context.fillStyle ="#FFFFFF";
	context.fillRect(this.x,this.y,this.w,this.h);
};