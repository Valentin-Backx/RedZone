var canvas,context;

var canvasWidth,canvasHeight;

var bgRatio;

var toolBeltRatio = 0.05;

var backgroundImage;

var activeTool;

window.onload = function () {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	backgroundImage = new Image();
	backgroundImage.src = "resources/images/background.jpg";

	//canvasHeight = 720;  Fenetre fixe adaptable
	//canvasWidth = 1280;  pour tablette et petit pc.
	canvasHeight = window.innerHeight;
	canvasWidth = window.innerWidth;

	canvas.width = canvasWidth - 25;
	canvas.height = canvasHeight - 25;

	bgRatio = backgroundImage.width / backgroundImage.height;

	run();
}

//Fonctions de synchronisation d'affichage
window.requestAnimFrame = 	(
	function(){
		return  window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function(callback, element){
			window.setTimeout(callback, 1000 / 60);
		};
	}
)();

function run () {
	//context.fillStyle = "#000000";
	//context.fillRect(0,0,canvasWidth,canvasHeight);
	context.drawImage(backgroundImage,0,0,backgroundImage.width,backgroundImage.height,0,0,canvasHeight * bgRatio,canvasHeight);
	requestAnimFrame(run);
}