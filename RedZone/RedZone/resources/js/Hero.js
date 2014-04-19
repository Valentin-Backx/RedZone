function Hero (x,y,image,frames,sautFrappeImage) {

	var that = this;
	if(!currentGamepad)
	{
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

			}
	}


	this.frames = frames;
	this.controls = {right:false,left:false};

	this.speed = 25 * ratio;

	this.x = x * ratio;
	this.y = y * ratio;
	this.w = 256 * ratio; //remplacer 32 par la taille réelle du sprite hero
	this.h = 256 * ratio; //remplacer 32 par la taille réelle du sprite hero
	this.image = image;
	this.currentImage = image;
	this.sautFrappeImage = sautFrappeImage;
	this.box = new Box(this.x,this.y,this.w / 2,this.h);//remplacer 32 par la taille réelle de la hitbox du hero

	// debugCollision.push(this.box);
	this.rageTimer = 80000;
	this.currentRageTimer = 0;
	this.previousFrameRageTimer;
	this.rageTimerOn = false;

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


	this.attackRange = 65 * ratio;
	this.orientation = 1;

	this.meleeWeaponHeight = -145 * ratio;
	this.meleeWeaponWidth = 15 * ratio;
	this.meleeForce = 10;
	this.state = new State(
		{
			"IDLE" : 
			{
				"act" : this.idleAnimate,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus],
				"onExit" : []
			},
			"IDLE_RAGE" : 
			{
				"act" : this.idleRageAnimate,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus],
				"onExit" : []
			},
			"IDLE_ATTACK" :
			{
				"act" : this.meleeAttackAnimate,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus,this.enterMeleeAttackState,this.lockShoot],
				"onExit" : [this.unLockShoot]
			},
			"IDLE_ATTACK_RAGE" :
			{
				"act" : this.idleAttackAnimateRage,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus,this.enterMeleeAttackState,this.lockShoot],
				"onExit" : [this.unLockShoot]
			},
			"IDLE_SHOOT" :
			{
				"act" : this.shootAnimate,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus,this.shootAnimateEnter,this.lockShoot],
				"onExit" : [this.unLockShoot]
			},
			"IDLE_SHOOT_RAGE" :
			{
				"act" : this.idleShootAnimateRage,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus,this.shootAnimateEnter,this.lockShoot],
				"onExit" : [this.unLockShoot]
			},
			"RUN" : 
			{
				"act" : this.runAnimate,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus],
				"onExit" : []
			},
			"RUN_RAGE" : 
			{
				"act" : this.runAnimateRage,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus],
				"onExit" : []
			},
			"RUN_ATTACK" : 
			{
				"act" : this.runMeleeAnimate,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus,this.enterMeleeAttackState,this.lockShoot],
				"onExit" : [this.unLockShoot]
			},
			"RUN_ATTACK_RAGE" : 
			{
				"act" : this.runAttackAnimateRage,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus,this.enterMeleeAttackState,this.lockShoot],
				"onExit" : [this.unLockShoot]
			},
			"RUN_SHOOT" : 
			{
				"act" : this.runShootAnimate,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus,this.shootAnimateEnter,this.lockShoot],
				"onExit" : [this.unLockShoot]
			},
			"RUN_SHOOT_RAGE" : 
			{
				"act" : this.runShootAnimateRage,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus,this.shootAnimateEnter,this.lockShoot],
				"onExit" : [this.unLockShoot]
			},
			"JUMP" :
			{
				"act" : this.jumpAnimate,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus],
				"onExit" : []
			},
			"JUMP_RAGE" :
			{
				"act" : this.jumpAnimateRage,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus],
				"onExit" : []
			},
			"JUMP_ATTACK" :
			{
				"act" : this.jumpMeleAnimate,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus,this.enterMeleeAttackState,this.lockShoot],
				"onExit" : [this.unLockShoot]
			},
			"JUMP_ATTACK_RAGE" :
			{
				"act" : this.jumpAttackAnimateRage,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus,this.enterMeleeAttackState,this.lockShoot],
				"onExit" : [this.unLockShoot]
			},
			"JUMP_SHOOT" :
			{
				"act" : this.jumpShootAnimate,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus,this.shootAnimateEnter,this.lockShoot],
				"onExit" : [this.unLockShoot]
			},
			"JUMP_SHOOT_RAGE" :
			{
				"act" : this.jumpShootAnimateRage,
				"onEnter" : [this.enterNewAnimation,this.checkRageStatus,this.shootAnimateEnter,this.lockShoot],
				"onExit" : [this.unLockShoot]
			},
			"DEATH" : 
			{
				"act" : this.deathAnimate,
				"onEnter" : [this.adjustDeathHeight],
				"onExit" : []				
			}
		}
		,this
	);

	/*========================ANIMATIONS DURATIONS AND NUMBER OF FRAMES================================*/
	this.totalIdleAnimTime = 500;
	this.nFramesIdleAnim = this.frames.repos.length;
	this.totalIdleAttackAnimTime = 300;
	this.nFramesIdleAttackAnim = this.frames.reposFrappe.length;
	this.totalIdleAttackAnimTime_rage = 100;
	this.nFramesIdleAttackAnim_rage = this.frames.reposFrappeRage.length;
	this.totalIdleShootAnimTime = 200;
	this.nFramesIdleShootAnim = this.frames.reposTir.length;
	this.totalIdleShootAnimTime_rage = 100;
	this.nFramesIdleShootAnim_rage = this.frames.reposTirRage.length;

	this.totalRunAnimTime = 400;
	this.nFramesRunAnim = this.frames.course.length;
	this.totalRunAnimTime_rage = 100;
	this.nFramesRunAnim_rage = this.frames.courseRage.length;
	this.totalRunattackAnimTime = 300;
	this.nFramesRunAttackAnim = this.frames.courseFrappe.length;
	this.totalRunattackAnimTime_rage = 100;
	this.nFramesRunAttackAnim_rage = this.frames.courseFrappeRage.length;
	this.totalRunShootAnimTime = 200;
	this.nFramesRunShootAnim = this.frames.courseTir.length;
	this.totalRunShootAnimTime_rage = 100;
	this.nFramesRunShootAnim_rage = this.frames.courseTirRage.length;

	this.totalJumpAnimTime = 250;
	this.nFramesJumpAnim = this.frames.saut.length;
	this.totalJumpAnimTime_rage = 250;
	this.nFramesJumpAnim_rage = this.frames.sautRage.length;

	this.totalJumpAttackAnimTime = 200;
	this.nFramesJumpAttackAnim = this.frames.sautFrappe.length;
	this.totalJumpAttackAnimTime_rage = 100;
	this.nFramesJumpAttackAnim_rage = this.frames.sautFrappeRage.length;


	this.totalJumpShootAnimTime = 200;
	this.nFramesJumpShootAnim = this.frames.sautTir.length;
	this.totalJumpShootAnimTime_rage = 100;
	this.nFramesJumpShootAnim_rage = this.frames.sautTirRage.length;

	this.totalHurtTime = 150;
	this.nFramesHurtAnim = this.frames.blessure.length;
	this.totalHurtTime_rage = 100;
	this.nFramesHurtAnim_rage = this.frames.blessureRage.length;
	/*================END ANIMATIONS DURATIONS AND FRAMES=================*/
	var that = this;
	
	if(this.extendedConstructor)
	{
		this.extendedConstructor();
	}		

}
AddDeathBehavior(Hero);
AddGravityBehavior(Hero);
AddCollisionSidesCapabilities(Hero);
AddSideMoveCapabilities(Hero);
AddUpdateAbility(Hero);
AddAnimateAbilities(Hero);
AddDrawAnility(Hero);

