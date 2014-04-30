/* 	jsEssentials - 
	Commonly used methods, so I turned them into a library.
	james@codeforcoffee.org
	Last updated: 4/29/14
	Released under the MIT license. Have fun.

	Visual Studio 2013 users: reference this file after jQuery.
/* 	-----------------------------------------------------------
*/

//	Environment
//
// 	array.last();
// 	Adds an array.last(); function
if (!Array.prototype.last) {
    Array.prototype.last = function() {
        return this[this.length - 1];
    };
};

// 	namespace jsEssentials
function jsEssentials() {
    //	sessionHandler
    //	Summary: Makes a calculated post to non CORS webserver to check for 
    //		session inactivity, and where to redirect them when it occurs.
    //		Will also attempt to keep current session alive until @endTime.
    //		The object checks for session state 
    //	@pingFrequency (int) 	- frequency of pings to webserver in seconds
    //	@endTime (int)			- duration of time to ping webserver in seconds
    //	@pathToPing (string)	- relative website URI to ping.
    //  @inactiveRedirectPath (string) 	- rURI to redirect user to if session is inactive.
    // 	Usage: 
    //	var x = new jsEssentials.sessionHandler(60, 360, '../path/to/ping', '../path/to/redirect');
    //	x.startTimer();
    //	x.stopTimer();
    //  --------------------------------------------------------------------------------------------
    var sessionHandler = function(pingFrequency, finalEndTime, pathToPing, inactiveRedirectPath) {
        var frequencyToPing = pingFrequency * 1000;
        var endTime = finalEndTime * 1000;
        var webserverPath = pathToPing;
        var redirectPath = inactiveRedirectPath;

        var startTimer = setInterval(function() {
            endTime = endTime - frequencyToPing;
            if (endTime <= 0) {
                actionUponTimeout();
                return;
            }
            pingAction();
        }, frequencyToPing);
        this.self = startTimer;

        this.stopTimer = function() {
            clearTimeout(this.self);
        }
        var pingAction = function() {
            $.ajax({
                type: "POST",
                url: webserverPath,
                success: function(data) {
                    console.log("Connection Pulse OK");
                },
                error: function(data) {
                    console.log("Err: " + data);
                    actionUponTimeout();
                }
            });
        }
        var actionUponTimeout = function() {
            window.location.replace(redirectPath);
        }
    }
    // postJSON	method
    // Summary: Posts JSON object to specified URI and returns success/error methods.
    // 		Helpful with Closures.
    // @jsonObject (object)		- JSON object to send to server
    // @serverURI (string)		- Server URI to POST JSON to
    // @successMethod			- method to call upon success
    // @errorMethod				- method to call upon error
    // Usage:
    // var y = new jsEssentials.postJSON(myObject, "../path/to/server", thisWorked, thisFailed);
    var postJSON = function(jsonObject, serverURI, successMethod, errorMethod) {
        $.ajax({
            type: "POST",
            url: serverURI,
            traditional: true,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(jsonObject),
            success: function(data) {
                successMethod();
            },
            error: function(err) {
                errorMethod();
            }
        });
    }
}