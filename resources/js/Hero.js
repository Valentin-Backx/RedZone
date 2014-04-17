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
	this.surchau= 0;
	this.updateCalls = [
		{
			"callback" : this.control,
			"context" : this
		}
	];

	this.life = 200;


	this.attackRange = 50 * ratio;
	this.orientation = 1;

	this.meleeWeaponHeight = 1 * ratio;
	this.meleeWeaponWidth = 10 * ratio;
	this.meleeForce = 10;
	this.state = new State(
		{
			"IDLE" : 
			{
				"act" : this.idleAnimate,
				"onEnter" : [],
				"onExit" : []
			}
			// "MOVING" : 
			// {
			// 	"act" : {},
			// 	"onEnter" : [],
			// 	"onExit" : []
			// },
			// "PREPARE_CHARGE" : 
			// {
			// 	"act" : {},
			// 	"onEnter" : [],
			// 	"onExit" : []
			// },
			// "CHARGE" : 
			// {
			// 	"act" : {},
			// 	"onEnter" : [],
			// 	"onExit" : []
			// }
		}
		,this
	);

	var that = this;
	
	if(this.extendedConstructor)
	{
		this.extendedConstructor();
	}		

}

AddGravityBehavior(Hero);
AddCollisionSidesCapabilities(Hero);
AddSideMoveCapabilities(Hero);
AddAttackAbility(Hero);
AddUpdateAbility(Hero);
AddAnimateAbilities(Hero);


Hero.prototype.control = function() {
	window.onkeydown = function(event){
		if ( mofe== false)
	{
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
			case 17:				
				that.fire();
				break;
		}
	}
}
	window.onkeyup = function(event){
		if ( mofe== false)
	{
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
	};var that = this;
	this.direction = this.lastControl;
	
	this.lookToward = this.direction!=0?this.direction:this.lookToward;
	// console.log("in control: "+this.lastControl)
	if(this.jumping)
	{
		this.adjustJumpPos();
	}
	if (this.surchau>=100){this.surchauffe();this.surchau =100}
	else {mofe = false}
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
	this.box.debugDraw();
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

Hero.prototype.attackAnimate = function() {
	this.timeSinceAnimStarted %= this.totalIdleAnim;
	this.currentFrame = this.frames[(this.timeSinceAnimStarted / (this.totalIdleAnim / this.numberOfFrameIdle)) | 0];		
};

Hero.prototype.moveAnimate = function() {
	this.timeSinceAnimStarted %= this.totalIdleAnim;
	this.currentFrame = this.frames[(this.timeSinceAnimStarted / (this.totalIdleAnim / this.numberOfFrameIdle)) | 0];		
};

Hero.prototype.idleAnimate = function() {
	// console.log("tata");
};
Hero.prototype.fire = function() {
	balles.push(new balle(this.x+this.w/2,this.y,this.lookToward))
}
Hero.prototype.surchauffe = function() {
	if (compt % 120 == 0) 
	{
		if (this.lookToward == 0) 
			{this.lookToward+= Math.floor(Math.random()*2)-1 - Math.floor(Math.random()*2)+1}
		else 
		{if (this.lookToward == -1){this.lookToward = 1;}
					else {this.lookToward = -1;}}
	};
	if(compt % 10 == 0)
	{this.jump();}
	if((Math.floor((Math.random()*10)+1)>5&& compt % 120 == 0)||(Math.floor((Math.random()*10)+1)>8&& compt % 20 == 0))
	{
		if(mofe == true){mofe = false;}
			else {mofe = true;}
	};
	if (mofe == true) 
	{this.inertia=this.speed * this.lookToward;}
}

function balle(x,y,direction){
	this.h = 5* ratio;
	this.w = 5* ratio;
	this.x = x;
	this.y = y;
	this.direction = direction;
	this.box = new Box(x,y,5 * ratio,5 * ratio);
}
balle.prototype.draw = function() {
	context.strokeStyle = "#000000";
	context.strokeRect(this.x,this.y,this.w,this.h);
}
balle.prototype.move = function() {
	this.box.x = this.x+=this.direction*20;
}