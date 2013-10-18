var express = require('express');
var app = express();
var plugins=[{app:"jarvis",type:"os",method:"C:\\Users\\Dean\\Downloads\\chrome-win32\\chrome.exe",text:"open browser"},
{app:"jarvis",type:"os",method:"C:\\Users\\Dean\\Downloads\\chrome-win32\\chrome.exe `http://localhost/demo/jarvisExample.htm",text:"run demo"},
{app:"jarvis",type:"os",method:"C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe `C:\\Users\\Dean\\Dropbox\\Success\\success.mp3", text:"listen to audiobook"},
{app:"jarvis",type:"os",method:"rundll32.exe`user32.dll,`LockWorkStation",text:"bye jarvis"}];
var whatSheSaid = "next slide";
var spawn = require('child_process').spawn;


app.use(express.bodyParser());

app.get('/actions', function(req, res) {
	spawn("soundrecorder",["/FILE", "C:\\git\\jarvis-assistant\\temp\\temp.wma", "/DURATION", "0000:00:03"]);
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
			if (plugins[index].type.indexOf("web")!=-1){
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

console.log('web server running!');