var canvas,context;

var canvasWidth,canvasHeight;

var bgRatio;

var backgroundImage;

var activeTool;

//level elements
var wallTiles,groundTiles,platFormTiles,enemies;

var ratio;

var gamePads;

var hero;

var FRAME_JUMP_DELAY = 10;

var JUMP_AMPLITUDE = 200;

var ACCELERATION = 8;
var INERTIA_FRAME_DELAY = 5;

var currentLevel;

var wallTileImage,groundTileImage,platFormTileImage,enemyImage;

var display,eventHandler;

var menuButtons;
var scoreLabel;
var comboLabel;
var hudLabels;

var gameOverLabel,gameOver,gameOverTimeout;

var canvasLeftOffset;

var oldheroX;

var scroll =0;
var vie =10
var viebase =10
var parasinc ;


var score,comboMultiplyer,comboFrameDelayReset,comboMultiplyerCurrentFrame;



window.onload = function () {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	backgroundImage = new Image();
	backgroundImage.src = "resources/images/background.jpg";

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

	canvasLeftOffset = ((window.innerWidth - canvasWidth ) / 2);
	canvas.style.left = canvasLeftOffset + "px";

	bgRatio = backgroundImage.width / backgroundImage.height;

	ratio = 1;

	JUMP_AMPLITUDE *= ratio;

	gameStateInit();

	run();
}
	
function gameStateInit () {
	window.addEventListener("click",function(event){eventHandler(event) },false);

	menuButtons = [];
	menuButtons.push(new Button(canvasWidth / 2,canvasHeight / 2,400,150,"New Game",newGame));
	goToMenu();
}

function goToMenu () {
	
	display = menuLoop;
	eventHandler = menuClickEventHandler;
	gameOver = false;
}

function menuClickEventHandler (event) {
	for (var i = menuButtons.length - 1; i >= 0; i--) {
		if(menuButtons[i].isClicked(event.x-canvasLeftOffset,event.y))
		{
			menuButtons[i].action();
		}
	};
}

function newGame () {
	currentLevel = level2;


	display = gameLoop;
	eventHandler = function  () {
		
	}
	score = 0;
	comboMultiplyer =0;
	comboMultiplyerCurrentFrame = 0;

	scoreLabel = new Label(15,15,100,50,"Score: 0");
	comboLabel = new Label(canvasWidth - 115, 15,100,50,"Combo: X0");
	gameOverLabel = new Label(canvasWidth / 2,canvasHeight/2,150,50,"GAME OVER");

	comboFrameDelayReset = 60;
	wallTileImage = new Image();
	// wallTileImage.src = 
	groundTileImage = new Image();
	// groundTileImage.src = 
	platFormTileImage = new Image();
	// platFormTileImage.src = 
	ParseTiles();
}

function manageScore () {
	if(comboMultiplyer > 0)
	{
		if(++comboMultiplyerCurrentFrame >= comboFrameDelayReset)
		{
			comboMultiplyer = 0;
		}
	}
	scoreLabel.text = "Score: "+score;
}

function displayHud () {
	scoreLabel.draw();
	comboLabel.draw();
	if(gameOver)
	{
		gameOverLabel.draw();
	}
}

function endGameOver (arg) {
	if(arg)
	{
		clearTimeout(gameOverTimeout);
	}
	goToMenu();
}


function death () {
	currentLevel = 1;

	gameOver = true;
	gameOverTimeout = setTimeout(5000,endGameOver);

	eventHandler = endGameOver;
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

function enemyKilled (enemy) {
	score+=enemy.scoreValue*(++comboMultiplyer);
	for (var i = enemies.length - 1; i >= 0; i--) {
		enemies.splice(i,1);
		break;
	};
}

function menuLoop () {
	context.fillStyle = "#000000";

	context.fillRect(0,0,canvasWidth,canvasHeight);	
	for (var i = menuButtons.length - 1; i >= 0; i--) {
		menuButtons[i].draw();
	};
}

function gameLoop () {

	if (hero.x > 300 && hero.x < 2000){mouvectx();};

	oldheroX= hero.x

	context.fillStyle = "#000000";

	context.fillRect(0,0,10000,10000);

	context.drawImage(backgroundImage,0,0,backgroundImage.width,backgroundImage.height,0,0,canvasHeight * bgRatio,canvasHeight);

	hero.update();

	paralax();

	for(var i = enemies.length - 1; i >= 0; i--) {
		enemies[i].update();
		enemies[i].draw();
	};

	hero.draw();

	for (var i = wallTiles.length - 1; i >= 0; i--) {
		wallTiles[i].draw();
	};
	for (var i = groundTiles.length - 1; i >= 0; i--) {
		groundTiles[i].draw();
	};
	for (var i = platFormTiles.length - 1; i >= 0; i--) {
		platFormTiles[i].draw();
	};
	manageScore();
	displayHud();
}

function ParseTiles () {
	wallTiles = new Array();
	groundTiles = new Array();
	platFormTiles = new Array();
	enemies = new Array();

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
						break;
					case "x":
						hero = new Hero(j * 32 * ratio, i * 32 * ratio);
						break;
					case "z":
						enemies.push(new Enemi(j * 32 * ratio, i * 32 * ratio,enemyImage));
						break;
				}
			};
		};
}