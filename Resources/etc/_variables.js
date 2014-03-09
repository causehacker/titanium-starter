
//PROPS
Ti.App.Properties.setBool('pref_tc_accepted',false);
Ti.App.Properties.setBool('stat_runads',true);

//set debug?
Ti.App.Properties.setBool('debug',true);
// if(Ti.App.Properties.getBool('debug')) { alert("debug on"); }

//settings
Ti.App.Properties.setString("var_to_remember1","val_to_remember1");
// if(Ti.App.Properties.getBool('debug')) { alert(Ti.App.Properties.getString("var_to_remember1")); }

//set user info to nothing
Ti.App.Properties.setString("user_email","");
Ti.App.Properties.setString("user_firstname","");
Ti.App.Properties.setString("user_zip","");

//app specific vars
var _ver = 1;
var _app = "my_app_name";

//failsafe vars
var sys_api_config		=	"https://api.cloud.io/"+_ver+"/api/config/";


//mixins
var anim_fadeIn = Titanium.UI.createAnimation({
	curve:Ti.UI.ANIMATION_CURVE_EASE_IN,
	opacity:1,
	duration:400
});

var anim_fadeOut = Titanium.UI.createAnimation({
	curve:Ti.UI.ANIMATION_CURVE_EASE_IN,
	opacity:0,
	duration:400
});

