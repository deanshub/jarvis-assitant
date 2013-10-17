var actions =null;

function init(){
	searchJarvisActions();
	activateJarvis();
	removeWaitIcon();
}

function removeWaitIcon(){
	var jarvisLoader = document.getElementById("circularG");
	document.body.removeChild(jarvisLoader);
}

function searchJarvisActions(){
	actions = document.getElementsByTagName("voice");

	for (var index=0; index < actions.length; index++){
		var currApp = window.location.href;
		currApp = currApp.replace('http://','');
		currApp = currApp.replace('www.','');
		currApp = currApp.replace('.com/*','');

		$.ajax({
			url:"http://localhost:1337/plugins",
			success:pluginLoaded,
			type:"POST",
			data:{
				app:currApp,
				type:"web",
				method:actions[index].getAttribute("method"),
				text:actions[index].textContent.replace(/\n+/g, '')}
		});
	}
}

function pluginLoaded(data, textStatus, jqXHR){
	console.log("plugin loaded");
}

function activateJarvis(){
	if (actions.length>0){
		//setInterval(function(){console.log("tick");},3000);
		$.getJSON("http://localhost:1337/actions").done(function(json){
			console.log(json);
			if (json.method != null){
				var activator = document.createElement("script");
				activator.innerHTML=json.method + '();';
				document.body.appendChild(activator);
			}
		});		
	}
}

init();