Hero.prototype.control = function() {

	if(currentGamepad)
	{
		this.lastControl = Math.abs(currentGamepad.axes[0])<0.2?0:currentGamepad.axes[0];
		if(currentGamepad.buttons[0]) this.jump();
		if(currentGamepad.buttons[2]) this.meleeAttack();
		if(currentGamepad.buttons[3]) this.fire();
	}

	this.direction = this.lastControl;
	
	this.lookToward = this.direction!=0?(this.direction<0?-1:1):this.lookToward;
	// console.log("in control: "+this.lastControl)
	if(this.jumping)
	{
		this.adjustJumpPos();
	}
	if (this.surchau>=400){this.surchauffe();this.surchau =400}
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
	// if(this.state.currentState=="JUMP")
	// {
		if(this.rageTimerOn)
		{
			this.state.gotoState("IDLE_RAGE");
		}else{
			this.state.gotoState("IDLE");
		}
};

Hero.prototype.jump = function() {
	if(this.dead) return;
	this.surchau+= this.rageTimerOn?0:4;
	if(this.touchGround)
	{
		this.touchGround = false;
		this.jumping = true;
		if(this.rageTimerOn)
		{
			this.state.gotoState("JUMP_RAGE");
		}else
		{
			this.state.gotoState("JUMP");	
		}
	}
};

