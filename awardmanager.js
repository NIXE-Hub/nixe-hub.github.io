firebase.auth().onAuthStateChanged(function(user) {
    if (user && user.uid != null) {
        firebase.database().ref("/users/" + currentUid + "/awards").once("value").then(function(snapshot) {
            if (snapshot.val() != null) {
                for (var i = 0; i < document.getElementsByClassName("awards").length; i++) {
                    document.getElementsByClassName("awards")[i].innerHTML = "Awards:";
                }

                for (var i = 0; i < document.getElementsByClassName("awards").length; i++) {
                    for (var award = 0; award < snapshot.val().length; award++) {
                        document.getElementsByClassName("awards")[i].innerHTML += `<div class="award" style="background-color: ` + snapshot.val()[award].backColor + `; color: ` + snapshot.val()[award].textColor + `" onclick="window.location.href='https://nixe-hub.github.io/aboutawards.html#` + snapshot.val()[award].awardID + `';">` + snapshot.val()[award].awardName + `</div>`;
                    }
                }

                for (var i = 0; i < document.getElementsByClassName("awardnum").length; i++) {
                    if (snapshot.val().length == 1) {
                        document.getElementsByClassName("awardnum")[i].innerHTML = snapshot.val().length + " award";
                    } else {
                        document.getElementsByClassName("awardnum")[i].innerHTML = snapshot.val().length + " awards";
                    }
                }
            } else {
                for (var i = 0; i < document.getElementsByClassName("awards").length; i++) {
                    document.getElementsByClassName("awards")[i].innerHTML = "No awards.";
                }

                for (var i = 0; i < document.getElementsByClassName("awardnum").length; i++) {
                    document.getElementsByClassName("awardnum")[i].innerHTML = "0 awards";
                }
            }
        });
    }
});