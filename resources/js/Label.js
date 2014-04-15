function Label (x,y,w,h,text) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.text = text;
}

Label.prototype.draw = function() {

	// console.log("x: "+this.x+" y: "+this.y+" w: "+this.w+" h: "+this.h+" text: "+this.text);

	context.strokeStyle = "#0000FF";
	context.strokeRect(this.x,this.y,this.w,this.h);
	context.strokeText(this.text,this.x,this.y);	
};

