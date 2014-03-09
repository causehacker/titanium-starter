/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 * 
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *  
 */

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}


// This is a single context application with multiple windows in a stack
(function() {
	//std fn()
	Ti.include("/etc/version.js","/etc/functions.js","/etc/events.js","/etc/globals.js");
	
	//app specific
	Ti.include("/etc/_variables.js");

	// register a background service. this JS will run when the app is backgrounded
	var service = Ti.App.iOS.registerBackgroundService({url:'/etc/background.js'});

	var Window;
	if (isTablet) {
		Titanium.include('/etc/_images_tablet.js');
		Window = require('ui/tablet/ApplicationWindow');
	} else {
		Titanium.include('/etc/_images_handheld.js');
		Window = require('ui/handheld/ApplicationWindow');
	}

	new Window().open();
})();
