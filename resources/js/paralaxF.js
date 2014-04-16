	var fg1X=0;//conteurctx;
	var fg1 = new Image();
	fg1.src = "resources/images/foreground.png";
function paralaxF (){
	var fgXV =0;
	if(parasinc == -1)
	{
		fgXV-=((oldheroX)-hero.x)+1;
		if (fg1X <= conteurctx - fg1.width) {fg1X = 0 + conteurctx;}
	}
	else if(parasinc == 1)
	{
		fgXV-=((oldheroX)-hero.x)-1;
		if (fg1X >= conteurctx + fg1.width) {fg1X = 0 + conteurctx;}
	}
	if (parasinc == 1 || parasinc == -1){parasinc = 0};
	fg1X -= fgXV;
	context.drawImage(fg1,fg1X,canvasHeight-100);
	context.drawImage(fg1,fg1X + fg1.width*2,canvasHeight-100);
	context.drawImage(fg1,fg1X + fg1.width,canvasHeight-100);
	context.drawImage(fg1,fg1X - fg1.width,canvasHeight-100);
	context.drawImage(fg1,fg1X - fg1.width*2,canvasHeight-100);	
}