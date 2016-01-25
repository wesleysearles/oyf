// loadinnerhtml

function newXMLHttpRequest () {
	var httpRequest = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		httpRequest = new XMLHttpRequest();
		if (httpRequest.overrideMimeType) {
			httpRequest.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	return httpRequest;
}

function loadInnerHTML (elementId, fileName) { 
	var req = newXMLHttpRequest();
	if (req) { 
		req.onreadystatechange = function() { 
			if (req.readyState == 4 && (req.status == 200 || req.status == 304)) {
				contentHeight();
				var fileExtension = fileName.substring(fileName.lastIndexOf("."));
				if (fileExtension == '.js') {
					// this .js? sweet. eval the lot!
					eval (req.responseText);
				} else {
					// no .js extension? no problem! let's get our hands dirty
					var el = document.getElementById(elementId);
					var head = document.getElementsByTagName("head")[0];
					var re = /<script(\b[\s\S]*?)>([\s\S]*?)<\//ig;
					var match;
					// loop through script tags
					while (match = re.exec(req.responseText)) {
						// generate new script element
						var script = document.createElement('script');
						script.type = 'text/javascript';
						script.defer = 'true';
						// check for src property in this script tag
						var reSrc = /src="([\s\S]*?)"/ig;
						var strSrc = reSrc.exec(match[1]);
						if (strSrc != null) {
							// set js file url as src property
							script.src = strSrc[1];
						} else {
							// OR write js code between script tags
							script.text=match[2];
						}
						// add to DOM
						head.appendChild(script);
					}
					// todo: clear script tags and code from req.responseText first
					el.innerHTML = req.responseText;
				}
				contentHeight();//update the height once the states changed
				refreshView();
			} 
		}; 
		req.open('POST', fileName); 
		req.send(null);
	} 
	//alert("ready state = "+req.readyState);
	//refreshView();
} 

function clearInnerHTML (elementId) { 
	var el = document.getElementById(elementId); 
	el.innerHTML = '';
}