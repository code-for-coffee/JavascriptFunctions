/* 	jsEssentials - 
	Commonly used methods, so I turned them into a library.
	james@codeforcoffee.org
	Last updated: 5/6/14
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

    //  uploader
    //  Summary: Converts file list into base64 strings and uploads sync via webworker
    //      This keeps the UI thread from being bogged down.
    //  @inputElement (string)    - Selector (file input)
    //  @remoteServerURI (string)    - path to upload to
    //  @pathToWebWorker (string)    - path to webworker
    //  --------------------------------------------------------------------------------------------
    var uploader = function (inputElement, remoteServerURI, pathToWebWorker) {

        if (inputElement == null || inputElement === "") {
            throw new Error("jsEssentials Uploader: Invalid inputElementByID");
        }
        if (remoteServerURI == null || remoteServerURI === "") {
            throw new Error("jsEssentials Uploader: Invalid remoteServerURI");
        }
        if (!window.FileReader) {
            throw new Error("jsEssentials Uploader: Your browser does not support the FileReader object.");
        }
        if (!window.Worker) {
            throw new Error("jsEssentials Uploader: Your browser does not support the Web Worker object.");
        }

        this.fileCount = null;
        var fileCount = this.fileCount;
        this.files = [];
        var files = this.files;
        this.progressStatus = null;
        this.progressPercentage = null;
        this.filesToSendToWorker = {
            Content: null,
            Count: null,
            Server: remoteServerURI
        };
        var filesToSendToWorker = this.filesToSendToWorker;

        var w = new Worker(pathToWebWorker);
        var i = document.querySelector(inputElement);
        var p = document.querySelector(progressElement);

        w.onmessage = function (event) {
            console.log(event.data);
            if (event.data == 200) {
                // positive
            } else {
                //negative
            }
        }
        w.onerror = function (error) {
            throw new Error("jsEssentials Uploader: " + error);
        }

        this.initialize = function () {
            // return length
            fileCount = i.files.length;
            if (fileCount < 1) {
                throw new Error("jsEssentials Uploader: No files selected.");
            }
        };

        this.encodeFiles = function () {
            this.initialize();
            // read files as base64 and push into files[]
            for (var c = 0; c < i.files.length; c++) {
                // we have to create a new instance of the FileReader each time to keep this real-time
                var r = new FileReader();
                r.onload = function (event) {
                    try {
                        //console.log(event.target.result);
                        files.push(event.target.result);
                    } catch (ex) {
                        throw new Error("jsEssentials Uploader: " + ex);
                    }
                }
                var temp = i.files[c];
                r.readAsDataURL(temp);
            }
        };

        this.startUpload = function() {
            this.encodeFiles();
            //console.log(files);
            filesToSendToWorker.Content = files;
            filesToSendToWorker.Count = fileCount;
            try {
                w.postMessage(filesToSendToWorker);
            } catch (e) {
                throw new Error("jsEssentials Uploader: " + e);
            }
        }
    }
}