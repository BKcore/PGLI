var static = require('node-static'),
  http = require('http'),
  util = require('util'),
  url = require("url");
  fs = require('fs');

var webroot = './',
  port = 8080;

var file = new(static.Server)(webroot, {
  cache: false
});

http.createServer(function(req, res) {


  	if (req.method == 'POST') {
	    console.log("[200] " + req.method + " to " + req.url);
	    console.log("POST REQUEST HANDLED!")

	    var data = "";
	      
	    req.on('data', function(chunk) {
	      console.log("Received body data:");
	      data += chunk;
	      var jsonFile = JSON.parse(data);
		  fs.writeFile(jsonFile.file, JSON.stringify(jsonFile.obj ,null, 4), function (err) {
			  if (err) return console.log(err);
			  console.log('ok');
			  });
	    });

	    req.on('end', function() {
		      // empty 200 OK response for now
		      res.writeHead(200, "OK", {'Content-Type': 'text/html', 'Cache-Control': 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'});
		      console.log("received");
		      res.write("END");
		      res.end();
	    });
	}
	else
	{
		req.on("end", function() {

		    file.serve(req, res, function(err, result) {
			    try{
			      if (err) {
			        console.error('Error serving %s - %s', req.url, err.message);
			        if (err.status === 404 || err.status === 500) {
			          file.serveFile(util.format('/%d.html', err.status), err.status, {}, req, res);
			        } else {
			        	err.headers['Cache-Control'] = 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0';
					    res.writeHead(err.status, err.headers);
					    res.end();
			        }
			      } else {
			        console.log('%s - %s', req.url, res.message);
			      }
			    }catch(e){ console.log('Header set fail (2).'); }
		    });
			
		});
	}

}).listen(port);
console.log('node-static running at http://localhost:%d', port);