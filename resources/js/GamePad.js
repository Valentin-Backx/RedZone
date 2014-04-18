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

    
    // var pads = Gamepad.getStates();
    // for (var i = 0; i < pads.length; ++i) {
    //     if (pads[i]) {
    //         console.log(i + ": (" + pads[i].leftStickX + ", " + pads[i].leftStickY + ")");
    //     }
    // }
}

function onGamepadConnected (gamePad) {
	currentGamepad = gamePad;
}

function gamePadControls () {
	
}

window.addEventListener("MozGamepadConnected", onGamepadConnected);

window.addEventListener("gamepadconnected",onGamepadConnected);