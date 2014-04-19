function GameOverLabel () {

	this.image = new Image();
	this.image.src = "resources/images/gameover.png";

	this.x = ( canvasWidth - this.image.width * ratio ) /2 + conteurctx;
	this.y   =(canvasHeight - this.image.height * ratio) / 2;

	this.w = this.image.width * ratio;
	this.h = this.image.height * ratio;
}

GameOverLabel.prototype.draw = function() {


	context.drawImage(
		this.image,
		0, 
		0,
		this.image.width,
		this.image.height,
		( canvasWidth - this.image.width * ratio ) /2 + conteurctx,
		(canvasHeight - this.image.height * ratio) / 2,
		this.image.width * ratio,
		this.image.height * ratio
		);
};