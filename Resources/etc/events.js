
Ti.App.addEventListener("log_something", function(e) {
	//log it here
    if(Ti.App.Properties.getBool('debug')) { Ti.API.info('LOG: '+JSON.stringify(e)); }
	
});




//iADS
iads = [];
Ti.App.Properties.setString("iad_status","none");

Ti.App.addEventListener("iAd", function(e) {

	var iad_status = Ti.App.Properties.getString("iad_status");
		 
	var t1 = Titanium.UI.createAnimation({bottom:0, duration:750, opacity:1.0});
	var t2 = Titanium.UI.createAnimation({bottom:-100, duration:750, opacity:1.0});

    if(Ti.App.Properties.getBool('debug')) { Ti.API.info('iAd status ('+iad_status+')'); }

	if(e.action == "load"){

		if(iad_status != "loaded"){

			Ti.App.Properties.setString("iad_status","loaded");
	        if(Ti.App.Properties.getBool('debug')) { Ti.API.info('iAd triggered - from: ' + e.from); }
		
			iads = null;
	
			if (parseFloat(Titanium.Platform.version) >= 3.2){
			iads = Ti.UI.iOS.createAdView({
			    width: 'auto',
			    height: 'auto',
			    bottom: -100,
			    borderColor: '#000000',
			    backgroundColor: '#000000',
			    opacity:0.0
			    });
			 
			    iads.addEventListener('load', function(){
			        iads.animate(t1);
			        if(Ti.App.Properties.getBool('debug')) { Ti.API.info('iAd loaded - from: ' + e.from); }
		        	Titanium.Analytics.userEvent('app.iadLoaded');
					Titanium.Flurry.logEvent('user', {ads:"iadLoaded"});
			    });
		
			    iads.addEventListener('action', function(){
			        if(Ti.App.Properties.getBool('debug')) { Ti.API.info('iAd clicked!'); }
		        	Titanium.Analytics.userEvent('app.iadClicked');
					Titanium.Flurry.logEvent('user', {ads:"iadClicked"});
			    });
		    
		 
		    win.add(iads);
		   }
	
		}
	
	
	}else if(e.action == "unload"){

		Ti.App.Properties.setString("iad_status","unloaded");
	    win.remove(iads);
	    iads = [];
	    
        if(Ti.App.Properties.getBool('debug')) { Ti.API.info('iAd unloaded - from: ' + e.from); }
	
	}else if(e.action == "toggleUp"){

		if(iad_status == "loaded"){
		
			setTimeout(function(){	
		        iads.animate(t1);
			},1000);

		}
		
        if(Ti.App.Properties.getBool('debug')) { Ti.API.info('iAd toggled up - from: ' + e.from); }
	
	
	}else if(e.action == "toggleDown"){

		if(iad_status == "loaded"){
	        iads.animate(t2);
		}
		
        if(Ti.App.Properties.getBool('debug')) { Ti.API.info('iAd toggled down - from: ' + e.from); }
	
	}
	
		

});