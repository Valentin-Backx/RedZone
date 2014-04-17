function Box (x,y,w,h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

Box.prototype.debugDraw = function() {
	context.strokeStyle ="#FFFFFF";
	context.strokeRect(this.x,this.y,this.w,this.h);
};