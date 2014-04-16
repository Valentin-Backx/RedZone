	var bg1X=0;//conteurctx;
	var bg2X=0;
	var bg1 = new Image();
	bg1.src = "resources/images/bg1.png";
	var bg2 = new Image();
	bg2.src = "resources/images/bg2.png";
function paralax (){
	var bgXV2 =0;
	var bgXV =0;
	if (oldheroX == hero.x){console.log("lol")}
		else if(parasinc == 1)
		{
			bgXV2-=((oldheroX)-hero.x)+1;
			bgXV-=((oldheroX)-hero.x)+8;
			if (bg2X <= conteurctx-bg2.width) {bg2X=0+conteurctx;}
			if (bg1X <= conteurctx-bg1.width) {bg1X=0+conteurctx;}
	console.log(parasinc)

		}
		else if(parasinc == -1)
		{
			bgXV2-=((oldheroX)-hero.x)-1;
			bgXV-=((oldheroX)-hero.x)-8;
			if (bg2X >= conteurctx+bg2.width) {bg2X=0+conteurctx;}
			if (bg1X >= conteurctx+bg1.width) {bg1X=0+conteurctx;}
	console.log(parasinc)

		}
	if (parasinc ==1 || parasinc==-1){parasinc=0};
	bg1X -=bgXV;
	bg2X -=bgXV2;
	context.drawImage(bg2,bg2X,0);
	context.drawImage(bg2,bg2X + bg2.width,0);
	context.drawImage(bg2,bg2X - bg2.width,0);
	context.drawImage(bg1,bg1X,0);
	context.drawImage(bg1,bg1X + bg1.width,0);
	context.drawImage(bg1,bg1X - bg1.width,0);	
}