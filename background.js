repo="code4craft/blackhole"
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
  'fluidicon.png',  // icon url - can be relative
  'Github exciting!',  // notification title
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
setInterval(check(),3600000)