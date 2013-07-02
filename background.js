repo="code4craft/blackhole"
timeIntervel=300000
function check(){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    	var text=xmlhttp.responseText
    	var obj = JSON.parse(text);

    	var oldStars=localStorage["stars"];
    	var oldFolks=localStorage["forks"];
    	if (obj.watchers_count>oldStars || obj.forks_count>oldFolks){
    	
    	localStorage["stars"]=obj.watchers_count;
    	localStorage["forks"]=obj.forks_count;
    	var notification = webkitNotifications.createNotification(
  'https://secure.gravatar.com/avatar/4ce9123a05ae222d71d2857316cbe699?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png',  // icon url - can be relative
  'Github new star!',  // notification title
  'New star at '+repo+'! Now at '+obj.watchers_count+' stars and '+obj.forks_count + ' forks'  // notification body text
);
    	notification.onclick = function(x) { chrome.tabs.create({
    		url:"https://github.com/"+repo
    	});this.cancel(); };
notification.show();
	}
	}
   	}
  
xmlhttp.open("GET","https://api.github.com/repos/"+repo,true);
xmlhttp.send();
}
setInterval(check,timeIntervel)