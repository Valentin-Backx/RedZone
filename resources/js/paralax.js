	var bg1X=0;//conteurctx;
	var bg2X=0;
	var bg1 = new Image();
	bg1.src = "resources/images/bg1.png";
	var bg2 = new Image();
	bg2.src = "resources/images/bg2.png";
function paralax (){
	var bgXV2 =0;
	var bgXV =0;
	if(parasinc == -1)
	{
		bgXV2-=((oldheroX)-hero.x)+10;
		bgXV-=((oldheroX)-hero.x)+5;
		if (bg2X <= conteurctx - bg2.width) {bg2X = 0 + conteurctx;}
		if (bg1X <= conteurctx - bg1.width) {bg1X = 0 + conteurctx;}
	}
	else if(parasinc == 1)
	{
		bgXV2-=((oldheroX)-hero.x)-10;
		bgXV-=((oldheroX)-hero.x)-5;
		if (bg2X >= conteurctx + bg2.width) {bg2X = 0 + conteurctx;}
		if (bg1X >= conteurctx + bg1.width) {bg1X = 0 + conteurctx;}
	}
	
	bg1X -= bgXV;
	bg2X -= bgXV2;
	context.drawImage(bg2,bg2X,0);
	context.drawImage(bg2,bg2X + bg2.width*2,0);
	context.drawImage(bg2,bg2X + bg2.width,0);
	context.drawImage(bg2,bg2X - bg2.width,0);
	context.drawImage(bg2,bg2X - bg2.width*2,0);
	context.drawImage(bg1,bg1X,0);
	context.drawImage(bg1,bg1X + bg1.width*2,0);
	context.drawImage(bg1,bg1X + bg1.width,0);
	context.drawImage(bg1,bg1X - bg1.width,0);
	context.drawImage(bg1,bg1X - bg1.width*2,0);	
}
	var fg1X=0;//conteurctx;
	var fg1 = new Image();
	fg1.src = "resources/images/foreground.png";
function paralaxF (){
	var fgXV =0;
	if(parasinc == -1)
	{
		fgXV-=((oldheroX)-hero.x)+1;
		if (fg1X <= conteurctx - fg1.width) {fg1X = 0 + conteurctx;}console.log("55")
	}
	else if(parasinc == 1)
	{
		fgXV-=((oldheroX)-hero.x)+1;
		if (fg1X >= conteurctx + fg1.width) {fg1X = 0 + conteurctx;}console.log("56")
	}
	if (parasinc == 1 || parasinc == -1){parasinc = 0};
	fg1X -= fgXV;
	context.drawImage(fg1,fg1X,canvasHeight-100);
	context.drawImage(fg1,fg1X + fg1.width*2,canvasHeight-100);
	context.drawImage(fg1,fg1X + fg1.width,canvasHeight-100);
	context.drawImage(fg1,fg1X - fg1.width,canvasHeight-100);
	context.drawImage(fg1,fg1X - fg1.width*2,canvasHeight-100);	
}