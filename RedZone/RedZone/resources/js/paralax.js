	var bg1X=0;//conteurctx;
	var fg1X=0;
	var bg2X=0;
	var bg3X=0;
	var bg0a = new Image();	bg0a.src = "resources/images/FOND/bg0a.png";
	var bg0b = new Image();	bg0b.src = "resources/images/FOND/bg0b.png";
	var bg1a = new Image();	bg1a.src = "resources/images/FOND/bg1a.png";
	var bg1b = new Image();	bg1b.src = "resources/images/FOND/bg1b.png";
	var bg1b2 = new Image();	bg1b2.src = "resources/images/FOND/bg1b2.png";
	var bg1c = new Image();	bg1c.src = "resources/images/FOND/bg1c.png";
	var bg2b = new Image();	bg2b.src = "resources/images/FOND/bg2b.png";
	var bg2c = new Image();	bg2c.src = "resources/images/FOND/bg2c.png";	
	var bg3a = new Image(); bg3a.src ="resources/images/FOND/bg3a.png";
	var bg3a2 = new Image(); bg3a2.src ="resources/images/FOND/bg3a2.png";
	var bg3b = new Image(); bg3b.src ="resources/images/FOND/bg3b.png";
	var bg3b2 = new Image(); bg3b2.src ="resources/images/FOND/bg3b2.png";
	var bg4a = new Image(); bg4a.src ="resources/images/FOND/bg4a.png";
	var bg4a2 = new Image(); bg4a2.src ="resources/images/FOND/bg4a2.png";
	var bg4b = new Image(); bg4b.src ="resources/images/FOND/bg4b.png";
	var bg4b2 = new Image(); bg4b2.src ="resources/images/FOND/bg4b2.png";
	var bg4c = new Image(); bg4c.src ="resources/images/FOND/bg4c.png";
	var bg4c2 = new Image(); bg4c2.src ="resources/images/FOND/bg4c2.png";
	var fg1a = new Image(); fg1a.src ="resources/images/FOND/fg1a.png";
	var fg1x = new Image(); fg1x.src ="resources/images/FOND/fg1x.png";
	var fg2x = new Image(); fg2x.src ="resources/images/FOND/fg2x.png";
	var fg3x = new Image(); fg3x.src ="resources/images/FOND/fg3x.png";
	var fg4x = new Image(); fg4x.src ="resources/images/FOND/fg4x.png";
	
	
