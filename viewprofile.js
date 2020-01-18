var thisUser = null;

if (getParameterByName("user") == null) {
    window.location.href = "index.html";
} else {
    thisUser = getParameterByName("user");
}

$(function() {
    firebase.database().ref("/users/" + thisUser).once("value").then(function(snapshot) {
        var username = snapshot.val().username;
        var accountPic = snapshot.val().accountPic;
        var bio = snapshot.val().bio;
        var social = snapshot.val().social;
        var status = snapshot.val().status;
    
        if (status === undefined) {status = "Member";}
    
        $(".usernameView").text(username);
        $(".accountPicView").attr("src", accountPic);
        $("#bioView").html(bio);
        $(".statusView").text(status);
    
        $("#bioFrameView").attr("src", "data:text/html;base64," + btoa("<style>* {font-family: 'Roboto', Helvetica, Arial, sans-serif;} a {color: #00b0f0;} button {width: 100px;font-family: 'Roboto', Helvetica, Arial, sans-serif;background-color: #00b0f0;color: white;border-radius: 10px;-webkit-border-radius: 10px;-moz-border-radius: 10px;-o-border-radius: 10px;border: none;padding: 10px;outline: none;}</style>" + bio));
    
        $("#socialsView").html("");
    
        if (social.scratch != null && social.scratch != "") {
            $("<a target='_blank' class='socialBadge scratch'>")
                .attr("href", social.scratch)
                .text("Scratch")
                .appendTo("#socialsView")
            ;
        }
    
        if (social.yt != null && social.yt != "") {
            $("<a target='_blank' class='socialBadge yt'>")
                .attr("href", social.yt)
                .text("YouTube")
                .appendTo("#socialsView")
            ;
        }
    
        if (social.github != null && social.github != "") {
            $("<a target='_blank' class='socialBadge github'>")
                .attr("href", social.github)
                .text("GitHub")
                .appendTo("#socialsView")
            ;
        }
    
        if (social.web != null && social.web != "") {
            $("<a target='_blank' class='socialBadge web'>")
                .attr("href", social.scratch)
                .text("Website")
                .appendTo("#socialsView")
            ;
        }
    });
});

$(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user && user.uid != null) {
            firebase.database().ref("/users/" + currentUid + "/awards").once("value").then(function(snapshot) {
                if (snapshot.val() != null) {
                    $(".awardsView").text("Awards:");
    
                    for (var award = 0; award < snapshot.val().length; award++) {
                        $("<div class='award'>")
                            .text(snapshot.val()[award].awardName)
                            .css({
                                "background-color": snapshot.val()[award].backColor,
                                "color": snapshot.val()[award].textColor
                            })
                            .click(function() {
                                window.location.href = "https://nixe-hub.github.io/aboutawards.html#" + snapshot.val()[award].awardID;
                            })
                            .appendTo(".awardsView")
                        ;
                    }
    
                    if (snapshot.val().length == 1) {
                        $(".awardnumView").text("1 award");
                    } else {
                        $(".awardnumView").text(snapshot.val().length + " awards");
                    }
                } else {
                    $(".awardsView").text("No awards.");
                    $(".awardnumView").text("0 awards");
                }
            });
        }
    });
});