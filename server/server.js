var express = require('express');
var s2t = require('googleS2T').s2t;
var fs = require('fs');
var spawn = require('child_process').spawn;
var app = express();

var plugins=[{app:"jarvis",type:"os",method:"C:\\Users\\Dean\\Downloads\\chrome-win32\\chrome.exe",text:"open browser"},
{app:"jarvis",type:"os",method:"C:\\Users\\Dean\\Downloads\\chrome-win32\\chrome.exe `http://localhost/demo/jarvisExample.htm",text:"demo"},
{app:"jarvis",type:"os",method:"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe `C:\\Users\\Dean\\Dropbox\\Success\\success.mp3", text:"listen to audiobook"},
{app:"jarvis",type:"os",method:"rundll32.exe`user32.dll,`LockWorkStation",text:"Jarvis I'm out"}];
var whatSheSaid = "";
var flacFiles=[];
var FLAC_FILES_DIR = "files/";


app.use(express.bodyParser());

app.get('/actions', function(req, res) {
	res.send(myNextAction());
});

app.get('/plugins', function(req, res) {
	res.send(findPlugin(null));
});

app.get('/plugins/:method', function(req, res) {
	console.log(req.params.method);
	res.send(findPlugin(req.params.method));
});

app.post('/plugins', function(req, res) {
	res.send(insertPlugin(req.body));
});

app.delete('/plugins/:app', function(req, res) {
	res.send(deleteAppPlugins(req.params.app));
});

app.put('/', function(req, res) {
	res.send('update');
});

app.listen(1337);


function findPlugin(pluginId){
	if (pluginId !=null) {
		// needs to be improved so that i can access the correct plugin like that:
		// plugins[pluginId]
		for(var index=0; index < plugins.length; index++) {
			if (pluginId== plugins[index].method){
				return  plugins[index];
			}
		}
	}else {
		return plugins;
	}
}

function insertPlugin(plugin){
	plugins.push(plugin);
	return "success!";
}

function deleteAppPlugins(appName){
	var index=0;
	while(index < plugins.length) {
		if (appName== plugins[index].app){
			console.log(index);
			plugins.splice(index,1);
		}else{
			index++;
		}
	}
}

function myNextAction(){
	for(var index=0; index < plugins.length; index++) {
		if(whatSheSaid.indexOf(plugins[index].text) != -1) {
			if (plugins[index].type.indexOf("web")!=-1) {
				return plugins[index];
			}else if (plugins[index].type.indexOf("os")!=-1){
				var args= plugins[index].method.split('`')
				if (args.length==3){
					spawn(args[0],[args[1], args[2]]);
				}else if (args.length==2){
					spawn(args[0],[args[1]]);
				}else if (args.length==1){
					spawn(args[0]);
				}
			}
			whatSheSaid="";
		}
	}
	return {};
}

function listen(){
	var hypotheses;
	fs.watch(FLAC_FILES_DIR, function (event, filename) {
	  if ((filename)&& (filename.length>5)  && (filename.indexOf(".flac")== filename.length -5) &&(event=="rename")) {
	    s2t([FLAC_FILES_DIR + filename],
		  true,
		  {lang:'en-US'},
		  function(err,ret){
		  	console.log("filename: " + filename + " event: " + event);
		  	//todo change to the what she said
		    console.log(JSON.stringify(ret));
		    if (ret){
			    hypotheses=ret[0].hypotheses[0];
			    if (hypotheses.confidence>0.5){
			    	whatSheSaid=hypotheses.utterance;
			    	myNextAction();
				}
			    // fs.unlink(filename, function(err){console.log(err);});
			}
		  }
		);
	  }
	});
}


console.log('web server running!');

app.configure(function(){
  app.use('/demo', express.static("..\\demosite"));
  // server.use(express.static(__dirname + '/public'));
});

listen();