	//
	//  When you open windows outside of tab groups, they are appear on top of either
	//  the current window or the current tab group.  These examples show you different ways
	//  to open windows outside of tab groups.
	//

function MainWindow(_args) {	
	
			var options = {
					// backgroundColor:'#eeeeee'
					statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT
				};

			//only one for tablet
			options.backgroundImage = img__bg_tablet;


			if (Ti.Platform.name == 'android') {
				options.navBarHidden = true;
			} else {
				options.height = Titanium.Platform.displayCaps.platformHeight;
				options.width = Titanium.Platform.displayCaps.platformWidth;
			}
			var w = Titanium.UI.createWindow(options);
			// var a = Titanium.UI.createAnimation();
// 		
			// // NOTE: good example of making dynamic platform height / width values
			// // iPad vs. iPhone vs Android etc.
			// if (isIOS) {
				// a.height = Ti.UI.FILL;
				// a.width = Ti.UI.FILL;
			// }else {
				// a.height = Titanium.Platform.displayCaps.platformHeight;
				// a.width = Titanium.Platform.displayCaps.platformWidth;
			// }
			// a.duration = 0;
		

	
			var hi = Titanium.UI.createLabel({
				color:'#000000',
				text:'Hi There, im the main window ('+ w.width +' x '+ w.height +')',
				top:10 + theTop,
				left:0,
				right:0,
				width:Titanium.UI.SIZE,
				height:Titanium.UI.SIZE,
				opacity:0
			});
			
			w.add(hi);
			hi.animate(anim_fadeIn);


			
			hi.addEventListener('click',function(e){
				Ti.App.fireEvent("log_something", "clicked hello");
			});
			
			w.open();

	return w;
};

module.exports = MainWindow;