Hero.prototype.damage = function(damage) {
	this.life -= damage;
	this.surchau+= this.rageTimerOn?0:damage;

	if(this.life<=0)
	{
		if(!gameOver)
		{
			this.speed = 0;
			this.death();
		}
	}
};

Hero.prototype.deathSpecific = function() {
	death();	
};

Hero.prototype.getTargets = function() {
	return enemies;
};

Hero.prototype.lockShoot = function() {
	this.atckCooldown = true;
};

Hero.prototype.unLockShoot = function() {
	this.atckCooldown = false;
};

Hero.prototype.fire = function() {
	if(this.atckCooldown) return;
	this.surchau+=this.rageTimerOn?0:4;
	switch(this.state.currentState)
	{
		case "IDLE":
			this.state.gotoState("IDLE_SHOOT");
			break;
		case "RUN":
			this.state.gotoState("RUN_SHOOT");
			break;
		case "JUMP":
			this.state.gotoState("JUMP_SHOOT");
			break;
	}
}

Hero.prototype.shootBullet = function() {
	balles.push(new balle(this.x+this.w/2,this.y+this.h/12,this.lookToward));
	this.surchau+=4
};

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
	if(compt % 15 == 0)
	{this.meleeAttack();
	}
	if(compt % 25)
	{
		this.fire();
	}
	if((Math.floor((Math.random()*10)+1)>5&& compt % 120 == 0)||(Math.floor((Math.random()*10)+1)>8&& compt % 20 == 0))
	{
		if(mofe == true){mofe = false;}
			else {mofe = true;}
	};
	if (mofe == true) 
	{this.inertia=this.speed * this.lookToward;}
}

Hero.prototype.meleeAttack = function() {
	if(this.atckCooldown) return;
	this.surchau+=this.rageTimerOn?0:10;
	switch(this.state.currentState)
	{
		case "IDLE":
			this.state.gotoState("IDLE_ATTACK");
			break;
		case "RUN":
			this.state.gotoState("RUN_ATTACK");
			break;
	}
	

};

Hero.prototype.calculateMeleeHit = function() {
	var hitBox = new Box(
			this.lookToward<0?this.x - this.attackRange:this.x+this.w/2,
			this.y - this.meleeWeaponHeight,
			this.attackRange,
			this.meleeWeaponWidth
		);


	var targets = this.getTargets();

	for (var i = targets.length - 1; i >= 0; i--) {

		if(isColliding(targets[i].box,hitBox))
		{
			targets[i].damage(this.meleeForce);
		}
	};	
};

Hero.prototype.enterMeleeAttackState = function() {
	this.enemyHit = false;
};

Hero.prototype.idleAnimate = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalIdleAnimTime;
	this.currentFrame = this.frames["repos"][(this.timeSinceAnimStarted / (this.totalIdleAnimTime / this.nFramesIdleAnim)) | 0];

	if(this.lastControl!=0)
	{
		this.state.gotoState("RUN");
	}	
};

