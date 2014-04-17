function LevelParser () {
	
	this.platformA_0 = new Image();
	this.platformA_0.src = "resources/images/tiles/PlateformA_4_0.png";
	this.platformA_1 = new Image();
	this.platformA_1.src = "resources/images/tiles/PlateformA_4_1.png";
	this.platformA_2 = new Image();
	this.platformA_2.src = "resources/images/tiles/PlateformA_4_2.png";
	this.platformA_3 = new Image();
	this.platformA_3.src = "resources/images/tiles/PlateformA_4_3.png";

	this.platformB_0 = new Image();
	this.platformB_0.src = "resources/images/tiles/PlateformB_4_0.png";
	this.platformB_1 = new Image();
	this.platformB_1.src = "resources/images/tiles/PlateformB_4_1.png";
	this.platformB_2 = new Image();
	this.platformB_2.src = "resources/images/tiles/PlateformB_4_2.png";
	this.platformB_3 = new Image();
	this.platformB_3.src = "resources/images/tiles/PlateformB_4_3.png";

	this.platformC_0 = new Image();
	this.platformC_0.src = "resources/images/tiles/PlateformC_4_0.png";
	this.platformC_1 = new Image();
	this.platformC_1.src = "resources/images/tiles/PlateformC_4_1.png";
	this.platformC_2 = new Image();
	this.platformC_2.src = "resources/images/tiles/PlateformC_4_2.png";
	this.platformC_3 = new Image();
	this.platformC_3.src = "resources/images/tiles/PlateformC_4_3.png";

	this.wallA = new Image();
	this.wallA.src = "resources/images/tiles/wallA.png";
	this.wallB = new Image();
	this.wallB.src = "resources/images/tiles/wallB.png";
	this.wallC = new Image();
	this.wallC.src = "resources/images/tiles/wallC.png";

	this.enemyA = new Image();
	this.enemyA.src = "resources/images/monstrea.png";

	this.heroImage = new Image();
	this.heroImage.src = "resources/images/hero.png";

	this.sautFrappesImage = new Image();
	this.sautFrappesImage.src = "resources/images/saut+frappe.png";


	this.parseTiles = function  (level) {
		wallTiles = new Array();
		groundTiles = new Array();
		platFormTiles = new Array();
		enemies = new Array();

		for (var i = level.length - 1; i >= 0; i--) {
				for (var j = level[i].length - 1; j >= 0; j--) {
					switch(level[i][j])
					{
						case 2:
							wallTiles.push(new Tile(j * BASE_TILE_SIZE, i * BASE_TILE_SIZE,false));
							break;
						case 1:
							groundTiles.push(new Tile(j * BASE_TILE_SIZE, i * BASE_TILE_SIZE,false));
							// console.log("tile y: "+groundTiles[groundTiles.length-1].y);
							// console.log("tile box y: "+groundTiles[groundTiles.length-1].box.y);
							break;
						case "a3":
						case "a4":
						case "a5":
						case "a6":
						case "a7":
						case "a8":
						case "b3":
						case "b4":
						case "b5":
						case "b6":
						case "b7":
						case "b8":
						case "c3":
						case "c4":
						case "c5":
						case "c6":
						case "c7":
						case "c8":
							j -= this.parsePlatform(i,j,level[i][j]) - 1;
							break;
						case "x":
							hero = new Hero(j * BASE_TILE_SIZE, i * BASE_TILE_SIZE,this.heroImage,heroFrames,this.sautFrappesImage);
							break;
						case "z":
							this.parseEnemy(i,j);
							break;
						case "a2":
						case "b2":
						case "c2":
							this.parseWall(i,j,level[i][j]);
							break;
					}
				};
			};
	}

	this.parsePlatform = function(i,j,tile)
	{
		var platformSize = parseInt(tile[1]) - 2;
		var platformType = tile[0].toUpperCase();

		var nCurrentMiddleTiles = 0;

		//push first tile
		platFormTiles.push(new Tile(
			j * BASE_TILE_SIZE, i * BASE_TILE_SIZE,
			eval("this.platform"+platformType+"_3"),
			new Box(
				j * BASE_TILE_SIZE * ratio,
				i * BASE_TILE_SIZE * ratio + 47 * ratio , 
				BASE_TILE_SIZE * ratio, 
				43 * ratio 
				)
			)
		);

		// console.log("platformsize: "+platformSize);
		while(nCurrentMiddleTiles < platformSize - 2)
		{
			// console.log("eval: "+eval("this.platform"+platformType+"_"+(nCurrentMiddleTiles % 2 + 1)).width);

			// console.log("j: "+(j - nCurrentMiddleTiles - 1));
			// console.log(nCurrentMiddleTiles);
			
			var box =new Box(
						(j - nCurrentMiddleTiles - 1) * BASE_TILE_SIZE * ratio,
						i * BASE_TILE_SIZE * ratio + 47 * ratio,
						BASE_TILE_SIZE * ratio,
						43*ratio
					);

			var tile = new Tile(
					(j - nCurrentMiddleTiles - 1) * BASE_TILE_SIZE,
					i * BASE_TILE_SIZE,eval("this.platform"+platformType+"_"+((nCurrentMiddleTiles+1) % 2 + 1)),
					box
			);

			platFormTiles.push(tile);


			// console.log("tile.x: "+tile.x+" tile.y: "+tile.y+" tile.w: "+tile.w+" tile.h: "+tile.h);

			// nCurrentMiddleTiles % 2 + 1
			nCurrentMiddleTiles++;
		}
		platFormTiles.push(new Tile(
			(j - platformSize + 1) * BASE_TILE_SIZE,
			 i * BASE_TILE_SIZE,
			 eval("this.platform"+platformType+"_0"),
				new Box((j - platformSize + 1)* BASE_TILE_SIZE * ratio,i * BASE_TILE_SIZE * ratio + 47 * ratio , BASE_TILE_SIZE * ratio, 43 * ratio )
			 )
		);

		return platformSize;
	}

	this.parseEnemy = function(i,j) {
		var newEnemy = new Enemi(
			j * BASE_TILE_SIZE,
			i * BASE_TILE_SIZE,
			this.enemyA,
			monstreAFrames);
		
		enemies.push(newEnemy);
	}

	this.parseWall = function  (i,j,tile) {
		var wallType = tile[0].toUpperCase();

		wallTiles.push(new Tile(
				j * BASE_TILE_SIZE,
				i * BASE_TILE_SIZE,
				eval("this.wall"+wallType)
			));
	}
}