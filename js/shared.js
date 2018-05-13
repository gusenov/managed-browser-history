Date.prototype.yyyymmddhhmmss = function () {
	var yyyy = this.getFullYear(),
	    mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1),  // getMonth() is zero-based.
	    dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate(),
	    hh = this.getHours() < 10 ? "0" + this.getHours() : this.getHours(),
	    min = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes(),
	    ss = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
	return "".concat(yyyy + "-").concat(mm + "-").concat(dd + " ").concat(hh + ":").concat(min + ":").concat(ss);
};

function isBlank(str) {
	return (!str || /^\s*$/.test(str));
}

var ImpressionEnum = {
	"None":          0,
	"Dislike":       1, 
	"Like":          2,
	"Soppy":         3,
	"Fluffy":        4,
	"Borrrriiinnng": 5,
	"Lolz":          6,
	"Unputdownable": 7,
	"BeachBag":      8,
	"LovedUp":       9,
	"Worthwhile":   10,
	"LearntALot":   11,
	"HiddenDepths": 12,
	"LostOnMe":     13,
	"Spooky":       14,
	"UtterCrap":    15
}; Object.freeze(ImpressionEnum);

function getImpressionValue(i) {
	switch(i) {
		case ImpressionEnum.None:           return "oImpressionNone";
		case ImpressionEnum.Dislike:        return "oImpressionDislike";
		case ImpressionEnum.Like:           return "oImpressionLike";
		case ImpressionEnum.Soppy:          return "oImpressionSoppy";
		case ImpressionEnum.Fluffy:         return "oImpressionFluffy";
		case ImpressionEnum.Borrrriiinnng:  return "oImpressionBorrrriiinnng";
		case ImpressionEnum.Lolz:           return "oImpressionLOLZ";
		case ImpressionEnum.Unputdownable:  return "oImpressionUnputdownable";
		case ImpressionEnum.BeachBag:       return "oImpressionBeachBag";
		case ImpressionEnum.LovedUp:        return "oImpressionLovedUp";
		case ImpressionEnum.Worthwhile:     return "oImpressionWorthwhile";
		case ImpressionEnum.LearntALot:     return "oImpressionLearntALot";
		case ImpressionEnum.HiddenDepths:   return "oImpressionHiddenDepths";
		case ImpressionEnum.LostOnMe:       return "oImpressionLostOnMe";
		case ImpressionEnum.Spooky:         return "oImpressionSpooky";
		case ImpressionEnum.UtterCrap:      return "oImpressionUtterCrap";

		default: return "oImpressionNone";
	}
}

var StateEnum = {
	"None": 0,
	"ToRead": 1, 
	"CurrentlyReading": 2,
	"AlreadyRead": 3
}; Object.freeze(StateEnum);

function getStateValue(i) {
	switch(i) {
		case StateEnum.None:             return "oStateNone";
		case StateEnum.ToRead:           return "oStateToRead";
		case StateEnum.CurrentlyReading: return "oStateCurrentlyReading";
		case StateEnum.AlreadyRead:      return "oStateAlreadyRead";

		default:                         return "oStateNone";
	}
}
function getImpression(data)   { return data.hasOwnProperty("i") ? data.i : 0; }
function getState(data)        { return data.hasOwnProperty("s") ? data.s : StateEnum.None; }
function isBookmarked(data)    { return data.hasOwnProperty("b") ? data.b === 1 : false; }
function getTags(data)         { return data.hasOwnProperty("t") ? data.t : ""; }
function getComment(data)      { return data.hasOwnProperty("c") ? data.c : ""; }
function hasDateModified(data) { return data.hasOwnProperty("d") && data.d !== 0; }
function getDateModified(data) { return data.hasOwnProperty("d") ? new Date(data.d) : new Date(0); }
function getTitle(data)        { return data.hasOwnProperty("l") ? data.l : ""; }

function setPageActionIcon(tabId, isBookmarked, state) {
	var iconPath;

	switch(state) {
		case StateEnum.None:
			if (isBookmarked) {
				iconPath = "/images/icons/icons.iconarchive.com/icons/hopstarter/soft-scraps/16/Button-Blank-Blue-icon.png";
			} else {
				iconPath = "/images/icons/icons.iconarchive.com/icons/hopstarter/soft-scraps/16/Button-Blank-Gray-icon.png";
			}
			break;
		case StateEnum.ToRead:
			iconPath = "/images/icons/icons.iconarchive.com/icons/hopstarter/soft-scraps/16/Button-Blank-Green-icon.png";
			break;
		case StateEnum.CurrentlyReading:
			iconPath = "/images/icons/icons.iconarchive.com/icons/hopstarter/soft-scraps/16/Button-Blank-Yellow-icon.png";
			break;
		case StateEnum.AlreadyRead:
			iconPath = "/images/icons/icons.iconarchive.com/icons/hopstarter/soft-scraps/16/Button-Blank-Red-icon.png";
			break;
		default:
	}
	
	chrome.pageAction.setIcon({
		path: iconPath,
		tabId: tabId
	});
}

