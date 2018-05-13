var bDeleteEntry, sImpression, sState, cbBookmark, bClosePopup, taTags, taComment;
	
function uiLocalization() {
	[
		"bDeleteEntry",

		"lImpression",
		"oImpressionNone",
		"oImpressionDislike",
		"oImpressionLike",
		"oImpressionSoppy",
		"oImpressionFluffy",
		"oImpressionBorrrriiinnng",
		"oImpressionLOLZ",
		"oImpressionUnputdownable",
		"oImpressionBeachBag",
		"oImpressionLovedUp",
		"oImpressionWorthwhile",
		"oImpressionLearntALot",
		"oImpressionHiddenDepths",
		"oImpressionLostOnMe",
		"oImpressionSpooky",
		"oImpressionUtterCrap",

		"lState", "oStateNone", "oStateToRead", "oStateCurrentlyReading", "oStateAlreadyRead",

		"lBookmark",

		"bClosePopup",

		"lTags",

		"lComment"
	].map(function (id) {
		document.getElementById(id).innerHTML = chrome.i18n.getMessage(id);
	});
}

var tabId;
var entry, entryKey, entryVal;

function restoreEntry() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		tabId = tabs[0].id;
		entryKey = tabs[0].url;
		chrome.storage.local.get([entryKey], function (result) {
			entry = result;
			if (entry.hasOwnProperty(entryKey)) {
				entryVal = entry[entryKey];
			} else {
				entry = {};
				entry[entryKey] = {};
				entryVal = entry[entryKey];
				entryVal.l = tabs[0].title;
			}
			
			sImpression.value = getImpressionValue(getImpression(entryVal));
			sState.value = getStateValue(getState(entryVal));
			cbBookmark.checked = isBookmarked(entryVal);
			taTags.value = getTags(entryVal);
			taComment.value = getComment(entryVal);
		});
	});
}

function removeEntry() {
	chrome.storage.local.remove([entryKey]);
}

function isNeedToDeleteEntry() {
	result = true;
	
	["b", "s", "i"].map(function (key) {
		if (entryVal.hasOwnProperty(key) && entryVal[key] !== 0) {
			result = false;
		}
	});
	
	["t", "c"].map(function (key) {
		if (entryVal.hasOwnProperty(key) && !isBlank(entryVal[key])) {
			result = false;
		}
	});
	
	return result;
}

function saveEntry() {
	if (isNeedToDeleteEntry()) {
		removeEntry();
	} else {
		entryVal.d = (new Date()).getTime();
		chrome.storage.local.set(entry);
	}
}

document.addEventListener("DOMContentLoaded", function (event) {
	bDeleteEntry = document.getElementById("bDeleteEntry"),
	sImpression = document.getElementById("sImpression"),
	sState = document.getElementById("sState"),
	cbBookmark = document.getElementById("cbBookmark"),
	bClosePopup = document.getElementById("bClosePopup"),
	taTags = document.getElementById("taTags"),
	taComment = document.getElementById("taComment");
	
	uiLocalization();
	
	restoreEntry();

	bDeleteEntry.onclick = function () {
		if (confirm(chrome.i18n.getMessage("confirmDeleteEntry"))) {
			removeEntry();
			window.close();
			setPageActionIcon(tabId, false, StateEnum.None);
		}
	};

	sImpression.onchange = function () {
		switch(sImpression.value) {
			case "oImpressionNone":          entryVal.i =  0; break;
			case "oImpressionDislike":       entryVal.i =  1; break;
			case "oImpressionLike":          entryVal.i =  2; break;
			case "oImpressionSoppy":         entryVal.i =  3; break;
			case "oImpressionFluffy":        entryVal.i =  4; break;
			case "oImpressionBorrrriiinnng": entryVal.i =  5; break;
			case "oImpressionLOLZ":          entryVal.i =  6; break;
			case "oImpressionUnputdownable": entryVal.i =  7; break;
			case "oImpressionBeachBag":      entryVal.i =  8; break;
			case "oImpressionLovedUp":       entryVal.i =  9; break;
			case "oImpressionWorthwhile":    entryVal.i = 10; break;
			case "oImpressionLearntALot":    entryVal.i = 11; break;
			case "oImpressionHiddenDepths":  entryVal.i = 12; break;
			case "oImpressionLostOnMe":      entryVal.i = 13; break;
			case "oImpressionSpooky":        entryVal.i = 14; break;
			case "oImpressionUtterCrap":     entryVal.i = 15; break;

			default:
		}
		saveEntry();
	};

	sState.onchange = function () {
		switch(sState.value) {
			case "oStateNone":             entryVal.s = 0; break;
			case "oStateToRead":           entryVal.s = 1; break;
			case "oStateCurrentlyReading": entryVal.s = 2; break;
			case "oStateAlreadyRead":      entryVal.s = 3; break;

			default:
		}
		setPageActionIcon(tabId, isBookmarked(entryVal), entryVal.s);
		saveEntry();
	};
	
	cbBookmark.onchange = function () {
		if (cbBookmark.checked) {
			entryVal.b = 1;
			setPageActionIcon(tabId, true, getState(entryVal));
		} else {
			entryVal.b = 0;
			setPageActionIcon(tabId, false, getState(entryVal));
		}
		saveEntry();
	};
	
	bClosePopup.onclick = function () {
		entryVal.t = taTags.value;
		entryVal.c = taComment.value;
		saveEntry();
		window.close();
	};
	
        taTags.addEventListener("keyup", function () { entryVal.t = this.value; saveEntry(); });
        taTags.addEventListener("paste", function () { entryVal.t = this.value; saveEntry(); });
        taTags.addEventListener("cut",   function () { entryVal.t = this.value; saveEntry(); });
        
        taComment.addEventListener("keyup", function () { entryVal.c = this.value; saveEntry(); });
        taComment.addEventListener("paste", function () { entryVal.c = this.value; saveEntry(); });
        taComment.addEventListener("cut",   function () { entryVal.c = this.value; saveEntry(); });

});

