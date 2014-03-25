// jQuery jQExtender.js
// Tested on jQuery 1.9.2+ with jQuery.cookie plugin
//
// Quick and easy commands for:
// * Showing
// * Hiding
// * Enabling
// * Disabling
// ...elements!
//
// Last updated 2014-24-3 by @code4coffee
// james@codeforcoffee.org
// Released under MIT license. Go wild.

function jQExtender(selector) {
	this.hideSelector = function(selector) {
	$(selector).css({ "display": "none",
			"visibility": "hidden" });
	}
	this.showSelector = function(selector) {
	$(selector).css({ "display": "inherit",
		"visibility": "visible" });
	}
	
	this.showSelectorsParent = function(selector) {
	$(selector).parent().css({ "display": "inherit",
		"visibility": "visible" });
	}
	this.checkAndSetCookie = function(cookieName, cookieText, timeLength) {
	if ($.cookie(cookieName) != cookieText) {
			s$.cookie(cookieName, cookieText, { expires: timeLength }); 
		}
	}
	this.updateSelectList = function(objToDependOn, objToUpdate, controller, ajaxVariable, dataReceived) {
    var ajaxValue = $(objToDependOn).val();
	    $.ajax({
	        url: controller + "?" + ajaxVariable + "=" + ajaxValue,
	        type: "POST",
	        data: ajaxValue,
	        success: function (data) {
	            $(objToUpdate).empty();
	            $.each(data, function (index, dataReceived) {
	                $(objToUpdate).append("<option value='" + dataReceived.Value + "'>" + dataReceived.Text + "</option>");
	            })
	        }
	    });
	}
}