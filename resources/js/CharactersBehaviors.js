function AddGravityBehavior (object) {
	
	object.prototype.extendedConstructor = function() {

		this.downWardSpeed = 0;
		this.gravityAcceleration = 1;
		this.updateCalls.push(this.gravity,this.move);
		this.direction = 0;
		this.lookToward = 1;
		this.inertia = 0;
		this.inertiaFrameCounter = 0;
	};	


	object.prototype.gravity = function() {
		if(this.jumping) return;
		this.downWardSpeed += this.gravityAcceleration;

		this.box.y+= this.downWardSpeed;
		
		if(this.collisionLow(groundTiles)||this.collisionLow(platFormTiles))
		{
			this.box.y -=this.downWardSpeed;
			this.touchGround = true;
			this.downWardSpeed = 0;
			return;
		}else
		{
			this.touchGround = false;
		}

		this.y+=this.downWardSpeed;
	};

	object.prototype.collisionLow = function(tilesArary){
		
		for (var i = 0; i < tilesArary.length; i++) {
			
			if(isColliding(tilesArary[i].box,this.box))
			{
				return true; //on veut pas diminuer le y deux fois.
			}
		};
		return false;
	};
}

function AddSideMoveCapabilities (object) {
	object.prototype.move = function() {



		var tileCollided = this.collisionSides(wallTiles) || this.collisionSides(platFormTiles);

		if(this.inertiaFrameCounter++ % INERTIA_FRAME_DELAY == 0)
		{
			if(this.direction==0)//frottement (point mort)
			{
				if(this.inertia<0)
				{
					this.inertia += ACCELERATION;
				}else if(this.inertia>0)
				{
					// debugger;
					this.inertia-= ACCELERATION;
				}
			}else
			{
				if(this.direction<0)
				{

					this.inertia += this.inertia + this.speed > 0 ? this.direction * ACCELERATION:0;
				}else
				{
					this.inertia += this.inertia - this.speed < 0?this.direction * ACCELERATION:0;
				}
			}
		}

		// this.inertia = Math.min(this.inertia,this.speed);

		var xMove = this.inertia;

		this.box.x += xMove;

		if(tileCollided)
		{
			this.box.x = this.box.x < tileCollided.box.x ? tileCollided.box.x - this.box.w - 1 : tileCollided.box.x+tileCollided.box.w+1;
			this.x = this.box.x;
			return false;	
		}

		this.x = this.box.x;
		return true;
	};
	
}

function AddCollisionSidesCapabilities (object) {
	object.prototype.collisionSides = function(tileArray) {
		for (var i = tileArray.length - 1; i >= 0; i--) {
			if(
				isColliding(tileArray[i].box,this.box)
			)
			{
				this.inertia = 0;
				return tileArray[i];
			}
		};
		return false;
	};	
}

function AddAttackAbility(object) {
	object.prototype.meleeAttack = function() {

		var hitBox = new Box(
				this.lookToward<0?this.x - this.attackRange:this.x+this.w,
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
}