function JSONLoader(mapUrl) {

	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', mapUrl, true);
	var that = this;
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {

		// .open will NOT return a value but simply returns undefined in async mode so use a callback
		that.callback(xobj.responseText);

		}
	}
	xobj.send(null);
}

JSONLoader.prototype.callback = function(response) {	
	jsonresponse = JSON.parse(response);
	this.monstreAJson = jsonresponse;
};