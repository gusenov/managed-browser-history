/*jslint browser: true, devel: true, nomen: true */

(function () {
    'use strict';
    
    // https://stackoverflow.com/a/9310752/2289640
    function escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
    
    function historyChangedCallback() {
        // Do nothing.
    }
    
    var historyStorage = new WebStore(localStorage, 'link', historyChangedCallback),
        lastTabId = 0;

    chrome.contextMenus.removeAll();
    
    chrome.contextMenus.create({
        title: "Show Saved History...",
        contexts: ["page_action"],
        onclick: function () {
            chrome.tabs.create({ url: '/index.html' });
        }
    });
    
    function disableIcon(tabId) {
        chrome.pageAction.setIcon({ path: "images/History-Folder-Graphite-icon_16.png", tabId: tabId });
    }
    
    function enableIcon(tabId) {
        chrome.pageAction.setIcon({ path: "images/History-Folder-Sakura-icon_16.png", tabId: tabId });
    }
    
    function deleteSelectedPageFromHistory() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var recIdx = historyStorage.find("url", escapeRegExp(tabs[0].url));
            if (recIdx !== -1) {
                historyStorage.deleteRecordByIndex(recIdx);
                disableIcon(tabs[0].id);
            }
        });
    }
    
    chrome.contextMenus.create({
        title: "Delete this Page from History",
        contexts: ["page_action"],
        onclick: function () {
            deleteSelectedPageFromHistory();
        }
    });

    function showToolbarButton(tab) {
        if (tab) {
            lastTabId = tab.id;
            chrome.pageAction.show(lastTabId);
            if (historyStorage.find("url", escapeRegExp(tab.url)) !== -1) {
                enableIcon(tab.id);
            } else {
                disableIcon(tab.id);
            }
        }
    }
    
    // Fires when the active tab in a window changes. 
    // Note that the tab's URL may not be set at the time this event fired, but you can listen to onUpdated events to be notified when a URL is set.
    // https://developer.chrome.com/extensions/tabs#event-onActivated
    chrome.tabs.onActivated.addListener(function (activeInfo) {
        setTimeout(function () {
            chrome.tabs.get(activeInfo.tabId, function (tab) {
                showToolbarButton(tab);
            });
        }, 200);
    });
    
    // Fired when a tab is updated.
    // https://developer.chrome.com/extensions/tabs#event-onUpdated
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        showToolbarButton(tab);
    });

    // Fired when a page action icon is clicked. This event will not fire if the page action has a popup.
    // https://developer.chrome.com/extensions/pageAction#event-onClicked
    chrome.pageAction.onClicked.addListener(function (tab) {
        // chrome.extension.getBackgroundPage().console.log(tab);
        
        var nowDate = (new Date()).getTime(),
            page,
            pageIdx;
        
        pageIdx = historyStorage.find("url", escapeRegExp(tab.url));
        if (pageIdx !== -1) {
            // chrome.extension.getBackgroundPage().console.log('Exists.');
            page = historyStorage.getRecordByIndex(pageIdx);
            page.udate = nowDate;
            page.title = tab.title;
            historyStorage.updateRecord(page);
        } else {
            // chrome.extension.getBackgroundPage().console.log('Not exists');
            page = historyStorage.createRecord({
                url: tab.url,
                title: tab.title,
                cdate: nowDate,
                udate: nowDate
            });
            enableIcon(tab.id);
        }
    });
    
    // Gets all tabs that have the specified properties, or all tabs if no properties are specified.
    // https://developer.chrome.com/extensions/tabs#method-query
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        showToolbarButton(tabs[0]);
    });
}());
