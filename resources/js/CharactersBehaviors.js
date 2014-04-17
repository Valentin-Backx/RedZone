function AddUpdateAbility (object) {
	object.prototype.update = function() {


		for (var i = this.updateCalls.length - 1; i >= 0; i--) {
			// console.log(this.updateCalls[i].callback);
			this.updateCalls[i].callback.call(this.updateCalls[i].context);
		};
	};
}


function AddGravityBehavior (object) {
	
	object.prototype.extendedConstructor = function() {

		this.blockedSides = {"left":false,"right":false};

		this.downWardSpeed = 0;
		this.gravityAcceleration = 3 * ratio;
		this.updateCalls.push(
								{"callback" : this.updateState,"context" : this},
								{"callback" : this.state.act, "context" : this.state },
								{"callback" : this.gravity , "context" : this},
								{"callback" : this.move , "context" : this }
							);


		this.direction = 0;
		this.lookToward = 1;
		this.inertia = 0;
		this.inertiaFrameCounter = 0;

		this.lastFrameTime = new Date().getTime();
		this.timeSinceAnimStarted = 0;


		this.currentFrame;

		this.outerForce = 0;
	};	


	object.prototype.gravity = function() {
		if(this.jumping) return;
		this.downWardSpeed += this.gravityAcceleration;

		this.box.y+= this.downWardSpeed;
		
		var tileCollided  = this.collisionLow(groundTiles)||this.collisionLow(platFormTiles) || this.collisionLow(wallTiles);

		if(tileCollided)
		{
			this.col = tileCollided;
			this.box.y = tileCollided.box.y - this.box.h;
			this.touchGround = true;
			this.downWardSpeed = 0;
			this.y = this.box.y;
			return;
		}else
		{
			this.touchGround = false;
		}

		this.y+=this.downWardSpeed;
	};

	object.prototype.collisionLow = function(tilesArary){
		
		for (var i = 0; i < tilesArary.length; i++) {
			
			if(isCollidingBottom(this.box,tilesArary[i].box))
			{
				this.touchGround = true;
				return tilesArary[i]; //on veut pas diminuer le y deux fois.
			}
		};
		return false;
	};
}

function AddSideMoveCapabilities (object) {
	object.prototype.move = function() {

		if(this.inertiaFrameCounter++ % INERTIA_FRAME_DELAY == 0)
		{
			if(this.direction==0)//frottement (point mort)
			{
				if(this.inertia<0)
				{
					this.inertia += ACCELERATION * ratio;
					if(this.inertia>0) this.inertia = 0;
				}else if(this.inertia>0)
				{
					// debugger;
					this.inertia-= ACCELERATION * ratio;
					if(this.inertia<0)this.inertia = 0;
				}				

			}else
			{
				if(this.direction<0)
				{
					this.inertia += this.inertia + this.speed > 0 ? this.direction * ACCELERATION * ratio:0;
					// this.inertia = this.inertia + this.speed < 0 ? 0:this.inertia;
				}else
				{
					this.inertia += this.inertia - this.speed < 0?this.direction * ACCELERATION * ratio:0;
					// this.inertia = this.inertia - this.speed > 0 ? 0:this.inertia;
				}
				// if(Math.abs(this.inertia) <= this.direction * ACCELERATION * ratio)
				// {
				// 	this.inertia = 0;
				// }
			}

				if(this.outerForce<0)
				{
					this.outerForce += ACCELERATION * ratio;
					if(this.outerForce>0) this.outerForce = 0;
				}else if(this.outerForce>0)
				{
					// debugger;
					this.outerForce-= ACCELERATION * ratio;
					if(this.outerForce<0)this.outerForce = 0;
				}

		}

		var xMove = this.inertia + this.outerForce;



		this.box.x += xMove;

		var tileCollided = this.collisionSides(wallTiles) || this.collisionSides(platFormTiles);

		// this.inertia = Math.min(this.inertia,this.speed);



		if(tileCollided)
		{
			this.box.x = this.box.x < tileCollided.box.x ? tileCollided.box.x - this.box.w: tileCollided.box.x+tileCollided.box.w;
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

			if(this.inertia < 0)
			{
				if(isCollidingLeft(this.box,tileArray[i].box))
				{
					this.inertia = 0;
					return tileArray[i];		
				}
			}else if(this.inertia > 0)
			{
				if(isCollidingRight(this.box,tileArray[i].box))
				{
					// debugger
					this.inertia = 0;
					return tileArray[i];
				}
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

function AddDrawAnility(object)  {
	object.prototype.draw = function() {
		context.save();
		context.scale(this.lookToward,1);
			context.drawImage(
				this.image,
				this.currentFrame.frame.x,
				this.currentFrame.frame.y,
				this.currentFrame.frame.w,
				this.currentFrame.frame.h,
				this.x * this.lookToward,
				this.y + this.currentFrame.spriteSourceSize.y * ratio,
				this.currentFrame.frame.w * ratio * this.lookToward,
				this.currentFrame.frame.h * ratio
				);
		context.restore();
	};
}

function AddAnimateAbilities (object) {
	object.prototype.enterNewAnimation = function() {
		this.timeSinceAnimStarted = 0;
		this.lastFrameTime = new Date().getTime();
	};

	object.prototype.updateState = function() {

		var dateTime = new Date().getTime();
		var dt = (dateTime - this.lastFrameTime);
		this.lastFrameTime = dateTime;
		this.timeSinceAnimStarted += dt;
	};
}