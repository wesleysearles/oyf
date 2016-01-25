/// function to adjust the height of the content box
function contentHeight(){
	var drums = document.getElementById("drums");
	var guitar = document.getElementById("guitar");
	var frame = document.getElementById("content");
	frame.style.height = "auto";
	var topdis = 234;
	var realdis = document.documentElement.clientHeight - topdis;
	//alert("frame dis"+frame.offsetHeight+" ="+realdis+"full distance");
	if(frame.offsetHeight < realdis){
		frame.style.height = (realdis - 15)+"px";
		guitar.style.height = 100+'%';
		drums.style.height = 100+'%';
	}else if(frame.offsetHeight >= realdis){
		frame.style.height = frame.offsetHeight;
		drums.style.height = (frame.offsetHeight + topdis)+"px";
		guitar.style.height = (frame.offsetHeight + topdis)+"px";
	}

}

var refreshrate = 100;

function refreshView(){
	setTimeout('contentHeight()', refreshrate);	
			
}
function init(){
  myFlashMovie = document.getElementById("mp3player");
  sideDivs();
}

function jsPlay(url, title){//js to flash function to tell the flash mp3 player what song to play
	if(myFlashMovie){
	myFlashMovie.outsideJS(url, title);		
	}
}

function sideDivs(){        
		var drums = document.getElementById("drums");
		var guitar = document.getElementById("guitar");
		if(!window.XMLHttpRequest || (document.documentElement.clientWidth < 1024)){
		drums.style.display = "none";
		guitar.style.display = "none";
	}else{
		drums.style.display = "block";
		guitar.style.display = "block";
	}
}

//ad a listener for the sid divs
if (window.addEventListener){
window.addEventListener("load", init, false);
window.addEventListener("resize", sideDivs, false);
}else if(window.attachEvent){
window.attachEvent("onload", init);
window.attachEvent("onresize", sideDivs);
}else{
window.onload=init;
window.onResize=sideDivs;
}