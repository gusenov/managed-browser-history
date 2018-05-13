function br(parent) {
	parent.appendChild(document.createElement("br"));
}

function td(tr) {
	var cell = document.createElement("td");
	tr.appendChild(cell);
	return cell;
}

function link(title, url) {
	var div = document.createElement("div");
	var a = document.createElement("a");
	a.setAttribute("href", url);
	div.classList.add("cut-text");
	if (isBlank(title)) { title = url; }
	a.appendChild(document.createTextNode(title));
	div.appendChild(a);
	return div;
}

function clipText(text) {
	var div = document.createElement("div");
	div.classList.add("cut-text");
	div.appendChild(document.createTextNode(text));
	return div;
}

function createRow(bookmark) {
	var tr, div, a;
	tr = document.createElement("tr");
	
	var dateModified = (hasDateModified(bookmark.info)) ? getDateModified(bookmark.info).yyyymmddhhmmss() : "";
	td(tr).appendChild(document.createTextNode(dateModified));
	
	div = document.createElement("div");
	div.appendChild(link(getTitle(bookmark.info), bookmark.url));
	var tags = getTags(bookmark.info);
	if (!isBlank(tags)) { div.appendChild( clipText("tags: " + tags) ); }
	br(div);
	var comment = getComment(bookmark.info);
	if (!isBlank(comment)) { div.appendChild( clipText("comment: " + comment) ); }
	td(tr).appendChild(div);
	
	td(tr).appendChild(document.createTextNode(isBookmarked(bookmark.info) ? "\u2705" : "" ));
	
	var stateVal = getState(bookmark.info); 
	td(tr).appendChild(document.createTextNode(stateVal !== StateEnum.None ? chrome.i18n.getMessage(getStateValue(stateVal)) : ""));
	
	var impressionVal = getImpression(bookmark.info);
	td(tr).appendChild(document.createTextNode(impressionVal !== ImpressionEnum.None ? chrome.i18n.getMessage(getImpressionValue(impressionVal)) : ""));
	
	return tr;
}

document.addEventListener("DOMContentLoaded", function () {
	chrome.storage.local.get(null, function (entireContentsOfStorage) {
		var arrBookmarks = new Array();
		for (var url in entireContentsOfStorage) {
			arrBookmarks.push({
				"url": url,
				"info": entireContentsOfStorage[url]
			});
		}
		
		arrBookmarks.sort(function (a, b) {
			return getDateModified(b.info) - getDateModified(a.info);
		});
		
		var tbody = document.getElementById("tbodyBookmarks");
		var bookmarksCount = arrBookmarks.length;
		for (var i = 0; i < bookmarksCount; i++) {
			tbody.appendChild(createRow(arrBookmarks[i]));
		}
	});
});
