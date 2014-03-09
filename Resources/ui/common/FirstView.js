function initApp(e){

		// var MainWindow = require('ui/common/MainWindow');
		if (isTablet)
			var MainWindow = require('ui/tablet/MainWindow');
		else 
			var MainWindow = require('ui/handheld/MainWindow');

			
		//create component instance
		var main = Ti.UI.createWindow({
			backgroundColor:'#000000',
			statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT
		});

			
		//construct UI
		var args = Object;
		args.title = "Main";
		
		var mainWindow = new MainWindow(args).open({animated: false});
		
		//start the stream
		Ti.App.fireEvent("log_something", {"msg" : "hello from /ui/common/FirstView"});

		// save off current idle timer state
		var idleTimer = Ti.App.idleTimerDisabled;
		
		// while we're in this window don't let the app shutdown
		// when the screen is idle
		Ti.App.idleTimerDisabled = true;
		
		main.addEventListener('close',function(){
			Ti.API.info("window was closed, idleTimer reset to = "+idleTimer);
		
			// restore previous idle state when closed
			Ti.App.idleTimerDisabled = idleTimer;
		});
			
}

function firstRun(){
	
	//time to load the top level config
	xhr_cfg = Titanium.Network.createHTTPClient();
	xhr_cfg.open('GET',sys_api_config);
	xhr_cfg.onload = function(){
		
		//parse
		var cfg_json = JSON.parse(this.responseText);
		
		//assign
		sys_dothings 	= cfg_json.cfg[0].dothings;
		sys_domorethings 	= cfg_json.cfg[0].domorethings;
	
	};
	
	//make the loadup call
	//xhr_cfg.send();	//only commented for demo



	//user prefs, local db startup
	var db = Titanium.Database.open('data');
	//db.execute('DELETE FROM prefs');  
	db.execute('CREATE TABLE IF NOT EXISTS prefs (p_key TEXT, p_val TEXT, p_type TEXT)');

	var prefs = db.execute('SELECT * FROM prefs');
	
	//if none are found, we can set them up
	if(prefs.getRowCount() == 0){
		if(Ti.App.Properties.getBool('debug')) { Ti.API.info('::prefs - no rows found'); }
			
		//for example, we can setup a row stating the user has not accepted the T&Cs of your app

		if(Ti.App.Properties.getBool('debug')) { Ti.API.info('::prefs - inserting (pref_tc_accepted)' ); }
		db.execute('INSERT INTO prefs (p_key,p_val,p_type) VALUES(?,?,?)','pref_tc_accepted','false','bool');
			
	//otherwise, lets read them into the local session
	}else{
		if(Ti.App.Properties.getBool('debug')) { Ti.API.info('::prefs found'); }
		
		while (prefs.isValidRow()){

			var row_key = prefs.fieldByName('p_key');
			var row_val = prefs.fieldByName('p_val');
			
			//log them here
			if(Ti.App.Properties.getBool('debug')) { Ti.API.info('::prefs: '+ row_key + '-' + row_val); }
			
			//bool only for now
			Ti.App.Properties.setBool(row_key,row_val);
			prefs.next();

		}
			
	}
	
	prefs.close();
	db.close();

}



function initReg(e){
		var RegWindow = require('ui/common/RegWindow');
			
		//create component instance
		var main = Ti.UI.createWindow({
			backgroundColor:color_primary,
			statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT
		});
			
		//construct UI
		var args = Object;
		args.title = "Reg";
		
		var regWindow = new RegWindow(args).open({animated: true});
			
}



//FirstView Component Constructor
//here we can show a loading screen, handle all the startup tasks, check for registration, etc
function FirstView() {


	//create object instance, a parasitic subclass of Observable
	var view = Ti.UI.createView();

	//BACKGROUND Services
	// listen for a local notification event
	Ti.App.iOS.addEventListener('notification',function(e){
		Ti.API.info("local notification received: "+JSON.stringify(e));
	});

	// fired when an app resumes for suspension
	Ti.App.addEventListener('resume',function(e){
		Ti.API.info("app is resuming from the background");
	});
	Ti.App.addEventListener('resumed',function(e){
		Ti.API.info("app has resumed from the background");
		
		//a good time to ensure workers, listeners, API pooling, ads etc are triggered to RUM		
		Ti.App.Properties.setBool('workers_running',true);

	});

	Ti.App.addEventListener('pause',function(e){
		Ti.API.info("app was paused from the foreground");

		//a good time to ensure workers, listeners, API pooling, ads etc are triggered to SUSPEND		
		Ti.App.Properties.setBool('workers_running',false);
	});



	//fire the pre-flight stuff
	firstRun();

	
	//init the application
	//after a ton of testing I've found a slight delay helps trigger this properly @SDK 3.1.3
	setTimeout(function() {
		initApp(view);
	},10);


	return view;
}

module.exports = FirstView;

