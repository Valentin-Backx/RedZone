function Enemi (x,y,image) {
	this.y = y;
	this.x = x;

	this.w = 32 * ratio;
	this.h = ratio * 32;

	this.speed = 5;

	this.life = 10;

	this.attackRange = 25;
	this.orientation = 1;

	this.image = image;
	this.box = new Box(x,y,32 * ratio,32 * ratio);

	this.updateCalls = [this.onScreen];
	this.meleeForce = 0;//debug
	this.meleeWeaponHeight = 1;
	this.meleeWeaponWidth = 10;

	this.scoreValue = 1;

	if(this.extendedConstructor)
	{
		this.extendedConstructor();
	}
}

AddGravityBehavior(Enemi);
AddCollisionSidesCapabilities(Enemi);
AddSideMoveCapabilities(Enemi);
AddAttackAbility(Enemi);

Enemi.prototype.update = function() {
	for (var i = this.updateCalls.length - 1; i >= 0; i--) {
		this.updateCalls[i].call(this);
	};
};

Enemi.prototype.draw = function() {
	context.strokeStyle = "#FF0000";
	context.strokeRect(this.x,this.y,this.w,this.h);	
};

Enemi.prototype.onScreen = function() {
	if(this.x - hero.x < canvasWidth / 2)
	{
		this.playerInSightBehavior();
	}
};

Enemi.prototype.playerInSightBehavior = function() {
	if(this.x < hero.x)
	{
		this.orientation = 1;
		if(this.x+this.w+this.attackRange > hero.x) // a portée d'attaque
		{
			this.meleeAttack();
		}else
		{
			this.move(1);
		}
	}else
	{
		this.orientation = -1;
		if(this.x - this.attackRange < hero.x + hero.w)//a portée
		{
			this.meleeAttack();
		}else
		{
			this.move(-1);
		}
	}
};

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