var canvas,context;

var canvasWidth,canvasHeight;

var bgRatio;

var backgroundImage;

var activeTool;

var wallTiles,groundTiles,platFormTiles;

var ratio;

var gamePads;

var hero;

var FRAME_JUMP_DELAY = 10;

var JUMP_AMPLITUDE = 200;

var currentLevel;

var wallTileImage,groundTileImage,platFormTileImage;

var display;

window.onload = function () {

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	backgroundImage = new Image();
	backgroundImage.src = "resources/images/background.jpg";

	wallTileImage = new Image();
	// wallTileImage.src = 
	groundTileImage = new Image();
	// groundTileImage.src = 
	platFormTileImage = new Image();
	// platFormTileImage.src = 

	canvasHeight = window.innerHeight;
	canvasWidth = window.innerWidth;

	var facto = (canvasWidth / canvasHeight ) * 9 / 16;

	if(canvasWidth / canvasHeight > 16 / 9)
	{
		canvasWidth /= facto;
	}
	else
	{
		canvasHeight *= facto;
	}

	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	canvas.style.left = ((window.innerWidth - canvasWidth ) / 2) + "px";


	bgRatio = backgroundImage.width / backgroundImage.height;

	ratio = 1;

	JUMP_AMPLITUDE *= ratio;

	currentLevel = level1;
	ParseTiles();

	display = gameLoop;

	run();
}

//Fonctions de synchronisation d'affichage
window.requestAnimFrame = 	(
	function(){
		gamePads = navigator.webkitGetGamepads();
		// console.log(gamePads.length);
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

	// for (var i = gamePads.length - 1; i >= 0; i--) {
	// 	console.log(gamePads[i]);
	// };

	display();

	requestAnimFrame(run);

}

function menuLoop () {
	// display menu
}

function gameLoop () {
	context.fillStyle = "#000000";

	context.fillRect(0,0,canvasWidth,canvasHeight);

	context.drawImage(backgroundImage,0,0,backgroundImage.width,backgroundImage.height,0,0,canvasHeight * bgRatio,canvasHeight);

	hero.update();
	hero.draw();

	for (var i = wallTiles.length - 1; i >= 0; i--) {
		wallTiles[i].draw();
	};
	for (var i = groundTiles.length - 1; i >= 0; i--) {
		groundTiles[i].draw();
	};
}

function ParseTiles () {
	wallTiles = new Array();
	groundTiles = new Array();
	platFormTiles = new Array();

	for (var i = currentLevel.length - 1; i >= 0; i--) {
			for (var j = currentLevel[i].length - 1; j >= 0; j--) {
				switch(currentLevel[i][j])
				{
					case 2:
						wallTiles.push(new Tile(j * 32 * ratio, i * 32 * ratio,wallTileImage));
						break;
					case 1:
						groundTiles.push(new Tile(j * 32 * ratio, i * 32 * ratio,groundTileImage));
						break;
					case 3:
						platFormTiles.push(new Tile(j * 32 * ratio, i * 32 * ratio,platFormTileImage))
					case "x":
						hero = new Hero(j * 32 * ratio, i * 32 * ratio);
						break;
				}
			};
		};	
}