Hero.prototype.meleeAttackAnimate = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalIdleAttackAnimTime;

	var indexFrame = (this.timeSinceAnimStarted / (this.totalIdleAttackAnimTime / this.nFramesIdleAttackAnim)) | 0;

	this.currentFrame = this.frames["reposFrappe"][indexFrame];		

	if(indexFrame == 3&&!this.enemyHit)
	{
		this.enemyHit = true;
		this.calculateMeleeHit();
	}

	if(indexFrame == this.nFramesIdleAttackAnim - 1)
	{
		this.state.gotoState("IDLE");
	}
};

Hero.prototype.shootAnimate = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalIdleShootAnimTime;

	var indexFrame = (this.timeSinceAnimStarted / (this.totalIdleShootAnimTime / this.nFramesIdleShootAnim)) | 0;

	this.currentFrame = this.frames["reposTir"][indexFrame];

	if(indexFrame == 2&&!this.bulletPushed){
		this.bulletPushed = true;
		this.shootBullet();
	}

	if(indexFrame == this.nFramesIdleShootAnim - 1)
	{
		this.state.gotoState("IDLE");
	}
};

Hero.prototype.shootAnimateEnter = function() {
	this.currentImage = this.image;
	this.bulletPushed = false;
};

Hero.prototype.runAnimate = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalRunAnimTime;
	this.currentFrame = this.frames["course"][(this.timeSinceAnimStarted / (this.totalRunAnimTime / this.nFramesRunAnim)) | 0];
	if(this.lastControl == 0)
	{
		this.state.gotoState("IDLE");
	}
};

Hero.prototype.runShootAnimate = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalRunShootAnimTime;
	
	var indexFrame = (this.timeSinceAnimStarted / (this.totalRunShootAnimTime / this.nFramesRunShootAnim)) | 0;

	this.currentFrame = this.frames["courseTir"][indexFrame];		
	
	if(indexFrame == 2&&!this.bulletPushed)
	{
		this.bulletPushed = true;
		this.shootBullet();
	}
	if(indexFrame==this.nFramesRunShootAnim - 1)
	{
		this.state.gotoState("RUN");
	}

};

Hero.prototype.runMeleeAnimate = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalRunattackAnimTime;

	var indexFrame = (this.timeSinceAnimStarted / (this.totalRunattackAnimTime / this.nFramesRunAttackAnim)) | 0;
	this.currentFrame = this.frames["courseFrappe"][indexFrame];
	
	if(indexFrame == 3&&!this.enemyHit)
	{
		this.enemyHit = true;
		this.calculateMeleeHit();
	}
	if(indexFrame == this.nFramesRunAttackAnim - 1)
	{
		this.state.gotoState("IDLE");
	}	
};

Hero.prototype.jumpAnimate = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalJumpAnimTime;
	
	// this.timeSinceAnimStarted = this.timeSinceAnimStarted>this.totalJumpAnimTime?this.totalJumpAnimTime:this.timeSinceAnimStarted;
	var indexFrame = (this.timeSinceAnimStarted / (this.totalJumpAnimTime / this.nFramesJumpAnim)) | 0;
	
	this.currentFrame = this.frames["saut"][indexFrame];

};

Hero.prototype.jumpMeleAnimate = function() {
	this.currentImage = this.sautFrappeImage;
	this.timeSinceAnimStarted %= this.totalJumpAttackAnimTime;

	var indexFrame = (this.timeSinceAnimStarted / (this.totalJumpAttackAnimTime / this.nFramesJumpAttackAnim)) | 0;

	this.currentFrame = this.frames["sautFrappe"][indexFrame];

	if(indexFrame == 3&&!this.enemyHit)
	{
		this.enemyHit = true;
		this.calculateMeleeHit();
	}
	if(indexFrame == this.nFramesJumpAttackAnim - 1)
	{
		this.state.gotoState("IDLE");
	}
};

