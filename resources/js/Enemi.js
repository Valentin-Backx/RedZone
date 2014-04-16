function Enemi (x,y,image) {
	this.y = y * ratio;
	this.x = x * ratio;

	this.w = 32 * ratio;//remplacer 32 par taille réelle
	this.h = 32 * ratio;//remplacer 32 par taille réelle

	this.speed = 5 * ratio;

	this.life = 10;

	this.attackRange = 25 * ratio;
	this.orientation = 1;

	this.image = image;
	this.box = new Box(this.x,this.y,32 * ratio,32 * ratio);//remplacer 32 par hitbox réelle du bonhomme

	this.updateCalls = [this.onScreen];
	this.meleeForce = 1;//debug
	this.meleeWeaponHeight = 1 * ratio;
	this.meleeWeaponWidth = 10 * ratio;

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
			this.direction = 1;
			this.move();
		}
	}else
	{
		this.orientation = -1;
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