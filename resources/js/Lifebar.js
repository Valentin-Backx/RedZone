function lifebar(game)
{
	var lifex = 18;
	var lifey = 10;
	var lifeI = new Image();
	var lifeI.src = resources/images/lifebar.png;
}
lifebar.prototype = Object.create(Sprite.prototype);
lifebar.prototype.constructor = lifebare;
lifebar.prototype.draw = function(context,game)
{
	context.drawImage(this.image,0,0,this.frameWidth*((/*vie*/ / /*vie d'origine*/)),
	this.frameHeight,this.x,this.y,this.frameWidth*((/*vie*/ / /*vie d'origine*/)),this.frameHeight);
}