var express = require('express');
var app = express();
var plugins=[{app:"jarvis",type:"web",method:"sayhello",text:"hi jarvis"}];


app.use(express.bodyParser());


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

console.log('web server running!');