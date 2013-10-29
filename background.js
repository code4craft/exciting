repo = "code4craft/webmagic"
timeIntervelIdle = 300000
timeIntervelBusy = 30000
timeIntervel = timeIntervelIdle
function check() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var text = xmlhttp.responseText
            var obj = JSON.parse(text);

            var oldStars = localStorage["stars"];
            var oldFolks = localStorage["forks"];
            if (oldStars ==null || oldFolks==null || obj.watchers_count > oldStars || obj.forks_count > oldFolks) {
                intervalBusy = setInterval(show, timeIntervelBusy);
                function show(){
                    var title;
                    var message;
                    if (obj.watchers_count > oldStars) {
                        title= "New star!"
                        message = 'New star at ' + repo + '! '+ obj.watchers_count + ' stars now! '
                    } else {
                        title= "New fork!"
                        message = 'New fork at ' + repo + '! '+ obj.forks_count + ' forks now! '
                    }
                    localStorage["stars"] = obj.watchers_count;
                    localStorage["forks"] = obj.forks_count;
                    var notification = webkitNotifications.createNotification(
                        './fluidicon.png',  // icon url - can be relative
                        title,
                        message
                    );
                    notification.onclick = function (x) {
                        chrome.tabs.create({
                            url: "https://github.com/"
                        });
                        clearInterval(intervalBusy);
                        this.cancel();
                    };
                    notification.show();
                }
                show()
            }
        }
    }
    xmlhttp.open("GET", "https://api.github.com/repos/" + repo, true);
    xmlhttp.send();
}
check();
setInterval(check, timeIntervel)