repo = "code4craft/blackhole"
timeIntervel = 300000
function check() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var text = xmlhttp.responseText
            var obj = JSON.parse(text);

            var oldStars = localStorage["stars"];
            var oldFolks = localStorage["forks"];
            if (obj.watchers_count > oldStars || obj.forks_count > oldFolks) {
                var title;
                var message;
                if (obj.watchers_count > oldStars) {
                    title= "New star!"
                    message = 'New star at ' + repo + '! '+ obj.watchers_count + ' stars now! '
                } else {
                    title= "New fork!"
                    message = 'New fork at ' + repo + '! '+ obj.forks_count + ' stars now! '
                }
                var notification = webkitNotifications.createNotification(
                    'https://secure.gravatar.com/avatar/4ce9123a05ae222d71d2857316cbe699?s=140&d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png',  // icon url - can be relative
                    title,
                    message
                );
                notification.onclick = function (x) {
                    localStorage["stars"] = obj.watchers_count;
                    localStorage["forks"] = obj.forks_count;
                    chrome.tabs.create({
                        url: "https://github.com/"
                    });
                    this.cancel();
                };
                notification.show();
            }
        }
    }
    xmlhttp.open("GET", "https://api.github.com/repos/" + repo, true);
    xmlhttp.send();
}
check()
setInterval(check, timeIntervel)