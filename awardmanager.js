$(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user && user.uid != null) {
            firebase.database().ref("/users/" + currentUid + "/awards").once("value").then(function(snapshot) {
                if (snapshot.val() != null) {
                    $(".awards").text("Awards:");
    
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
                            .appendTo(".awards")
                        ;
                    }
    
                    if (snapshot.val().length == 1) {
                        $(".awardnum").text("1 award");
                    } else {
                        $(".awardnum").text(snapshot.val().length + " awards");
                    }
                } else {
                    $(".awards").text("No awards.");
                    $(".awardnum").text("0 awards");
                }
            });
        }
    });
});