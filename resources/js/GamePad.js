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
var counterDispo = true;
var frameCounter = 0;

function gamePadA () {
    if(!currentGamepad) return false;

    if(++frameCounter >= 20)
    {
        counterDispo = true;
        frameCounter = 0;
    }

    if(currentGamepad.buttons[0]&&counterDispo)
    {

        counterDispo = false;

        return true;

    }
    return false;

	
}
