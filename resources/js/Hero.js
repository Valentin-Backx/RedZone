function Hero (x,y,image) {

	this.controls = {right:false,left:false};

	this.speed = 11;

	this.x = x;
	this.y = y;
	this.w = 32 * ratio;
	this.h = ratio * 32;
	this.image = image;
	this.box = new Box(x,y,32 * ratio,32 * ratio);
	this.touchGround = false;
	this.currentJumpFrameCounter = 0;
	this.previousJumpHeight = 0;
	this.downWardSpeed = 0;
	this.gravityAcceleration = 1;
	this.lastControl = 0;

	var that = this;
	window.onkeydown = function(event){
		switch (event.keyCode){
			case 38:
				that.jump();
				break; 
			case 37:
				that.controls.left = true;
				that.lastControl = -1;
			break;
			case 39:
				that.controls.right = true;
				that.lastControl = 1;
			break;
		}
	}
	window.onkeyup = function(event){
		switch (event.keyCode){
			case 37:
				that.controls.left = false;
				if(that.lastControl < 0) {
					that.lastControl = 0;
				}
			break;
			case 39:
				that.controls.right = false;
				if(that.lastControl > 0){
					that.lastControl = 0;	
				} 
			break;
		}
	}
}

Hero.prototype.update = function() {
	this.gravity();
	this.control();
};

Hero.prototype.move = function(xDir) {
	var xMove = xDir * this.speed;
	this.box.x += xMove;
	for (var i = wallTiles.length - 1; i >= 0; i--) {
		if(isColliding(wallTiles[i].box,this.box))
		{
			this.box.x = this.box.x < wallTiles[i].box.x?this.box.x-this.box.w:wallTiles[i].box.x+wallTiles[i].box.w;
			// console.log("outter limit: "+(wallTiles[i].box.x +wallTiles[i].box.w)+ " my x: "+this.box.x  );
			this.x = this.box.x;
			return false;
		}
	};
	// this.x += xMove;
	this.x = this.box.x;
	return true;
};

Hero.prototype.control = function() {

	// console.log("in control: "+this.lastControl)

	this.move(this.lastControl)

	if(this.jumping)
	{
		this.adjustJumpPos();
	}
};

Hero.prototype.adjustJumpPos = function() {
	this.currentJumpFrameCounter++;

	// console.log("nan? "+Math.sin(this.currentJumpFrameCounter/FRAME_JUMP_DELAY) * JUMP_AMPLITUDE);

	var newJumpHeight = Math.sin(this.currentJumpFrameCounter/FRAME_JUMP_DELAY) * JUMP_AMPLITUDE;

	this.y -= newJumpHeight - this.previousJumpHeight;
	this.box.y = this.y;

	// console.log("jump height: "+(newJumpHeight - this.previousJumpHeight));

	this.previousJumpHeight = newJumpHeight;


	if(this.currentJumpFrameCounter / FRAME_JUMP_DELAY >= Math.PI / 2)
	{
		this.jumping = false;
		// this.touchGround = true;
		this.currentJumpFrameCounter = 0;
		this.previousJumpHeight = 0;
	}
};

Hero.prototype.jump = function() {
	if(this.touchGround)
	{
		this.touchGround = false;
		this.jumping = true;
	}
};

Hero.prototype.gravity = function() {
	if(this.jumping) return;
	this.downWardSpeed += this.gravityAcceleration;
	this.box.y+= this.downWardSpeed;
	for (var i = 0; i < groundTiles.length; i++) {
		
		if(isColliding(groundTiles[i].box,this.box))
		{
			this.touchGround = true;
			this.box.y -=this.downWardSpeed;
			this.downWardSpeed = 0;
			return; //on veut pas diminuer le y deux fois.
		}
	};
	this.y+=this.downWardSpeed;
};

Hero.prototype.draw = function() {
	context.strokeStyle = "#FFFFFF";
	context.strokeRect(this.x,this.y,this.w,this.h);
};