var canvas,context;

var canvasWidth,canvasHeight;
var BASE_TILE_SIZE = 128;

var bgRatio;

var backgroundImage;

var activeTool;

//level elements
var wallTiles,groundTiles,platFormTiles,enemies,reward;
var frontElements;

var ratio;

var gamePads;

var hero;
var balle;

var FRAME_JUMP_DELAY = 10;

var JUMP_AMPLITUDE = 500;

var ACCELERATION = 8;
var INERTIA_FRAME_DELAY = 5;

var currentLevel;

var display,eventHandler;

var menuButtons;
var scoreLabel;
var comboLabel;
var hudLabels;

var gameOverLabel,gameOver,gameOverTimeout;


var oldheroX;
var mofe= false;
var scroll =0;
var vie =10
var viebase =10
var parasinc ;

var levelParser;

var score,comboMultiplyer,comboFrameDelayReset,comboMultiplyerCurrentFrame;
var Bouton_Over = new Image(); Bouton_Over.src ="resources/images/Menu/Bouton_Over.png";
var Fond_Menu = new Image(); Fond_Menu.src ="resources/images/Menu/Fond_Menu.png";
var jauge = new Image(); jauge.src ="resources/images/jauge.png";
var liquide_jauge = new Image(); liquide_jauge.src ="resources/images/liquide_jauge.png";
var fleche1 = new Image(); fleche1.src ="resources/images/fleche1.png";
var fleche2 = new Image(); fleche2.src ="resources/images/fleche2.png";
var fleche3 = new Image(); fleche3.src ="resources/images/fleche3.png";
var fleche4 = new Image(); fleche4.src ="resources/images/fleche4.png";
var fleche5 = new Image(); fleche5.src ="resources/images/fleche5.png";
var fleche6 = new Image(); fleche6.src ="resources/images/fleche6.png";
var fleche7 = new Image(); fleche7.src ="resources/images/fleche7.png";
var fleche8 = new Image(); fleche8.src ="resources/images/fleche8.png";
var balleImg;
var balles =[];
var compt;

var currentGamepad;

var endTitleTop,endTitleBottom,bottomDisplay,bottomTitleLeft;
var indexCurrentLevel;

window.onload = function () {
	retrieveGamePad();
	indexCurrentLevel = 0;

	balleImg = new Image();
	balleImg.src = "resources/images/boulet.png";

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

	ratio = canvasWidth/1920;


	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	canvasLeftOffset = ((window.innerWidth - canvasWidth ) / 2);
	canvas.style.left = canvasLeftOffset + "px";

	bgRatio = backgroundImage.width / backgroundImage.height;

	// ratio = 1;

	JUMP_AMPLITUDE *= ratio;

	gameStateInit();

	run();
}

