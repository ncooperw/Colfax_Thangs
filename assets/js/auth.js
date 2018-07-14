$(document).ready(function () {
    var userIn = false;

    $("#auth").hide();
    mystery()
    $("#mysteryButt").on("click", function () {
        $("#mysteryButt").remove();

        startPage();

    })

    $(document).on("click", "#play-game", function () {
        $("#game-box").remove();
        $("#auth").show();
    });

    $(document).on("click", "#skip", function () {
        $("#game-box").remove();
        $("#auth").show();

    })

    var config = {
        apiKey: "AIzaSyAW4oe-QFXhUeCMs3WmYzl0EQL_qFqngHE",
        authDomain: "group-project-1-7ad35.firebaseapp.com",
        databaseURL: "https://group-project-1-7ad35.firebaseio.com",
        projectId: "group-project-1-7ad35",
        storageBucket: "group-project-1-7ad35.appspot.com",
        messagingSenderId: "571501272814"
    };
    firebase.initializeApp(config);

    // var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // firebase.auth().languageCode = 'pt';



    var database = firebase.database();
    var auth = firebase.auth();

    var ui = new firebaseui.auth.AuthUI(auth); /*********************** */

    ui.start('#firebaseui-auth-container', {
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,

        ],
        // Other config options...
    });

    var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'index1.html',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: "terms.html",
      };
    // var uiConfig = {
    //     callbacks: {
    //         signInSuccessWithAuthResult: function (authResult, redirectUrl) {
    //             // userIn = true;
    //             // User successfully signed in.
    //             // Return type determines whether we continue the redirect automatically
    //             // or whether we leave that to developer to handle.
    //             console.log(user)
    //             return true;
    //         },
    //         uiShown: function () {
    //             document.getElementById('loader').style.display = 'none';
    //         }
    //     },
    //     // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    //     signInFlow: 'popup',
    //     signInSuccessUrl: "index.html",
    //     //will need git pages url once finied
    //     signInOptions: [{
    //         provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //         provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //         provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //         // requireDisplayName: true,
    //     }],
    //     tosUrl: 'terms.html'
    // };

    //calls authorization
    // if(userIn === false) {
    // ui.start('#firebaseui-auth-container', uiConfig);
    // }

    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

    //auth listener
    // firebase.auth().onAuthStateChanged(user => {
    //     if (user) {
    //         console.log(userIn);
    //         // $("#firebaseui-auth-container").hide();
    //         window.location = 'index.html'; //After successful login, user will be redirected to home.html
    //     }

    // });
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });




    //big nealy invisible question mark to start game
    function mystery() {

        var mystery = $("<button>");
        mystery.addClass("mystery");
        mystery.attr("id", "mysteryButt")
        mystery.text("?");
        $("#mystery").append(mystery);
    }

    //colfax thangs gif and begin button load
    function startPage() {
        var buttDiv = $("<div>");
        buttDiv.addClass("pButt");

        var skip = $("<button>");
        skip.addClass("btn btn-danger");
        skip.attr("id", "skip")
        skip.text("Skip")

        var playGame = $("<button>");
        playGame.attr("id", "play-game");
        playGame.addClass("btn btn-danger");
        playGame.text("Begin?");
        buttDiv.append(playGame)

        var newSound = document.createElement("audio");
        newSound.src = "assets/sounds/theme.mp3";
        newSound.play();

        var openGif = $("<img>");
        openGif.addClass("thangsIntro");
        openGif.attr("src", "assets/images/Colfax Thangs Open.gif");

        $("#gif-div").append(openGif)
        $("#gif-div").append(skip)

        setTimeout(function () {
            openGif.attr("src", "assets/images/colfax_thangs_static.gif");
            $("#skip").hide();
            $("#gif-div").append(buttDiv);
        }, 13000);
    }
    // console.log(user)

   
});