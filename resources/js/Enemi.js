function Enemi (x,y,image,frames) {
	this.y = y * ratio;
	this.x = x * ratio;

	this.w = 256 * ratio;//remplacer 32 par taille réelle
	this.h = 256 * ratio;//remplacer 32 par taille réelle

	this.frames = frames;

	this.initialSpeed = 5 * ratio;
	this.speed = this.initialSpeed;
	this.chargeSpeed = 20 * ratio;

	this.life = 10;

	this.attackRange = 25 * ratio;
	this.chargeRange =  7 * BASE_TILE_SIZE * ratio;
	this.chargeKnockBack = 50 * ratio;
	this.previousChargePosX = 0;
	this.chargedDistance = 0;
	this.lookToward = 1;

	this.image = image;
	this.box = new Box(this.x,this.y,256 * ratio,256 * ratio);//remplacer 32 par hitbox réelle du bonhomme

	this.updateCalls = [];
	this.meleeForce = 10;//debug
	this.meleeWeaponHeight = 1 * ratio;
	this.meleeWeaponWidth = 10 * ratio;

	this.scoreValue = 1;

	/*======ANIMATIONS=====*/
	this.totalTimePrepareChargeAnim = 200;
	this.totalTimeChargeAnim = 200;
	this.numberOfFramePrepareCharge = this.frames.preparCharge.length;
	this.numberOfFrameCharge = this.frames.charge.length;
	this.timerCharge = 1500;//time to charge again*
	this.currentTimerCharge = 0;
	this.lastFrameTimerCharge = new Date().getTime();
	this.chargeCoolDown = false;


	this.totalIdleAnim = 600; //override
	if(this.frames) this.numberOfFrameIdle = this.frames.idle.length; //virer le test quand le hero aura ses frames aussi

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

	this.lookToward = this.x<hero.x?1:-1;

	this.timeSinceAnimStarted %= this.totalTimePrepareChargeAnim;

	var indexFrame = (this.timeSinceAnimStarted / (this.totalTimePrepareChargeAnim / this.numberOfFramePrepareCharge)) | 0;

	this.currentFrame = this.frames["preparCharge"][indexFrame];
	
	if(indexFrame == this.numberOfFramePrepareCharge - 1) this.state.gotoState("CHARGE");
};

Enemi.prototype.chargeAnimate = function() {


	this.inertia = this.speed * this.lookToward;
	this.timeSinceAnimStarted %= this.totalTimePrepareChargeAnim;

	var indexFrame = (this.timeSinceAnimStarted / (this.totalTimeChargeAnim / this.numberOfFrameCharge)) | 0;

	this.currentFrame = this.frames["charge"][indexFrame];

	this.chargeAnimationRunOnce = indexFrame == this.frames["charge"].length - 1;

	this.chargedDistance += Math.abs(Math.abs(this.previousChargePosX) - Math.abs(this.x));
	this.previousChargePosX = this.x;

	if(!isColliding(this.box,hero.box))
	{
		if(!this.move())
		{
			this.state.gotoState("IDLE");
		}
	}else if(!this.heroHit)
	{
		this.heroHit = true;
		hero.jump();
		hero.outerForce += this.direction * this.chargeKnockBack;
		hero.damage(this.meleeForce);
	}

	if(this.chargedDistance > this.chargeRange&&this.chargeAnimationRunOnce)
	{
		this.state.gotoState("IDLE");
	}
};

Enemi.prototype.charge = function() {
	this.chargeAnimationRunOnce = false;
	this.previousChargePosX = this.x;
	this.speed = this.chargeSpeed;
	this.direction = this.lookToward;
	this.inertia = this.speed * this.lookToward;
	this.heroHit = false;
};

Enemi.prototype.chargeOver = function() {
	this.previousChargePosX = 0;
	this.chargedDistance = 0;
	this.speed = this.initialSpeed;
	this.currentTimerCharge = 0;
	this.chargeCoolDown = true;
	this.lastFrameTimerCharge = new Date().getTime();
};

Enemi.prototype.moveAnimate = function() {

	this.updateChargeTimer();

	this.timeSinceAnimStarted %= this.totalIdleAnim;
	this.currentFrame = this.frames["idle"][(this.timeSinceAnimStarted / (this.totalIdleAnim / this.numberOfFrameIdle)) | 0];
	if(this.x - hero.x > canvasWidth / 2)
	{
		this.state.gotoState("IDLE");
	}	
	if(this.x < hero.x)
	{
		this.lookToward = 1;
		if(this.x+this.w+this.chargeRange > hero.x&&!this.chargeCoolDown) // a portée de charge
		{
			this.state.gotoState("PREPARE_CHARGE");
		}else
		{
			if(hero.x - this.x > this.w)
			{
				this.direction = 1;
				this.move();
			}
		}
	}else
	{
		this.lookToward = -1;
		if(this.x - this.chargeRange < hero.x + hero.w&&!this.chargeCoolDown)//a portée de charge
		{
			this.state.gotoState("PREPARE_CHARGE");
		}else
		{
			if(this.x - hero.x >hero.w )
			{
				this.direction = -1;
				this.move();				
			}

		}
	}
};

Enemi.prototype.idleAnimate = function() {

	this.updateChargeTimer();
	this.timeSinceAnimStarted %= this.totalIdleAnim;
	this.currentFrame = this.frames["idle"][(this.timeSinceAnimStarted / (this.totalIdleAnim / this.numberOfFrameIdle)) | 0];

	if(this.x - hero.x < canvasWidth / 2)
	{
		this.state.gotoState("MOVE");
	}
};

Enemi.prototype.updateChargeTimer = function() {
	var currentTime = new Date().getTime();
	this.currentTimerCharge += currentTime - this.lastFrameTimerCharge;

	if(this.currentTimerCharge > this.timerCharge)
	{
		this.chargeCoolDown = false;
	}else
	{
		this.lastFrameTimerCharge = currentTime;
	}
};

Enemi.prototype.enterIdle = function() {
	this.currentFrame = this.frames["idle"][0];
};