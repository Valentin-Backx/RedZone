function retrieveGamePad() {

	var gamePads = (function()
	{
		return navigator.webkitGetGamepads ||navigator.getGamepads
	} )().call(navigator);


    for (var i = 0; i < gamePads.length; ++i)
    {
        if(gamePads[i])
        {
        	currentGamepad = gamePads[i];
        	// debugger
        	return;
        }
        // todo; simple demo of displaying pad.axes and pad.buttons
    }	
}

function onGamepadConnected (gamePad) {
	currentGamepad = gamePad;
}

function gamePadControls () {
	
}

window.addEventListener("MozGamepadConnected", onGamepadConnected);

window.addEventListener("gamepadconnected",onGamepadConnected);