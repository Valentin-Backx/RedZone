var conteurctx = 0;
function mouvectx(){
	context.translate(oldheroX-hero.x, 0);
	if (oldheroX-hero.x){conteurctx2=conteurctx -= oldheroX-hero.x;};
}
function savectx(){
	context.save()
}
function restctx(){
	context.restore();
	conteurctx = 0;
}