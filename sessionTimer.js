// sessionTimer.js
// Javascript file to force a webserver to keep a session over; 
// also redirects to another action (via headers) at any given
// period of inactiity.
//
// Last edited 2014-24-3 by @code4coffee

// Below is sample code to include to create an instance of the timer 
// object on your page

$(document).ready(function ()
{
	document.ourTimer = new timer(60, 1200);
	var mouseDown = 0;
	document.body.onmousedown = function ()
	{
		document.ourTimer.stopTimer();
		document.ourTimer = new timer(60, 1200);
	}
});
// end sample


// This is our class
var timer = function (frequencyToPingInSeconds, endTimeInSeconds, pathToPing, inactiveRedirectPath)
{
	var frequencyToPing = frequencyToPingInSeconds * 1000;
	var endTime = endTimeInSeconds * 1000;
	var webserverPath = pathToPing;
	var redirectPath = inactiveRedirectPath;

	var startTimer = setInterval(function ()
	{
		endTime = endTime - frequencyToPing;
		if (endTime <= 0)
		{
			actionUponTimeout();
			return;
		}
		pingAction();
	}, frequencyToPing);
	this.self = startTimer;

	this.stopTimer = function ()
	{
		clearTimeout(this.self);
	}

	var pingAction = function ()
	{
		$.ajax({
			type: "POST",
			url: webserverPath,
			success: function (data)
			{
				console.log("Connection Pulse OK");
			},
			error: function (data)
			{
				console.log("Err: " + data);
				actionUponTimeout();
			}
		});
	}

	var actionUponTimeout = function ()
	{
		window.location.replace(redirectPath);
	}
}