function paralax (){
	var bgXV3 =0;
	var bgXV2 =0;
	var bgXV =0;
	if (oldheroX > hero.x){parasinc = -1};
	if (oldheroX < hero.x){parasinc = 1};
	if(parasinc == -1 && conteurctx < canvasWidth*46)
	{
		bgXV3=fgXV=(oldheroX-hero.x)/98;
		bgXV2=((oldheroX)-hero.x)/99;
		bgXV=((oldheroX)-hero.x)/100;
	}
	if(parasinc ==  1&& conteurctx < canvasWidth*46)
	{
		bgXV3=fgXV=(oldheroX-hero.x)/98;
		bgXV2=((oldheroX)-hero.x)/99;
		bgXV=((oldheroX)-hero.x)/100;
	}
	if (parasinc <0||parasinc>0) {parasinc=0};
	if (conteurctx >= canvasWidth*46) {fgXV=bgXV=bgXV2=bgXV3=0};
	
	bg1X 	+= 	bgXV;
	bg2X 	+= 	bgXV2;
	bg3X 	+= 	bgXV3;
	var a	=	canvasWidth;
	var b 	=	canvasHeight;
	context.drawImage(bg0b,0,0,bg0b.width,bg0b.height,conteurctx,0,a,b);
	
	if (conteurctx<canvasWidth*14){context.drawImage(bg0a,0,0,bg0a.width,bg0a.height,conteurctx,0,a,b);}
		else{context.drawImage(bg0a,0,0,bg0a.width,bg0a.height,canvasWidth*14,0,a,b)};

	var boby1 =[-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,];
		for(var i=0;i<boby1.length;i++){if (bg1X+a*boby1[i]>hero.x-2800&&bg1X+a*boby1[i]<hero.x+2500){context.drawImage(bg1a,0,0,bg1a.width,bg1a.height,bg1X+a*boby1[i],0,a,b)};};
	var boby11 =[15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47];
		for(var i=0;i<boby11.length;i++){if (bg1X+a*boby11[i]>hero.x-2800&&bg1X+a*boby11[i]<hero.x+2500){context.drawImage(bg1b,0,0,bg1b.width,bg1b.height,bg1X+a*boby11[i],0,a,b)};};
	var boby111=[48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,67,68,69];
		for(var i=0;i<boby111.length;i++){if (bg1X+a*boby111[i]>hero.x-2800&&bg1X+a*boby111[i]<hero.x+2500){context.drawImage(bg1c,0,0,bg1c.width,bg1c.height,bg1X+a*boby111[i],0,a,b)};};
		context.drawImage(bg1b2,0,0,bg1b2.width,bg1b2.height,bg1X+a*48,0,a,b)
	


	var boby22 =[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41];
		for(var i=0;i<boby22.length;i++){if (bg1X+a*boby22[i]>hero.x-2800&&bg1X+a*boby22[i]<hero.x+2500){context.drawImage(bg2b,0,0,bg2b.width,bg2b.height,bg2X+a*boby22[i],0,a,b)}};
		var tabl33 = [-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]
		var tabl3 =[bg3a,bg3a,bg3a,bg3a,bg3a,bg3a,bg3a,bg3a,bg3a,bg3a,bg3a,bg3a,bg3a,bg3a,bg3a,bg3a2,bg3b2,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg3b,bg2c,bg2c,bg2c,bg2c,bg2c,bg2c,bg2c,bg2c,bg2c,bg2c,bg2c,bg2c,bg2c]
		for(var i=0;i<tabl33.length;i++){if (bg1X+a*tabl33[i]>hero.x-2800&&bg1X+a*tabl33[i]<hero.x+2500){context.drawImage(tabl3[i],0,0,tabl3[i].width,tabl3[i].height,bg3X+a*tabl33[i],0,a,b)}};


		var tabl44 = [-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]
		var tabl4 = [bg4a,bg4a,bg4a,bg4a,bg4a,bg4a,bg4a,bg4a,bg4a,bg4a,bg4a,bg4a,bg4a,bg4a,bg4a,bg4a2,bg4b2,bg4b,bg4b,bg4b,bg4b,bg4b,bg4b,bg4b,bg4b,bg4b,bg4b,bg4b,bg4b,bg4b,bg4b,bg4b,bg4b,bg4b,bg4b,bg4b,bg4b,bg4c2,bg4c,bg4c,bg4c,bg4c,bg4c,bg4c,bg4c,bg4c,bg4c,bg4c,bg4c,bg4c,bg4c]
		for(var i=0;i<tabl44.length;i++){	if (bg1X+a*tabl44[i]>hero.x-2800&&bg1X+a*tabl44[i]<hero.x+2500){context.drawImage(tabl4[i],0,0,tabl4[i].width,tabl4[i].height,bg3X+a*tabl44[i],0,a,b)}};
			context.drawImage(wall,0,0,wall.width,wall.height,-wall.width/2,0,canvasWidth,canvasHeight);
}	
function paralaxF (){
	var fgXV =0;
	if (oldheroX > hero.x){parasinc = -1};
	if (oldheroX < hero.x){parasinc = 1};
	if(parasinc == -1 && conteurctx < canvasWidth*46)
	{
		fgXV=(oldheroX-hero.x)/100;
	}
	if(parasinc ==  1&& conteurctx < canvasWidth*46)
	{
		fgXV=(oldheroX-hero.x)/100;
	}
	if (parasinc <0||parasinc>0) {parasinc=0};
	if (conteurctx < canvasWidth*46) {fgXV=0};
	fg1X 	+= 	fgXV
	var a	=	canvasWidth;
	var b 	=	canvasHeight;
	var boby3 =	[-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
		for (var i=0;i<boby3.length;i++){context.drawImage(fg1a,0,0,fg1a.width,fg1a.height,fg1X+a*boby3[i],0,a,b);};
}