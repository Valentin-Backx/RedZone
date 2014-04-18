function Reward (x,y,rewards) {
	this.rewards = rewards;

	this.x = x * ratio;
	this.y = (y - 100) * ratio;

	this.sourceWidth = 220;
	this.sourceHeight = 326;


	this.w = this.sourceWidth  * ratio;
	this.h =  this.sourceHeight * ratio;

	this.totalRewardAnimTime = 750;
	this.nFramesRewardAnim = this.rewards.length;	
	this.timeSinceAnimStarted = 0;
	this.lastFrameTime = new Date().getTime();

	this.box = new Box(this.x,this.y,this.w,this.h);

	this.drawFunction = function  () {
		this.timeSinceAnimStarted %= this.totalRewardAnimTime;
		var indexFrame = (this.timeSinceAnimStarted / (this.totalRewardAnimTime / this.nFramesRewardAnim)) | 0;
		var currentFrame = this.rewards[indexFrame];

		context.drawImage(currentFrame,0,0,this.sourceWidth,this.sourceHeight,this.x,this.y,this.w,this.h);		
	}

	// debugCollision.push(this.box);
}

Reward.prototype.update = function() {
	var dateTime = new Date().getTime();
	var dt = (dateTime - this.lastFrameTime);
	this.lastFrameTime = dateTime;
	this.timeSinceAnimStarted += dt;	
	if(isColliding(this.box,hero.box))
	{
		this.drawFunction = function  () {
			
		}
		levelOver();
	}
};

Reward.prototype.draw = function() {
	this.drawFunction();
};

