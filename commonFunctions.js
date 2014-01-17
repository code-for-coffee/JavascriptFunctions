// Function extensions
// -------------------------------------------------------------------

// Adds an array.last(); function
if (!Array.prototype.last) {
	Array.prototype.last = function () {
		return this[this.length - 1];
	};
};

// DOM manipulation
// Requires jQuery
// -------------------------------------------------------------------
function hideSelector(selector) {
	$(selector).css({ "display": "none",
		"visibility": "hidden"
	});
}
function showSelector(selector) {
	$(selector).css({ "display": "inherit",
		"visibility": "visible"
	});
}
function showSelectorsParent(selector) {
	$(selector).parent().css({ "display": "inherit",
		"visibility": "visible"
	});
}

// Cookie
// Requires jQuery.Cookie
// -------------------------------------------------------------------
function setCookieIfThereIsNotOne() {
	if ($.cookie("CentradQDS") != "First Visit") {
		showSelector("#firstUse");
	} else {
		hideSelector("#firstUse");
	}
	$.cookie("CentradQDS", "First Visit", { expires: 365 });
}