function newGame () {
	currentLevel = levels[indexCurrentLevel];

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

	levelParser = new  LevelParser();
	
	levelParser.parseTiles(currentLevel);
	compt =0;
	savectx();
	balles.push(new balle(-60,-60,0))
	hero.surchau =0
	hero.life=200
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

function menuLoop () {
	context.drawImage(Fond_Menu,0,0,Fond_Menu.width,Fond_Menu.height,0,0,canvasWidth,canvasHeight);


	for (var i = menuButtons.length - 1; i >= 0; i--) {
		context.drawImage(Bouton_Over,0,0,Bouton_Over.width,Bouton_Over.height,menuButtons[i].x,menuButtons[i].y,Bouton_Over.width/2,Bouton_Over.height/2);
	};

	if(gamePadA())
	{
		newGame();
	}

}

function goToMenu () {
	display = menuLoop;
	eventHandler = menuClickEventHandler;
	gameOver = false;
}


function gameStateInit () {
	window.addEventListener("click",function(event){eventHandler(event) },false);

	menuButtons = [];

	menuButtons.push(new Button(canvasWidth / 2,canvasHeight / 2,400,150,"New Game",newGame));
	goToMenu();
}


function menuClickEventHandler (event) {
	for (var i = menuButtons.length - 1; i >= 0; i--) {
		if(menuButtons[i].isClicked(event.x-canvasLeftOffset,event.y))
		{
			menuButtons[i].action();
		}
	};
}

function levelOver () {

	bottomTitleLeft = canvasWidth;
	indexCurrentLevel++;
	bottomDisplay = false;

	endTitleTop = new Image();
	endTitleTop.src = "resources/images/title_end01.png";

	endTitleBottom = new Image();
	endTitleBottom.src = "resources/images/title_end02.png";
	
	restctx();

	display = levelOverDisplay;
	eventHandler = levelOverEventListener;
}

function levelOverDisplay () {
	if(gamePadA())
	{
		if(bottomDisplay)
		{
			if(bottomTitleLeft > (canvasWidth - endTitleBottom.width * ratio) / 2&&bottomDisplay)
			{
				bottomTitleLeft = (canvasWidth - endTitleBottom.width * ratio) / 2;
			}else{
				newGame();
			}
		}
		bottomDisplay = true;

	}

	context.fillStyle = "#000000";

	context.fillRect(0,0,canvasWidth,canvasHeight);

	context.drawImage(endTitleTop,
		0,
		0,
		endTitleTop.width,
		endTitleTop.height,
		(canvasWidth - endTitleTop.width * ratio) / 2,
		(canvasHeight / 2 - endTitleTop.height * ratio) / 2,
		endTitleTop.width * ratio,
		endTitleTop.height * ratio
		);

	if(bottomTitleLeft > (canvasWidth - endTitleBottom.width * ratio) / 2&&bottomDisplay)
	{
		bottomTitleLeft -=15;
	}
	if(bottomDisplay)
	{
		context.drawImage(endTitleBottom,0,0,endTitleBottom.width,endTitleBottom.height,bottomTitleLeft,(canvasHeight / 2) + (canvasHeight / 2 - endTitleBottom.height * ratio) / 2,endTitleBottom.width * ratio,endTitleBottom.height * ratio);
	
	}
}

function levelOverEventListener () {
	if(!bottomDisplay)
	{
		bottomDisplay = true;
	}else{
		delete endTitleTop;
		delete endTitleBottom;
		newGame();

	}
	
}





function displayHud () {
	if (hero.life<0) {hero.life=0};
	context.drawImage(jauge,0,0,jauge.width,jauge.height,0+conteurctx,0,(jauge.width)/1.5,jauge.height/1.5);
	context.drawImage(liquide_jauge,0,0,liquide_jauge.width,liquide_jauge.height,13+conteurctx,20,(liquide_jauge.width*(hero.life/3.5))/1.5,liquide_jauge.height/1.5);
	
	if (hero.surchau>350) {context.drawImage(fleche8,0,0,fleche8.width,fleche8.height,50+conteurctx,35,(fleche8.width)/1.5,fleche8.height/1.5);}
	else if (hero.surchau>300) {context.drawImage(fleche7,0,0,fleche7.width,fleche7.height,50+conteurctx,36,(fleche7.width)/1.5,fleche7.height/1.5);}
	else if (hero.surchau>250) {context.drawImage(fleche6,0,0,fleche6.width,fleche6.height,50+conteurctx,35,(fleche6.width)/1.5,fleche6.height/1.5);}
	else if (hero.surchau>200) {context.drawImage(fleche5,0,0,fleche5.width,fleche5.height,50+conteurctx,35,(fleche5.width)/1.5,fleche5.height/1.5);}
	else if (hero.surchau>150) {context.drawImage(fleche4,0,0,fleche4.width,fleche4.height,50+conteurctx,35,(fleche4.width)/1.5,fleche4.height/1.5);}
	else if (hero.surchau>100) {context.drawImage(fleche3,0,0,fleche3.width,fleche3.height,50+conteurctx,35,(fleche3.width)/1.5,fleche3.height/1.5);}
	else if (hero.surchau>50) {context.drawImage(fleche2,0,0,fleche2.width,fleche2.height,50+conteurctx,35,(fleche2.width)/1.5,fleche2.height/1.5);}
	else if (hero.surchau>=0) {context.drawImage(fleche1,0,0,fleche1.width,fleche1.height,49+conteurctx,35,(fleche1.width)/1.5,fleche1.height/1.5);};
		if(gameOver)
		{
			gameOverLabel.draw();
			if(gamePadA ())
			{
				endGameOver();
			}	
		}	
	}



function endGameOver (arg) {


	if(arg)
	{
		clearTimeout(gameOverTimeout);
	}

	restctx();

	goToMenu();
}


function death () {
	currentLevel = 1;
	gameOver = true;
	gameOverLabel = new GameOverLabel();
	eventHandler = endGameOver;
	gameOverTimeout = setTimeout(5000,endGameOver);
}


//Fonctions de synchronisation d'affichage
window.requestAnimFrame = 	(
	function(){
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

	retrieveGamePad();

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



function gameLoop () {
	compt +=1;
	if (hero.x > 0 && hero.x < 2000000){mouvectx();};
	if (hero.x<conteurctx) {hero.x= oldheroX};
	oldheroX= hero.x

	context.drawImage(backgroundImage,0,0,backgroundImage.width,backgroundImage.height,0,0,canvasHeight * bgRatio,canvasHeight);


	hero.update();
	reward.update();

	paralax();

	
	for (var i = 0; i < balles.length; i++) {
		balles[i].draw();
		balles[i].move();
	}
	for (var i = 0; i < balles.length; i++) {
		for (var j = 0; j< enemies.length; j++) {
			if (isColliding(balles[i].box,enemies[j].box)){enemies[j].life-=5;balles.splice(i,1);i--;}
		}
	}
	for (var i = 0; i < balles.length; i++) {
		for (var j = 0; j< wallTiles.length; j++) {
			if (isColliding(balles[i].box,wallTiles[j].box)){balles.splice(i,1);i--;}
		}
	}
	
	for (var i = 0; i < balles.length; i++) {
		for (var j = 0; j< groundTiles.length; j++) {
			if (isColliding(balles[i].box,groundTiles[j].box)){balles.splice(i,1);i--;}
		};
	}
	for (var i = 0; i < balles.length; i++) {
		for (var j = 0; j< platFormTiles.length; j++) {
			if (isColliding(balles[i].box,platFormTiles[j].box)){balles.splice(i,1);i--;}
		};
	};
	for (var i = platFormTiles.length - 1; i >= 0; i--) {
		platFormTiles[i].draw();
	};

	reward.draw();

	hero.draw();
	for(var i = enemies.length - 1; i >= 0; i--) {
			enemies[i].update();
			enemies[i].draw();
			if (enemies[i].life<=0) {enemies.splice(i,1);i--};
		};
	paralaxF();
	manageScore();
	displayHud();

	for (var i = debugCollision.length - 1; i >= 0; i--) {
		debugCollision[i].debugDraw();
	};
	hero.life-=0.005
}

