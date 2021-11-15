var $path = require("path");
var fs = require('fs');
var StreamZip = require('./node_stream_zip.js');
var mimetype = require("./mimetype");

function write(req, res, code, msg)
{
	var head = {
		"Content-Type": mimetype(".txt")
	};
	res.writeHead(code, head);
	res.write(msg);
	res.end();
}


const removeallfilesdir = function(directoryPath)
{
	if(fs.existsSync(directoryPath))
	{
		if(fs.lstatSync(directoryPath).isDirectory())
		{
			fs.readdirSync(directoryPath).forEach((file, index)=>
			{
				const curPath = $path.join(directoryPath, file);
				if(fs.lstatSync(curPath).isDirectory())
				{
					removeallfilesdir(curPath);
				}
				else
				{
					fs.unlinkSync(curPath);
				}
			});
			fs.rmdirSync(directoryPath);
		}
		else
		{
			fs.unlinkSync(directoryPath);
		}
	}
}

var system = 
{
	writefile(req, res)
	{
		//checkout
		if(!fs.existsSync(req.headers.todir))
		{
			fs.mkdirSync(req.headers.todir, { resursive:true});
		}
		
		var fd = fs.openSync(req.headers.todir + req.headers.filename, "w");
		console.log(req);
		req.on('data', chunk =>
		{
			fs.writeSync(fd, chunk, 0, chunk.length);
		});
		req.on('end', ()=>
		{
			fs.closeSync(fd);
			write(req, res, 200, "Completed!");
		});
	},
	unzip(req, res)
	{
		var filename = req.headers.filename;
		var todir = req.headers.todir;
		(async () =>
		{
			const zip = new StreamZip.async({file: filename});
			const entriesCount = await zip.entriesCount;
			const extreacted = await zip.extract(null, todir);
			write(req, res, 200, "Completed!");
		})();
	},
	removeFile(req, res)
	{
		var filename = req.headers.filename;
		if(filename.startsWith(".")) filename = filename.replace(".", "");
		var atdir = __dirname;
		//atdir = atdir.split("\\").join("/");
		var fullpath = atdir + filename;
		console.log("at remove fullpath");
		console.log(fullpath);
		//fullpath = fullpath.split("/").join("\\");
		try 
		{
			
			removeallfilesdir(fullpath);
			//file removed
		} 
		catch(err) 
		{
			console.log("error:");
			console.log(err);
			write(req, res, 500, err);
		}
		console.log("done!");
		write(req, res, 200, "Completed!");
	},
	removeDir(req, res)
	{
		var filename = req.headers.filename;
		if(filename.startsWith(".")) filename = filename.replace(".", "");
		var atdir = __dirname;
		//atdir = atdir.split("\\").join("/");
		var fullpath = atdir + filename;
		console.log("at remove fullpath");
		console.log(fullpath);
		//fullpath = fullpath.split("/").join("\\");
		try 
		{
			
			removeallfilesdir(fullpath);
			//file removed
		} 
		catch(err) 
		{
			console.log("error:");
			console.log(err);
			write(req, res, 500, err);
		}
		console.log("done!");
		write(req, res, 200, "Completed!");
	},
	ls(req, res)
	{
		var path = req.headers.path;
		fs.readdir(path, (err, files)=>
		{
			if(err)
			{
				console.log("error");
				console.log(err);
				
				var head = {
				"Content-Type": mimetype(".json")
				};
				res.writeHead(200, head);
				res.write(JSON.stringify({
					error: err}));
				res.end();
				return;
			
			}
			var f = {};
			for(var i = 0; i < files.length; i++)
			{
				var stat = fs.statSync(path + files[i]);
				//console.log(JSON.stringify(stat));
				f[files[i]] = {
					path: path,
					isfile: stat.isFile(),
					isdir: stat.isDirectory(),
					ctime: stat.ctime,
					mtime: stat.mtime,
					size: stat.size
				};
				
				
			}
			
			
			var head = {
				"Content-Type": mimetype(".json")
			};
			res.writeHead(200, head);
			res.write(JSON.stringify(f));
			res.end();
			return;
		});
		
	}
};
function sys(req, res)
{
	system[req.headers.systype](req, res);
}

module.exports = sys;
