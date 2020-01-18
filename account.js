function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var currentUid = null;

$(function() {
    $(".showSignedLoading").show();
    $(".showSignedIn").hide();
    $(".showSignedOut").hide();

    firebase.auth().onAuthStateChanged(function(user) {  
        if (user) {
            currentUid = user.uid;

            $("#signInButton").text("Exit");
            $("#signInLinker").attr("src", "javascript:signOut();");

            firebase.database().ref("/users/" + currentUid + "/updated").once("value").then(function(snapshot) {
                var firstTime = snapshot.val();

                if (firstTime == null) {
                    var redirection = getParameterByName("goto");
                    if (redirection == null) {
                        redirection = "firsttime.html";
                    } else {
                        redirection = "firsttime.html?goto=" + redirection;
                    }

                    window.location.href = redirection;
                }
            });

            $(".showSignedLoading").hide();
            $(".showSignedIn").show();
            $(".showSignedOut").hide();

            firebase.database().ref("/users/" + currentUid).once("value").then(function(snapshot) {
                var username = snapshot.val().username;
                var accountPic = snapshot.val().accountPic;
                var bio = snapshot.val().bio;
                var social = snapshot.val().social;
                var status = snapshot.val().status;

                if (status === undefined) {status = "Member";}

                $(".username").text(username);
                $(".accountPic").attr("src", accountPic);
                $(".bio").html(bio);
                $(".status").text(status);

                $("#bioFrame").attr("src", "data:text/html;base64," + btoa("<style>* {font-family: 'Roboto', Helvetica, Arial, sans-serif;} a {color: #00b0f0;} button {width: 100px;font-family: 'Roboto', Helvetica, Arial, sans-serif;background-color: #00b0f0;color: white;border-radius: 10px;-webkit-border-radius: 10px;-moz-border-radius: 10px;-o-border-radius: 10px;border: none;padding: 10px;outline: none;}</style>" + bio));
                $("#socials").html("");

                if (social.scratch != null && social.scratch != "") {
                    $("<a target='_blank' class='socialBadge scratch'>")
                        .attr("href", social.scratch)
                        .text("Scratch")
                        .appendTo("#socials")
                    ;
                }

                if (social.yt != null && social.yt != "") {
                    $("<a target='_blank' class='socialBadge yt'>")
                        .attr("href", social.yt)
                        .text("YouTube")
                        .appendTo("#socials")
                    ;
                }

                if (social.github != null && social.github != "") {
                    $("<a target='_blank' class='socialBadge github'>")
                        .attr("href", social.github)
                        .text("GitHub")
                        .appendTo("#socials")
                    ;
                }

                if (social.web != null && social.web != "") {
                    $("<a target='_blank' class='socialBadge web'>")
                        .attr("href", social.scratch)
                        .text("Website")
                        .appendTo("#socials")
                    ;
                }
            });
        } else {  
            currentUid = null;  
            document.getElementById("signInButton").innerHTML = "Sign In";
            document.getElementById("signInLinker").href = "signin.html";

            $("#signInButton").text("Sign In");
            $("#signInLinker").attr("href", "signin.html");

            $(".showSignedLoading").hide();
            $(".showSignedIn").hide();
            $(".showSignedOut").show();
        }
    });
});

function signOut() {
    firebase.auth().signOut().then(function() {
        window.location.href = "index.html";
    }, function(error) {
        console.error('Sign Out Error', error);
    });
}