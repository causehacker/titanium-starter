//
// returns true if iphone/ipad and version is 3.2+
//

//render appropriate components based on the platform and form factor
var osname = Ti.Platform.osname,
	version = Ti.Platform.version,
	height = Ti.Platform.displayCaps.platformHeight,
	width = Ti.Platform.displayCaps.platformWidth;

var iOS7 = isiOS7Plus();
var theTop = iOS7 ? 20 : 0;

//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
//yourself what you consider a tablet form factor for android
var isIOS = (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad');
var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
var isTall = (osname === 'iphone' && (height > 480));


//utility functions
function isIPhone3_2_Plus()
{
	// add iphone specific tests
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0],10);
		var minor = parseInt(version[1],10);
		
		// can only test this support on a 3.2+ device
		if (major > 3 || (major == 3 && minor > 1))
		{
			return true;
		}
	}
	return false;
}

function isiOS4Plus()
{
	// add iphone specific tests
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0],10);
		
		// can only test this support on a 3.2+ device
		if (major >= 4)
		{
			return true;
		}
	}
	return false;
}

function isiOS6Plus()
{
	// add iphone specific tests
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0],10);
		
		// can only test this support on a 3.2+ device
		if (major >= 6)
		{
			return true;
		}
	}
	return false;

}

function isiOS7Plus()
{
	// add iphone specific tests
	if (Titanium.Platform.name == 'iPhone OS')
	{
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0],10);
		
		// can only test this support on a 3.2+ device
		if (major >= 7)
		{
			return true;
		}
	}
	return false;

}