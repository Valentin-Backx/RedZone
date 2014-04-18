function EnemySmall (x,y,image,frames)  {
	this.y = y * ratio;
	this.x = x * ratio;

	this.w = 256 * ratio;//remplacer 32 par taille réelle
	this.h = 256 * ratio;//remplacer 32 par taille réelle

	this.frames = frames;

	this.initialSpeed = 5 * ratio;
	this.speed = this.initialSpeed;

	this.life = 10;

	this.lookToward = 1;

	this.image = image;
	this.box = new Box(this.x,this.y,170 * ratio,147 * ratio);//remplacer 32 par hitbox réelle du bonhomme

	// debugCollision.push(this.box);

	this.updateCalls = [];
	this.meleeForce = 10;//debug
	this.meleeWeaponHeight = -17 * ratio;
	this.meleeWeaponWidth = 55 * ratio;
	this.attackRange = 75 * ratio;

	this.scoreValue = 1;

	/*======ANIMATIONS=====*/

	this.totalIdleAnim = 600; //override
	this.numberOfFrameIdle = this.frames.idle.length; //virer le test quand le hero aura ses frames aussi

	this.totalRunAnim = 300;
	this.nFramesRunAnim = this.frames.marche.length;

	this.totalRunAttakAnim = 300;
	this.nFramesRunAttakAnim = this.frames.marcheAttak.length;

	this.totalAttakAnim = 300;
	this.nFramesAttakAnim = this.frames.attak.length;

	this.state = new State(
		{
			"IDLE" : 
			{
				"act" : this.idleAnimate,
				"onEnter" : [this.enterIdle],
				"onExit" : []
			},
			"MOVE" : 
			{
				"act" : this.moveAnimate,
				"onEnter" : [],
				"onExit" : []
			},
			"ATTAK" :
			{
				"act" : this.attakAnimate,
				"onEnter" : [this.enterAttakStill],
				"onExit" : []
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
	/*=====================*/

	if(this.extendedConstructor)
	{
		this.extendedConstructor();
	}

	this.frameIndex = 0;
}
AddDeathBehavior(EnemySmall);
AddGravityBehavior(EnemySmall);
AddCollisionSidesCapabilities(EnemySmall);
AddSideMoveCapabilities(EnemySmall);
AddDrawAnility(EnemySmall);
AddUpdateAbility(EnemySmall);
AddAnimateAbilities(EnemySmall);

EnemySmall.prototype.damage = function(damage) {
	this.life -= damage;
	if(this.life <= 0)
	{
		this.death();
	}
};

EnemySmall.prototype.deathSpecific = function() {
	enemyKilled(this);
};

EnemySmall.prototype.getTargets = function() {
	return [hero];
};

EnemySmall.prototype.idleAnimate = function() {
	this.timeSinceAnimStarted %= this.totalIdleAnim;
	this.currentFrame = this.frames["idle"][(this.timeSinceAnimStarted / (this.totalIdleAnim / this.numberOfFrameIdle)) | 0];

	if(Math.abs(this.x - hero.x) < canvasWidth / 2)
	{
		this.state.gotoState("MOVE");
	}	
};


EnemySmall.prototype.moveAnimate = function() {
	if(this.x < hero.x)
	{
		this.lookToward = 1;
		if(!this.heroAtReach())
		{
			this.direction = 1;
			this.move();			
		}else
		{
			this.state.gotoState("ATTAK");
		}
	}else
	{
		this.lookToward = -1;
		if(!this.heroAtReach())
		{
			this.direction = -1;
			this.move();			
		}else
		{
			this.state.gotoState("ATTAK");
		}
	}

	this.timeSinceAnimStarted %= this.totalRunAttakAnim;
		
	var indexFrame = (this.timeSinceAnimStarted / (this.totalRunAttakAnim / this.nFramesRunAttakAnim)) | 0;

	this.currentFrame = this.frames["idle"][indexFrame];

	if(Math.abs(this.x - hero.x) > canvasWidth / 2)
	{
		this.state.gotoState("IDLE");
	}

	if(indexFrame==1&&!this.playerHit)
	{
		this.managePlayerHit();
	}
	if(indexFrame==0)
	{
		this.playerHit = false;
	}
};

EnemySmall.prototype.enterAttakStill = function() {
	this.direction = 0;
};

EnemySmall.prototype.attakAnimate = function() {
	this.lookToward = this.x<hero.x?1:-1;

	this.timeSinceAnimStarted %= this.totalRunAttakAnim;
	var indexFrame = (this.timeSinceAnimStarted / (this.totalRunAttakAnim / this.nFramesRunAttakAnim)) | 0;

	this.currentFrame = this.frames["idle"][indexFrame];

	if(Math.abs(this.x - hero.x) > canvasWidth / 2)
	{
		this.state.gotoState("IDLE");
	}

	if(indexFrame==1&&!this.playerHit)
	{
		if(!this.managePlayerHit())
		{
			this.state.gotoState("IDLE");
		}
	}
	if(indexFrame==0)
	{
		this.playerHit=false;
	}
};

EnemySmall.prototype.managePlayerHit = function() {
		
	this.playerHit = this.heroAtReach();
	if(this.playerHit)
	{
		hero.damage(this.meleeForce);
	}
};

EnemySmall.prototype.heroAtReach = function() {
	var hitbox = new Box(
			this.lookToward<0?this.x + this.box.w / 2 - this.attackRange:this.x+this.box.w/2,
			this.y - this.meleeWeaponHeight,
			this.attackRange,
			this.meleeWeaponWidth
		);

	// debugCollision.push(hitbox);


	return isColliding(hitbox,hero.box);	
};

EnemySmall.prototype.enterIdle = function() {
	
};

EnemySmall.prototype.enterAttakState = function() {
	this.playerHit = false;
};