Hero.prototype.jumpShootAnimate = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalJumpShootAnimTime;

	var indexFrame = (this.timeSinceAnimStarted / (this.totalJumpShootAnimTime / this.nFramesJumpShootAnim)) | 0;

	if(indexFrame == 0&&!this.bulletPushed)
	{
		this.bulletPushed = true;
		this.shootBullet();
	}
	if(indexFrame == this.nFramesJumpShootAnim - 1)
	{
		this.state.gotoState("IDLE");
	}	
	this.currentFrame = this.frames["sautTir"][indexFrame];
};

Hero.prototype.hurtAnimate = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalHurtTime;
	
	var indexFrame = (this.timeSinceAnimStarted / (this.totalHurtTime / this.nFramesHurtAnim)) | 0;

	this.currentFrame = this.frames["blessure"][indexFrame];	

	if(indexFrame == this.nFramesHurtAnim - 1)
	{
		this.state.gotoState("IDLE");
	}
};

Hero.prototype.idleRageAnimate = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalHurtTime_rage;

	var indexFrame = (this.timeSinceAnimStarted / (this.totalHurtTime_rage / this.nFramesHurtAnim_rage)) | 0;

	this.currentFrame = this.frames["blessureRage"][indexFrame];

	if(indexFrame == this.nFramesHurtAnim_rage)
	{
		this.state.gotoState("IDLE_RAGE");
	}
};

Hero.prototype.idleAttackAnimateRage = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalIdleAttackAnimTime_rage;

	var indexFrame = (this.timeSinceAnimStarted / (this.totalIdleAttackAnimTime_rage / this.nFramesIdleAttackAnim_rage)) | 0;

	this.currentFrame = this.frames["reposFrappeRage"][indexFrame];

	if(indexFrame == 3&&!this.enemyHit)
	{
		this.enemyHit = true;
		this.calculateMeleeHit();
	}
	if(indexFrame == this.nFramesIdleAttackAnim_rage - 1)
	{
		this.state.gotoState("IDLE_RAGE");
	}
};

Hero.prototype.idleShootAnimateRage = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalIdleShootAnimTime_rage;

	var indexFrame = (this.timeSinceAnimStarted / (this.totalIdleShootAnimTime_rage / this.nFramesIdleShootAnim_rage)) | 0;

	this.currentFrame = this.frames["reposTirRage"][indexFrame];

	if(indexFrame==0&&!this.bulletPushed)
	{
		this.bulletPushed = true;
		this.shootBullet();
	}
	if(indexFrame==this.nFramesIdleShootAnim_rage - 1)
	{
		this.state.gotoState("IDLE_RAGE");
	}
};

Hero.prototype.runAnimateRage = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalRunAnimTime_rage;
	var indexFrame = (this.timeSinceAnimStarted / (this.totalRunAnimTime_rage / this.nFramesRunAnim_rage)) | 0;
	this.currentFrame = this.frames["courseRage"][indexFrame];
	if(this.lastControl == 0)
	{
		this.state.gotoState("IDLE_RAGE");
	}
};

Hero.prototype.runAttackAnimateRage = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalRunattackAnimTime_rage;

	var indexFrame = (this.timeSinceAnimStarted / (this.totalRunattackAnimTime_rage / this.nFramesRunAttackAnim_rage)) | 0;

	this.currentFrame = this.frames["courseFrappeRage"][indexFrame];

	if(indexFrame == 3&&!this.enemyHit)
	{
		this.enemyHit = true;
		this.calculateMeleeHit();
	}
	if(indexFrame == this.nFramesRunAttackAnim_rage - 1)
	{
		this.state.gotoState("RUN_RAGE");
	}	
};

