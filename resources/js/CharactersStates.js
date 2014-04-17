function State (states,context) {
	this.states = states;

	this.context = context;
	this.currentAct = function  () {
		console.log("no act yet");	
	}

	this.currentState = null;
	this.gotoState("IDLE");
}

State.prototype.act = function() {
	if(this.currentAct) {
		this.currentAct.call(this.context);
	}
};

State.prototype.gotoState = function(nextState) {
	if(this.currentState==nextState) return;
	if(this.currentState != null)
	{
		for (var i = this.states[this.currentState].onExit.length - 1; i >= 0; i--) {
			this.states[this.currentState].onExit[i].call(this.context);
		};
	}

	this.currentState = nextState;
	
	this.currentAct = this.states[nextState].act;

	for (var i = this.states[nextState].onEnter.length - 1; i >= 0; i--) {
		this.states[nextState].onEnter[i].call(this.context);
	};
};