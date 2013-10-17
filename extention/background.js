function click(e){
	chrome.tabs.query({currentWindow:true,active:true},function(tabs){
		console.log("background.js :click");
		var specTab = tabs[0];
		chrome.tabs.insertCSS(specTab.id,{file:"wait.css"});
		chrome.tabs.executeScript(specTab.id,{file:"wait.js"});
		chrome.tabs.executeScript(specTab.id,{file:"jarvis.js"});
	});
}

chrome.browserAction.onClicked.addListener(click);