function Button (x,y,w,h,text,callback) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.text = text;
	this.callback = callback;
}

Button.prototype.draw = function() {

	// console.log("x: "+this.x+" y: "+this.y+" w: "+this.w+" h: "+this.h+" text: "+this.text);

	context.strokeStyle = "#0000FF";
	context.strokeRect(this.x,this.y,this.w,this.h);
	context.strokeText(this.text,this.x,this.y);	
};

Button.prototype.isClicked = function(x,y) {
	// console.log("event x: "+x);
	// console.log(" my x: "+this.x)
	return x < this.x + this.w && x > this.x && y > this.y && y < this.y + this.h;
};

Button.prototype.action = function() {
	this.callback();
};