var mongoose 		= require('mongoose');
var express 		= require('express');
var app 			= express();
var User       		= require('./models/user');
var JarvisPlugin 	=require('./models/jarvisplugin');


//TODO:create a better way to use userName
var userName="deanshub@gmail.com";

function initConfig(){
	dbHandle();

	app.use(express.bodyParser());

	// Configure routes
	app.configure(function(){
	  app.use('/demo', express.static("..\\demosite\\server\\pulbic"));
	});

	app.get('/jarvis/api/plugins', function(req, res) {
		findPluginsForUser(userName, res);
	});


	// configure server port
	app.listen(8081);

}

function dbHandle(){
	//db connection
	mongoose.connect('mongodb://localhost/jarvis');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function () {
	  		console.log("connected to the db!");
		});
}

function findPluginsForUser(userName, res){
	User.findOne({email:userName},function(err,user){
		JarvisPlugin.find({app:{$in:user.apps}},function(err, plugin){
			res.send(plugin);
		});
	});	
}

initConfig();