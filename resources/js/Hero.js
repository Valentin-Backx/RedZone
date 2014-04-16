function Hero (x,y,image) {

	this.controls = {right:false,left:false};

	this.speed = 25 * ratio;

	this.x = x * ratio;
	this.y = y * ratio;
	this.w = 128 * ratio; //remplacer 32 par la taille réelle du sprite hero
	this.h = 128 * ratio; //remplacer 32 par la taille réelle du sprite hero
	this.image = image;
	this.box = new Box(this.x,this.y,this.w,this.h);//remplacer 32 par la taille réelle de la hitbox du hero

	this.touchGround = false;
	this.currentJumpFrameCounter = 0;
	this.previousJumpHeight = 0;

	this.lastControl = 0;

	this.updateCalls = [this.control];

	this.life = 200;



	this.attackRange = 50 * ratio;
	this.orientation = 1;

	this.meleeWeaponHeight = 1 * ratio;
	this.meleeWeaponWidth = 10 * ratio;
	this.meleeForce = 10;


	var that = this;
	window.onkeydown = function(event){
		switch (event.keyCode){
			case 38:
				that.jump();
				break; 
			case 37:
				parasinc=1
				that.controls.left = true;
				that.lastControl = -1;
			break;
			case 39:
				parasinc=-1
				that.controls.right = true;
				that.lastControl = 1;
			break;
			case 32:
				that.meleeAttack();
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
	if(this.extendedConstructor)
	{
		this.extendedConstructor();
	}		

}

AddGravityBehavior(Hero);
AddCollisionSidesCapabilities(Hero);
AddSideMoveCapabilities(Hero);
AddAttackAbility(Hero);

Hero.prototype.update = function() {

	for (var i = this.updateCalls.length - 1; i >= 0; i--) {
		this.updateCalls[i].call(this);
	};
};


Hero.prototype.control = function() {
	this.direction = this.lastControl;
	
	this.lookToward = this.direction!=0?this.direction:this.lookToward;
	// console.log("in control: "+this.lastControl)
	if(this.jumping)
	{
		this.adjustJumpPos();
	}
};

Hero.prototype.adjustJumpPos = function() {
	this.currentJumpFrameCounter++;

	// console.log("nan? "+Math.sin(this.currentJumpFrameCounter/FRAME_JUMP_DELAY) * JUMP_AMPLITUDE);

	var newJumpHeight = Math.sin(this.currentJumpFrameCounter/FRAME_JUMP_DELAY) * JUMP_AMPLITUDE/* * ratio*/;

	this.box.y -= newJumpHeight - this.previousJumpHeight;

	for (var i = platFormTiles.length - 1; i >= 0; i--) {
		if(isColliding(platFormTiles[i].box,this.box))
		{
			if(platFormTiles[i].box.y + platFormTiles[i].box.h < this.y)
			{
				this.box.y += newJumpHeight - this.previousJumpHeight - (this.y - platFormTiles[i].box.y - platFormTiles[i].box.h);
				this.y = this.box.y;
				this.endJump();
				return;
			}
		}
	};

	this.y = this.box.y;

	// console.log("jump height: "+(newJumpHeight - this.previousJumpHeight));

	this.previousJumpHeight = newJumpHeight;


	if(this.currentJumpFrameCounter / FRAME_JUMP_DELAY >= Math.PI / 2)
	{
		this.endJump();
	}
};

Hero.prototype.endJump = function() {
	this.jumping = false;
	// this.touchGround = true;
	this.currentJumpFrameCounter = 0;
	this.previousJumpHeight = 0;	
};

Hero.prototype.jump = function() {
	if(this.touchGround)
	{
		this.touchGround = false;
		this.jumping = true;
	}
};

Hero.prototype.draw = function() {
	context.strokeStyle = "#FFFFFF";
	context.strokeRect(this.x,this.y,this.w,this.h);
};

Hero.prototype.damage = function(damage) {
	this.life -= damage;
	if(this.life<=0)
	{
		if(!gameOver)
		{
			death();	
		}
	}
};

Hero.prototype.getTargets = function() {
	return enemies;
};