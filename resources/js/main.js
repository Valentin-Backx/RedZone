var canvas,context;

var canvasWidth,canvasHeight;

var bgRatio;

var backgroundImage;

var activeTool;

var murs;

var ratio;

window.onload = function () {

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	backgroundImage = new Image();
	backgroundImage.src = "http://localhost/redzone/RedZone/resources/images/background.jpg";

	canvasHeight = window.innerHeight;
	canvasWidth = window.innerWidth;

	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

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

	context.fillStyle = "#000000";

	context.fillRect(0,0,canvasWidth,canvasHeight);

	context.drawImage(backgroundImage,0,0,backgroundImage.width,backgroundImage.height,0,0,canvasHeight * bgRatio,canvasHeight);

	requestAnimFrame(run);

}

