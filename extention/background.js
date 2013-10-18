function click(e){
	chrome.tabs.query({currentWindow:true,active:true},function(tabs){
		var specTab = tabs[0];
		chrome.tabs.insertCSS(specTab.id,{file:"wait.css"});
		chrome.tabs.executeScript(specTab.id,{file:"wait.js"});
		chrome.tabs.executeScript(specTab.id,{file:"jquery-1.10.1.min.js"},function(){
			chrome.tabs.executeScript(specTab.id,{file:"jarvis.js"});
		});
	});
}

chrome.browserAction.onClicked.addListener(click);
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	console.log(changeInfo.url.indexOf('#'));
    if ((changeInfo.url != undefined) && (changeInfo.url.indexOf('#')==-1)){
	    click();
	}
});