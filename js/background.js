function configPageAction(tabId) {
	chrome.tabs.get(tabId, function (tab) {
		if (!chrome.runtime.lastError) {
			chrome.pageAction.show(tabId);
			chrome.storage.local.get([tab.url], function (result) {
				if (result.hasOwnProperty(tab.url)) {
					setPageActionIcon(tabId, isBookmarked(result[tab.url]), getState(result[tab.url]));
				} else {
					setPageActionIcon(tabId, false, StateEnum.None);
				}
			});

		}
	});
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	configPageAction(tabId);
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
	configPageAction(activeInfo.tabId);
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	configPageAction(tabs[0].id);
});

function historyChangedCallback() {}

function migrateData() {
	var historyStorage = new WebStore(localStorage, 'link', historyChangedCallback),
	    links = historyStorage.getAllRecords(),
	    entries = {};
	for (var i = links.length - 1; i >= 0; i -= 1) {
		entries[links[i].url] = {
			d: links[i].cdate,
			l: links[i].title
		};
		historyStorage.deleteRecordById(links[i].id);
	}
	chrome.storage.local.set(entries);
}

chrome.runtime.onInstalled.addListener(function (details) {
	chrome.contextMenus.create({
		id: "cmShowAllBookmarks",
		title: "Show All Bookmarks...",
		contexts: [ "page_action" ]
	});

	if (details.reason.localeCompare("update") === 0
		&& details.previousVersion.localeCompare("0.0.0.6") === 0) {
		migrateData();
	}
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	switch (info.menuItemId) {
		case "cmShowAllBookmarks":
			chrome.tabs.create({ url: "/html/bookmarks.html" });
			break;
		default:
	}
});

