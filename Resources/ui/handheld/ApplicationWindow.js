//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var FirstView = require('ui/common/FirstView');
		
	var options = {
			// backgroundColor:'#eeeeee',
			statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT
		};

	if(isTall){
		options.backgroundImage = img__bg_tall;
	}else{
		options.backgroundImage = img__bg_std;				
	}


	options.height = Titanium.Platform.displayCaps.platformHeight;
	options.width = Titanium.Platform.displayCaps.platformWidth;


	//create component instance
	var self = Ti.UI.createWindow(options);
		
	//construct UI
	var firstView = new FirstView();
	self.add(firstView);

	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
