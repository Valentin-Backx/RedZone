	var bg1X=0;//conteurctx;
	var fg1X=0;
	var bg2X=0;
	var bg3X=0;
	var bg1 = new Image();
	bg1.src = "resources/images/bg1.png";
	var bg2 = new Image();
	bg2.src = "resources/images/bg2.png";
	var bg3 = new Image();
	bg3.src = "resources/images/bg3.png";
	var fg1 = new Image();
	fg1.src = "resources/images/foreground.png";
function paralax (){
	var bgXV3 =0;
	var bgXV2 =0;
	var bgXV =0;
	if (oldheroX > hero.x){parasinc = -1};
	if (oldheroX < hero.x){parasinc = 1};
	if(parasinc == -1)
	{
		bgXV3=(oldheroX-hero.x)/100;
		bgXV2=((oldheroX)-hero.x)/8;
		bgXV=((oldheroX)-hero.x)/4;
	}
	else if(parasinc == 1)
	{
		bgXV3=(oldheroX-hero.x)/100;
		bgXV2=((oldheroX)-hero.x)/8;
		bgXV=((oldheroX)-hero.x)/4;
	}
	bg1X += bgXV;
	bg2X += bgXV2;
	bg3X += bgXV3;

	
var a=canvasWidth
	var b=canvasHeight
	
	context.drawImage(bg3,0,0,bg3.width,bg3.height,bg3X + a*8,0,a,b);
	context.drawImage(bg3,0,0,bg3.width,bg3.height,bg3X + a*7,0,a,b);
	context.drawImage(bg3,0,0,bg3.width,bg3.height,bg3X + a*6,0,a,b);
	context.drawImage(bg3,0,0,bg3.width,bg3.height,bg3X + a*5,0,a,b);
	context.drawImage(bg3,0,0,bg3.width,bg3.height,bg3X + a*4,0,a,b);
	context.drawImage(bg3,0,0,bg3.width,bg3.height,bg3X + a*3,0,a,b);
	context.drawImage(bg3,0,0,bg3.width,bg3.height,bg3X + a*2,0,a,b);
	context.drawImage(bg3,0,0,bg3.width,bg3.height,bg3X + a*1,0,a,b);
	context.drawImage(bg3,0,0,bg3.width,bg3.height,bg3X,0,a,b);
	context.drawImage(bg3,0,0,bg3.width,bg3.height,bg3X - a*1,0,a,b);
	context.drawImage(bg3,0,0,bg3.width,bg3.height,bg3X - a*2,0,a,b);
	
	context.drawImage(bg2,0,0,bg2.width,bg2.height,bg2X + a*8,0,a,b);
	context.drawImage(bg2,0,0,bg2.width,bg2.height,bg2X + a*7,0,a,b);
	context.drawImage(bg2,0,0,bg2.width,bg2.height,bg2X + a*6,0,a,b);
	context.drawImage(bg2,0,0,bg2.width,bg2.height,bg2X + a*5,0,a,b);
	context.drawImage(bg2,0,0,bg2.width,bg2.height,bg2X + a*4,0,a,b);
	context.drawImage(bg2,0,0,bg2.width,bg2.height,bg2X + a*3,0,a,b);
	context.drawImage(bg2,0,0,bg2.width,bg2.height,bg2X + a*2,0,a,b);
	context.drawImage(bg2,0,0,bg2.width,bg2.height,bg2X + a*1,0,a,b);
	context.drawImage(bg2,0,0,bg2.width,bg2.height,bg2X,0,a,b);
	context.drawImage(bg2,0,0,bg2.width,bg2.height,bg2X - a*1,0,a,b);
	context.drawImage(bg2,0,0,bg2.width,bg2.height,bg2X - a*2,0,a,b);

	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*19,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*18,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*17,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*16,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*15,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*14,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*13,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*12,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*11,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*10,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*9,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*8,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*7,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*6,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*5,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*4,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*3,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*2,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X + a*1,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X - a*1,0,a,b);
	context.drawImage(bg1,0,0,bg1.width,bg1.height,bg1X - a*2,0,a,b);	
}
	
function paralaxF (){
	var a=canvasWidth
	var b=canvasHeight/5
	var fgXV =0;
	if(parasinc == -1)
	{
		fgXV-=((oldheroX)-hero.x)*2;
		if (fg1X <= conteurctx - fg1.width) {fg1X = 0 + conteurctx;console.log("57")}
	}
	else if(parasinc == 1)
	{
		fgXV-=((oldheroX)-hero.x)*2;
		if (fg1X >= conteurctx + fg1.width) {fg1X = 0 + conteurctx;console.log("58")}
	}
	if (parasinc == 1 || parasinc == -1){parasinc = 0};
	fg1X -= fgXV;
		context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*30,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*29,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*28,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*27,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*26,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*25,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*24,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*23,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*22,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*21,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*20,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*19,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*18,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*17,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*16,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*15,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*14,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*13,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*12,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*11,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*10,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*9,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*8,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*7,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*6,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*5,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*4,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*3,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*2,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X + a*1,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X - a*1,b*4,a,b);
	context.drawImage(fg1,0,0,fg1.width,fg1.height,fg1X - a*2,b*4,a,b);
}