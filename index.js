var port = 8080;
var http = require('http');
var $path = require("path");
var fs = require('fs');
var mimetype = require("./mimetype");

var atsys = {};

var allowHead = {
	"Access-Control-Allow-Orgin": "*",
	"Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, PATCH, DELETE",
	"Access-Control-Max-Age": 2592000, //30 days
	"Access-Control-Allow-Headers":"Orgin, X-Requested-With, Content-Type, Accept, Athorization"
};





function write(req, res, code, msg)
{
	var head = {
		"Content-Type": mimetype(".txt")
	};
	res.writeHead(code, head);
	res.write(msg);
	res.end();
}
http.createServer(function(req, res)
{
	//console.log("start");
	if(req.method === "OPTIONS")
	{
		res.writeHead(204, allowHead);
		res.end();
		return;
	}
	
	var url = decodeURI(req.url.toString());
	//console.log(url);
	
	
	if(url.startsWith("/@"))
	{
		//todo get from file html3deditor
		//sys[req.headers.systype](req.res);
		//sys[req.headers.systype](req, res);
		
		var at1 = url.indexOf(":");
		var att = url.substring(2, at1);
		//console.log("att");
		//console.log(att);
		if(atsys[att] == undefined)
		{
			atsys[att] = require("./" + att);
		}
		atsys[att](req, res);
		return;
	}
	
	
	if(url.endsWith("/"))url+="index.html";
	url=url.substring(1, url.length);
	if(!fs.existsSync(url))
	{
		write(req, res, 404, url + " Not Found!");
		return;
	}
	
	if(fs.statSync(url).isDirectory()) url +="/index.html";
	
	fs.stat(url, function(err, stat)
	{
		if(err)
		{
			write(req, res, 404, url + " Not Found!");
		}
		else
		{
			var range = req.headers.range;
			var fileSize = stat.size;
			var mtype = mimetype(url);
			//console.log(url);
			//console.log(`mime type: ${mtype}`);
			
			if(range)
			{
				var parts = range.replace(/bytes=/, "").split("-");
				var start = parseInt(parts[0], 10);
				var end = parts[1] ? parseInt(parts[1], 10): fileSize -1;
				var chunksize = (end-start) + 1;
				var file = fs.createReadStream(url, {start, end});
				var head = {
					"Content-Range": `bytes ${start}-${end}/${fileSize}`,
					"Accept-Ranges": "bytes",
					"Content-Length": chunksize,
					"Content-Type": mtype
				};
				res.writeHead(206, head);
				file.pipe(res);
			}
			else
			{
				var head = {
					"Content-Length": fileSize,
					"Content-Type": mtype
				};
				res.writeHead(200, head);
				fs.createReadStream(url).pipe(res);
			}
		}
		
		
	});
	
	
}).listen(port);



