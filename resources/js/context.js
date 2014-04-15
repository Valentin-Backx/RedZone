var conteurctx = 0;
function mouvectx(){
	context.translate(oldheroX-hero.x, 0);
	conteurctx -= oldheroX-hero.x
	console.log(hero.x-oldheroX)

}
function savectx(){
	context.save()
}
function restctx(){
	context.restore()
}