Hero.prototype.runShootAnimateRage = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalRunShootAnimTime_rage;

	var indexFrame = (this.timeSinceAnimStarted / (this.totalRunShootAnimTime_rage / this.nFramesRunShootAnim_rage)) | 0;

	this.currentFrame = this.frames["courseTirRage"][indexFrame];

	if(indexFrame==0&&!this.bulletPushed)
	{
		this.bulletPushed = true;
		this.shootBullet();
	}
	if(indexFrame==this.nFramesRunShootAnim_rage - 1)
	{
		this.state.gotoState("RUN_RAGE");
	}	
};

Hero.prototype.jumpAnimateRage = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalJumpAnimTime_rage;
	var indexFrame = (this.timeSinceAnimStarted / (this.totalJumpAnimTime / this.nFramesJumpAnim_rage)) | 0;
	this.currentFrame = this.frames["sautRage"][indexFrame];
};

Hero.prototype.jumpAttackAnimateRage = function() {
	this.currentImage = this.sautFrappeImage;
	this.timeSinceAnimStarted %= this.totalJumpAttackAnimTime_rage;

	var indexFrame = (this.timeSinceAnimStarted / (this.totalJumpAttackAnimTime_rage / this.nFramesJumpAttackAnim_rage)) | 0;

	this.currentFrame = this.frames["sautFrappeRage"][indexFrame];

	if(indexFrame == 3&&!this.enemyHit)
	{
		this.enemyHit = true;
		this.calculateMeleeHit();
	}
	if(indexFrame == this.nFramesJumpAttackAnim_rage - 1)
	{
		this.state.gotoState("IDLE_RAGE");
	}	
};

Hero.prototype.jumpShootAnimateRage = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalJumpShootAnimTime_rage;

	var indexFrame = (this.timeSinceAnimStarted / (this.totalJumpShootAnimTime_rage / this.nFramesJumpShootAnim_rage)) | 0;

	if(indexFrame == 0&&!this.bulletPushed)
	{
		this.bulletPushed = true;
		this.shootBullet();
	}
	if(indexFrame == this.nFramesJumpShootAnim_rage - 1)
	{
		this.state.gotoState("IDLE_RAGE");
	}	
	this.currentFrame = this.frames["sautTirRage"][indexFrame];	
};

Hero.prototype.hurtAnimateRage = function() {
	this.currentImage = this.image;
	this.timeSinceAnimStarted %= this.totalHurtTime_rage;
	
	var indexFrame = (this.timeSinceAnimStarted / (this.totalHurtTime_rage / this.nFramesHurtAnim_rage)) | 0;

	this.currentFrame = this.frames["blessureRage"][indexFrame];	

	if(indexFrame == this.nFramesHurtAnim_rage - 1)
	{
		this.state.gotoState("IDLE_RAGE");
	}	
};

Hero.prototype.checkRageStatus = function(nextState) {
	if(this.surchau >= 400&&!this.rageTimerOn)
	{
		this.previousFrameRageTimer = new Date().getTime();
		this.rageTimerOn = true;
		this.state.gotoState(nextState+"_RAGE");
	}
	if(this.rageTimerOn)
	{
		var newDate = new Date().getTime();
		this.currentRageTimer += newDate - this.previousFrameRageTimer;
		if(this.currentRageTimer >= this.rageTimer)
		{
			this.surchau = 0;
			this.currentRageTimer = 0;
			this.rageTimerOn = false;
			this.previousFrameRageTimer = 0;
			this.state.gotoState(nextState.split("_RAGE")[0]);
		}
	}
};

/*===========================BALLE==============================*/
function balle(x,y,direction){
	this.h = 5* ratio;
	this.w = 5* ratio;
	this.x = x;
	this.y = y - 50 * ratio;
	this.direction = direction;
	this.box = new Box(x,y,5 * ratio,5 * ratio);
}

balle.prototype.draw = function() {
	context.drawImage(balleImg,0,0,balleImg.width,balleImg.height,this.x,this.y,200 * ratio,200 * ratio);
	// context.strokeRect(this.x,this.y,this.w,this.h);
}

balle.prototype.move = function() {
	this.box.x = this.x+=this.direction*35 * ratio;
}