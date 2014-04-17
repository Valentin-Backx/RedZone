function Enemi (x,y,image,frames) {
	this.y = y * ratio;
	this.x = x * ratio;

	this.w = 256 * ratio;//remplacer 32 par taille réelle
	this.h = 256 * ratio;//remplacer 32 par taille réelle

	this.frames = frames;

	this.initialSpeed = 5 * ratio;
	this.speed = this.initialSpeed;
	this.chargeSpeed = 15 * ratio;

	this.life = 10;

	this.attackRange = 25 * ratio;
	this.chargeRange =  6 * BASE_TILE_SIZE * ratio;
	this.lookToward = 1;

	this.image = image;
	this.box = new Box(this.x,this.y,256 * ratio,256 * ratio);//remplacer 32 par hitbox réelle du bonhomme

	this.updateCalls = [];
	this.meleeForce = 1;//debug
	this.meleeWeaponHeight = 1 * ratio;
	this.meleeWeaponWidth = 10 * ratio;

	this.scoreValue = 1;

	/*======ANIMATIONS=====*/
	this.totalTimePrepareChargeAnim = 500;
	this.totalTimeChargeAnim = 1000;
	this.numberOfFramePrepareCharge = this.frames.preparCharge.length;
	this.numberOfFrameCharge = this.frames.charge.length;		

	this.state = new State(
		{
			"IDLE" : 
			{
				"act" : this.idleAnimate,
				"onEnter" : [this.enterIdle],
				"onExit" : []
			},
			"MOVING" : 
			{
				"act" : this.moveAnimate,
				"onEnter" : [],
				"onExit" : []
			},
			"PREPARE_CHARGE" : 
			{
				"act" : this.prepareChargeAnimate,
				"onEnter" : [this.enterNewAnimation],
				"onExit" : []
			},
			"CHARGE" : 
			{
				"act" : this.chargeAnimate,
				"onEnter" : [this.enterNewAnimation,this.charge],
				"onExit" : [this.chargeOver]
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

AddGravityBehavior(Enemi);
AddCollisionSidesCapabilities(Enemi);
AddSideMoveCapabilities(Enemi);
AddAttackAbility(Enemi);
AddDrawAnility(Enemi);
AddUpdateAbility(Enemi);
AddAnimateAbilities(Enemi);

Enemi.prototype.damage = function(damage) {
	this.life -= damage;
	if(this.life <= 0)
	{
		enemyKilled(this);
	}
};

Enemi.prototype.getTargets = function() {
	return [hero];
};

Enemi.prototype.prepareChargeAnimate = function() {
	this.timeSinceAnimStarted %= this.totalTimePrepareChargeAnim;
	this.currentFrame = this.frames["preparCharge"][(this.timeSinceAnimStarted / (this.totalIdleAnim / this.numberOfFramePrepareCharge)) | 0].frame;
	
	if(this.currentFrame == this.numberOfFramePrepareCharge - 1) this.state.goToState("CHARGE");
};

Enemi.prototype.chargeAnimate = function() {
	this.timeSinceAnimStarted %= this.totalTimePrepareChargeAnim;
	this.currentFrame = this.frames["charge"][(this.timeSinceAnimStarted / (this.totalIdleAnim / this.numberOfFramePrepareCharge)) | 0].frame;

	if(!isColliding(this.box,hero.box))
	{
		this.move();
	}

	if(this.currentFrame == this.numberOfFrameCharge - 1 ) this.state.goToState("IDLE");
};

Enemi.prototype.charge = function() {
	this.speed = this.chargeSpeed;
};

Enemi.prototype.chargeOver = function() {
	this.speed = this.initialSpeed;
};

Enemi.prototype.moveAnimate = function() {

	this.timeSinceAnimStarted %= this.totalIdleAnim;
	this.currentFrame = this.frames["idle"][(this.timeSinceAnimStarted / (this.totalIdleAnim / this.numberOfFrameIdle)) | 0].frame;
	
	if(this.x < hero.x)
	{
		this.lookToward = 1;
		if(this.x+this.w+this.chargeRange > hero.x) // a portée de charge
		{
			this.state.goToState("PREPARE_CHARGE");
		}else
		{
			this.direction = 1;
			this.move();
		}
	}else
	{
		this.lookToward = -1;
		if(this.x - this.chargeRange < hero.x + hero.w)//a portée de charge
		{
			this.state.goToState("PREPARE_CHARGE");
		}else
		{
			this.direction = -1;
			this.move();
		}
	}
};

Enemi.prototype.idleAnimate = function() {

	this.timeSinceAnimStarted %= this.totalIdleAnim;
	this.currentFrame = this.frames["idle"][(this.timeSinceAnimStarted / (this.totalIdleAnim / this.numberOfFrameIdle)) | 0].frame;

	if(this.x - hero.x < canvasWidth / 2)
	{
		this.state.goToState("MOVE");
	}
};

Enemi.prototype.enterIdle = function() {
	this.currentFrame = this.frames["idle"][0].frame;
};