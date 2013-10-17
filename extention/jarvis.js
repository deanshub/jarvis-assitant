var actions =null;

function removeWaitIcon(){
	var jarvisLoader = document.getElementById("circularG");
	document.body.removeChild(jarvisLoader);
}


function init(){
	console.log("jarvis.js init");
	searchJarvisActions();
	removeWaitIcon();
}

function searchJarvisActions(){
	actions = document.getElementsByTagName("voice");

	for (var index=0; index < actions.length; index++){
		console.log("method:" + actions[index].getAttribute("method"));
		console.log("is activated by saying:" + actions[index].innerText);
	}
}

init();