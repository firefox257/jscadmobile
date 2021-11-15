
var _mimetype = {
	".txt": "text/plain",
	".html": "text/html",
	".htm": "text/html",
	".js": "text/javascript",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".png": "image/png",
	".mp3": "audio/mpeg",
	".mp4": "video/mp4",
	".svg": "image/svg+xml",
	".gltf": "model/gltf+json",
	".bin": "application/octet-stream",
	".css": "text/css",
	".hdr": "application/octet-stream",
	".json": "application/json"
	
};

function mimetype(url)
{
	var i = url.lastIndexOf(".");
	var tag = url.substring(i, url.length);
	//console.log("tag: " + tag);
	return _mimetype[tag];
}

module.exports = mimetype;
