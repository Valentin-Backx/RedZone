function Enemi (x,y,image,frames) {
	this.y = y * ratio;
	this.x = x * ratio;

	this.w = 256 * ratio;//remplacer 32 par taille réelle
	this.h = 256 * ratio;//remplacer 32 par taille réelle

	this.speed = 5 * ratio;

	this.life = 10;

	this.attackRange = 25 * ratio;
	this.lookToward = 1;

	this.image = image;
	this.box = new Box(this.x,this.y,256 * ratio,256 * ratio);//remplacer 32 par hitbox réelle du bonhomme

	this.updateCalls = [this.onScreen];
	this.meleeForce = 1;//debug
	this.meleeWeaponHeight = 1 * ratio;
	this.meleeWeaponWidth = 10 * ratio;

	this.scoreValue = 1;

	if(this.extendedConstructor)
	{
		this.extendedConstructor(frames);
	}

	this.frameIndex = 0;
}

AddGravityBehavior(Enemi);
AddCollisionSidesCapabilities(Enemi);
AddSideMoveCapabilities(Enemi);
AddAttackAbility(Enemi);
AddDrawAnility(Enemi);

Enemi.prototype.update = function() {
	for (var i = this.updateCalls.length - 1; i >= 0; i--) {
		this.updateCalls[i].call(this);
	};
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
		this.lookToward = 1;
		if(this.x+this.w+this.attackRange > hero.x) // a portée d'attaque
		{
			this.meleeAttack();
		}else
		{
			this.direction = 1;
			this.move();
		}
	}else
	{
		this.lookToward = -1;
		if(this.x - this.attackRange < hero.x + hero.w)//a portée
		{
			this.meleeAttack();
		}else
		{
			this.direction = -1;
			this.move();
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