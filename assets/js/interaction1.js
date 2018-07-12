//add classes for background by interaction and a interaction counter iCounter
//for each interaction, add and remove classes for the appropriate interactions

//css will overlay the game-container class by using interaction+icounter

//with continue click remove class (interaction +iCounter) iCounter ++, add class (game-container + counter)
//create a function for the (x,y) of the ogden theater. Text pops up on the screen.
//A band is playing and the music is intoxicating. The sprite goes inside.

//The sprite comes to the Ogden theater



$(document).ready(function () {
    //create a function for the (x,y) of the ogden theater. Text pops up on the screen.
    //A band is playing and the music is intoxicating. The sprite goes inside.
    //---------TTS--------------------------------
    //Text to speech --does not use an ajax request---may just be new technoology?
    // $(document).on("click", function () {
    //     responsiveVoice.speak("Hello World");
    // });
    //------------TTS---------------------------
    //--------------------------------------------firebase & boss
    // $("#game-box").hide();
    // mystery()
    // $("#mysteryButt").on("click", function () {
    //     $("#mysteryButt").remove();
    //     startPage();
    // })

    // $(document).on("click", "#play-game", function () {
    //     $("#game-box").remove();
    //     $("#auth").show();
    // })

    //     $(".mDiv").remove();
    //     $(".gif-div").remove();
    //     $("#game-box").show();
    // })

    var config = {
        apiKey: "AIzaSyAW4oe-QFXhUeCMs3WmYzl0EQL_qFqngHE",
        authDomain: "group-project-1-7ad35.firebaseapp.com",
        databaseURL: "https://group-project-1-7ad35.firebaseio.com",
        projectId: "group-project-1-7ad35",
        storageBucket: "group-project-1-7ad35.appspot.com",
        messagingSenderId: "571501272814"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    // var newUserID;

    //------------authenitcation---------------------------
    // var auth = firebase.auth(); /************************* */
    // Initialize the FirebaseUI Widget using Firebase.
    // var ui = new firebaseui.auth.AuthUI(auth); /*********************** */

    // var uiConfig = {
    //     callbacks: {
    //         signInSuccessWithAuthResult: function (authResult, redirectUrl) {
    //             // User successfully signed in.
    //             // Return type determines whether we continue the redirect automatically
    //             // or whether we leave that to developer to handle.
    //             console.log(user)
    //             return true;
    //         },
    //         uiShown: function () {
    //             // The widget is rendered.
    //             // Hide the loader.

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
    //         requireDisplayName: true,
    //     }
    //     ],
    //     tosUrl: 'terms.html'
    // };

    // ui.start('#firebaseui-auth-container', {
    //     signInOptions: [
    //       {
    //         provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //         requireDisplayName: true,
    //       }
    //     ]
    //   });
    // ui.start('#firebaseui-auth-container', uiConfig);

    //lisener for new user    
    firebase.auth().onAuthStateChanged(function (user) { /**************** */
        // newUserID = database.ref(user.uid);
        // var newUserID = firebase.auth().user.uid
        console.log(user.uid);
        console.log(newUserID)
    })

    // firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     console.log(error.Message);

    // });
    // firebase.auth().onAuthStateChanged(user => {
    //     if (user) {
    //         // $("#firebaseui-auth-container").hide();
    //         window.location = 'index.html'; //After successful login, user will be redirected to home.html
    //     }
    // });

    //if !user null---then hide sign in page?
    //--------------------authentication-----------------------
    var ref = database.ref("user")


    //temporary--------------------
    var newUser = ref.child("soi4WGAaOEWaOrVltR8E4eZ5Eaf1");
    //temproary----------------------

    var playerRef = newUser.child("player1");
    var bossRef = newUser.child("boss");
    var bossAp = 0;
    var bossHp = 0;
    initializeDatabase();

    bossRef.on("value", function (snapshot) {
        console.log(snapshot.val())
        bossAp = snapshot.val().ap;
        bossHp = snapshot.val().hp;

        // bossHp--;

        bossRef.update({
            ap: bossAp,
            hp: bossHp,
        })
    });
    playerRef.on("value", function (snapshot) {
        console.log(snapshot.val())
        playerAp = snapshot.val().ap;
        playerHp = snapshot.val().hp;

        // bossHp--;

        playerRef.update({
            ap: playerAp,
            hp: playerHp,
        })
    });


    $(document).on("click", "#special", function () {
        console.log("clicked")
        bossHp = bossHp + 10;

        bossRef.update({
            hp: bossHp,
        })
        console.log(bossHp)
    })



    function initializeDatabase() {
        playerRef.set({
            hp: 400,
            ap: 10,
            highScore: null,
        })
        bossRef.set({
            hp: 1000,
            ap: 25,
        })
    }
    //play again button global variable
    var playAgain = $("<button>");
    playAgain.addClass("btn btn-seconadry play-again");
    playAgain.text("Play Again?")


    //function loads the player card and attack button
    function bossFight() {
        $(".game-container").empty();
        $(".game-container").addClass("boss-container");
        $(".boss-container").removeClass("game-container");
        var bossDiv = $("<div>");
        bossDiv.addClass("row");

        var p1card = $("<div>");
        p1card.addClass("card player-card");

        var p1img = $("<img>");
        p1img.addClass("card-img-top");
        p1img.attr("src", "https://placekitten.com/g/200/150");
        p1card.append(p1img);

        var p1 = $("<h5>")
        p1.addClass("card-title");
        p1.text("Player 1");
        p1card.append(p1);

        var p1HP = $("<p>");
        p1HP.addClass("card-text");
        p1HP.attr("id", "p1hp")
        p1HP.text("HP: " + playerHp);

        var p1AP = $("<p>");
        p1AP.addClass("card-text");
        p1AP.attr("id", "p1ap");
        p1AP.text("AP: " + playerAp);
        p1card.append(p1HP).append(p1AP);

        var attack = $("button");
        attack.addClass("btn btn-primary attack");
        attack.text("Attack!");
        p1card.append(attack);

        bossDiv.append(p1card);

        $(".boss-container").append(bossDiv)
    }

    function winning() {
        $(".boss-container").empty();
        $(".boss-container").html("<h1> Congradulations! You won with a score of: " + playerScore + "</h1>")

        $(".boss-container").append(playAgain);
    }

    //game-over function runs when player loses all HP
    function gameOver() {
        //load game-over screen
        $(".boss-container").empty();
        $(".boss-container").html("<h1> Game Over </h1>")

        $(".boss-container").append(playAgain);
    }
    // $(document).on("click", "#fight-boss", function(){
    // bossFight();
    // })


    //function runs when attack button is pushed
    function attack() {
        if (playerHp && bossHp > 0) {
            bossHp -= playerAp;
            if (bossHp > 0) {
                playerHp -= bossAp;
            } else {
                console.log("you win")
                console.log(bossHp)
                winning();
            }
            $("#p1hp").text("HP: " + playerHp);
        }
        if (playerHp <= 0) {
            console.log("you lose")
            gameOver();
        }
    }

    $(document).on("click", ".attack", function () {
        console.log("clicked")
        attack();
    })

    //--------------------------------------------firebase & boss

    //------------first page--game start------------------
    // var newSound = document.createElement("audio");

    // function mystery() {

    //     var mysteryDiv = $("<div>");
    //     mysteryDiv.addClass("mDiv")
    //     $("#game-box").append(mysteryDiv);

    //     var mystery = $("<button>");
    //     mystery.addClass("mystery");
    //     mystery.attr("id", "mysteryButt")
    //     mystery.text("?");
    //     $(mysteryDiv).append(mystery);
    // }

    // function startPage() {
    //     var buttDiv = $("<div>");
    //     buttDiv.addClass("pButt");

    //     var playGame = $("<button>");
    //     playGame.attr("id", "play-game");
    //     playGame.addClass("btn btn-danger");
    //     playGame.text("Begin?");
    //     buttDiv.append(playGame)

    //     var newSound = document.createElement("audio");
    //     newSound.src = "theme.mp3";
    //     newSound.play();

    //     var gifDiv = $("<div>");
    //     gifDiv.addClass("gif-div");
    //     $("game-box").append(gifDiv);

    //     var openGif = $("<img>");
    //     openGif.addClass("thangsIntro");
    //     openGif.attr("src", "Colfax Thangs Open.gif");

    //     $(".gif-div").append(openGif)

    //     setTimeout(function () {
    //         openGif.attr("src", "colfax_thangs_static.gif");
    //         $(".gif-div").append(buttDiv);
    //     }, 1000);
    // }


    //------------first page --game start----------------


    //-----------------------Interactions-----------------------------------

    var interaction = [{
            story: "You hear a band playing and the music is intoxicating. Click the door to go inside.",

            scenario: "You cannot maintain clear thought while the music is playing. You are surrounded by people...at least they look like people, it is hard to tell.",

            question: "There is an empty container lying at the doorway. Do you:",

            answerChoices: {
                idealChoice: "Grab the container and capture the music",
                nothingChoice: "Turn around and leave, you want no part of whatever is going on here.",
                negativeChoice: "Go to the bar and get a drink",
                positiveChoice: "You move towards the stage and start dancing."
            },
            consequences: {
                ideal: "increases your health and adds the item to your inventory. Nice!",
                nothing: "nothing happens. You are no closer to uncovering the truth.",
                negative: "Your drink is poisoned. You wake up the next day in the alley and you lose health.",
                positive: "Everyone starts laughing at you because your dancing is off beat. You use your new found notoriety to make a new friend."
            },
            item: "music box with hypnotic music",
            itemImg: "assets/images/musicbox.jpg",
        },
        {
            story: "The smell of bacon permeates the air. You see a line of people down the street and wonder what they are waiting for. When you look up, you see the sign, 'Pete's Kitchen'. Click the door to go inside.",

            scenario: "The smell is the best smell that you have ever encountered. It makees you hungry and satisfied at the same time.",

            question: "As you cut the line to enter the diner, you notice the cramped space is full of people. A person behind you yells, 'Hey, you can't cut!' Do you:",

            answerChoices: {
                nothingChoice: "You turn around and realize that you did indeed cut. You apologize and walk to the end of the line to wait your turn.",
                idealChoice: "You look around as you attempt to form a plan. You see a golden fork lying on a table that is waiting to be bussed. You pick up the fork.",
                positiveChoice: "You see a table with one person. You go over to them and ask to sit with them. They are delighted that you asked and invite you to eat thier left over breakfast burrito.",
                negativeChoice: "The person sounds angry and you are in no mood to deal with them. You turn around and punch them."
            },
            consequences: {
                ideal: "increases your health and adds the item to your inventory. Nice!",
                nothing: "nothing happens. You are no closer to uncovering the truth.",
                negative: "Your are beat up so badly that you lose an entire day...you cannot remember anything. You wake up the next day in the alley and you lose health.",
                positive: "The person you sat next to is so appreciative of the conversation that you share that they give you a hint. They say, 'be kind to people and they will help you.'"
            },
            item: "Golden Fork",
            itemImg: "assets/images/goldFork.jpg",

        },
        {
            story: "You find yourself outside of a quaint little country bar. You decide to go inside.",

            scenario: "Once you are inside the bar, you realize that this is not your typical, run of the mill country bar. There are shirtless men EVERYWHERE and many of the women are extremely tall. As you make your way further into the bar you",

            question: "As you make your way further into the bar you realize that this place is really fun. People seem happy to be themselves. Do you: ",

            answerChoices: {
                negativeChoice: "Upon further observation, you are extremely uncomfortable. You try to walk towards the door in an easy, smooth manner.  ",
                nothingChoice: "Stand in the middle of the room and observe the situation.",
                idealChoice: "Go up to the bar and order a drink from a bar tender who is wearing a rainbow cowboy hat.",
                positiveChoice: "You spy an attractive person across the bar and wink at them."
            },
            consequences: {
                ideal: "You strike up a conversation with the bartender and comment on the awesome hat he is wearing. He decides to give you the hat.",
                nothing: "nothing happens. You are no closer to uncovering the truth.",
                negative: "In your quest to make a hasty exit you trip over your own feet completely shattering your ankle in the process. You lose health.",
                positive: "Your master winkery causes the person to walk over to you. As they come closer, you see that you have just winked at...RuPaul! You spend the rest of the evening talking candidly and learning the drag queen secrets."
            },
            item: "Cowboy Hat",
            itemImg: "assets/images/cowboyHat.jpg"
        }

    ];


    var currrentScenario;
    var userSelect;
    //var playContinue = false;
    var playerScore = 0;
    var highScore = 0; //get high score from Firebase
    var highPlayer = "No one";
    var health = 100;
    var sidekick = [];
    var inventory = [];
    var sidekickChoice; //user selected sidekick
    var iCounter = 0;


    //need to hide continue button upon game start

    console.log("continue button should be hidden");

    $(".gamePlay").hide();
    $("#door").hide();

    //continue button gets made 

    var next = $("<button>");
    next.text("Continue");
    next.addClass("btn btn-success continue");

    $("#buttonSpot").append(next);

    $(".continue").hide();


    database.ref().on("value", function (snapshot) {
        //If Firebase has a highscore and a highPlayer, update our client-side variables
        if (snapshot.child("highScore").exists() && snapshot.child("highPlayer").exists()) {
            //set the variables for highScore/highPlayer equal to the stored values.
            highPlayer = snapshot.val().highPlayer;
            highScore = snapshot.val().highScore;
            console.log(highPlayer);
            console.log(highScore);

        }
    })

    function storeHighScore() {
        //var playerName = $("#player-name").val().trim();
        //playerScore = parseInt($("#score").val().trim());
        //console.log(playerName);
        console.log(playerScore);
        if (playerScore > highScore) {
            console.warn("new high Score");
            database.ref().set({
                highPlayer: playerName,
                highScore: playerScore,
            });
        }

    }
    storeHighScore();

    function updateDisplay() {
        //Player Stats display --> create function upon game start
        $("#health").html("Player HP: " + health);
        $("#score").html("Score: " + playerScore);
        if (playerScore <= highScore) {
            playerScore = highScore;
        }
        var newDiv = $("<div>");
        newDiv.append(highPlayer);
        $("#highScore").append("High Player: " + newDiv);
        $("#highScore").html("High Score: " + highScore);
        $(".interactions").hide();
        //push to Firebase
        ref.update({
            highScore: highScore,

        })
    }

    updateDisplay();

    function itemsDisplay() {
        //need to create items for each scenario
        var image = $("<img>")
        var imgDiv = $("<div>");
        imgDiv.addClass("item img-thumbnail");

        var image = $("<img>")
        image.attr("src", interaction[iCounter].itemImg);
        console.log(image);
        imgDiv.append(image);




        $(".inventory").append(imgDiv);
        inventory.push(interaction[iCounter].item);
        //push inventory to Firebase
        database.ref().push({
            inventory: inventory
        })

        console.log(inventory);
    }

    //sidekick function
    //----------------------------------------------------

    // function gainSidekick() {
    //     var sparkleDiv = $("<div>");
    //     sparkleDiv.addClass("sparkle");

    //     var sparkleImage = "<img src='assets/images/sparkle.gif'/>";

    //     sparkleDiv.append(sparkleImage);
    //     sparkleDiv.hide();
    //     $(".sidekickSparkle").append(sparkleDiv);
    //     $(".sparkle").on("click", function () {

    //         $(".sparkle").hide();

    //         var sidekicks = ["bum", "prostitute", "mangie+dog", "drug dealer"]


    //         var limit = 1;

    //         var input = sidekicks[iCounter];

    //         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";
    //         $.ajax({
    //             url: queryURL,
    //             method: "GET"
    //         }).done(function (response) {

    //             for (var j = 0; j < limit; j++) {
    //                 console.log(response);

    //                 var displayDiv = $("<div>");
    //                 displayDiv.addClass("item");

    //                 var image = $("<img>");

    //                 image.attr("src", response.data[j].images.original_still.url);
    //                 image.attr("data-still", response.data[j].images.original_still.url);
    //                 image.attr("data-animate", response.data[j].images.original.url);
    //                 image.attr("data-state", "still");
    //                 image.attr("class", "gif img-thumbnail");
    //                 displayDiv.append(image);



    //                 $(".sidekick").append(displayDiv);


    //             }
    //         })
    //     })
    // }

    // //$("#door").hide();

    // gainSidekick();


    //create a function upon click of the door
    $("#door").on('click', function doorExplore() {
        console.log("clicked");
        //clear the screen
        $("#door").hide();

        //hides the game play panel
        $(".gamePlay").hide();
        console.log("gamePlay hidden");

        //changes the background 
        $(".game-container").addClass("interactions" + iCounter);

        var choices = $("<div>");
        choices.addClass("interactions" + iCounter);
        choices.attr("id", "int");

        $("#game").append(choices)

        //Scenario and choices come up

        beginInteraction();
    });

    function beginInteraction() {

        //removing game screen
        $("#gameId").removeClass("game-container");
        //$("#gameId").addClass("")


        //showing the text with the story and the user choices
        $(".interactions").show();
        $(".scenario").html("<h2>Scenario: " + interaction[iCounter].scenario + "</h2>");
        responsiveVoice.speak(interaction[iCounter].scenario);
        $(".question").html("<h3>" + interaction[iCounter].question + "</h3>");
        console.log(iCounter);
        var x;

        // for (var i = 0; i < interaction.answerChoices.length; i++) 
        for (x in interaction[iCounter].answerChoices) {
            var choices = $("<div>");

            choices.text(interaction[iCounter].answerChoices[x]);
            choices.attr({
                "data-index": x
            });

            choices.addClass("thisChoice");
            $(".userChoices").append(choices);

            console.log(choices);
        };

        //click events for each choice
        $(".thisChoice").on("click", function () {

            userSelect = $(this).attr("data-index");
            //.data("index");

            console.log("Index" + userSelect);

            consequencePage();


        })

    }


    function consequencePage() {
        $(".question").empty();
        $(".userChoices").empty();
        $(".gamePlay").show();
        //playContinue = true;
        // update and alert users choice

        $(".gamePlay").html("You decide to " + interaction[iCounter].answerChoices[userSelect]);
        responsiveVoice.speak("You decide to " + interaction[iCounter].answerChoices[userSelect]);

        var ideal = interaction[iCounter].consequences.ideal;
        var positive = interaction[iCounter].consequences.positive;
        var negative = interaction[iCounter].consequences.negative;
        var nothing = interaction[iCounter].consequences.nothing;

        //if statements to add consequences for each choice
        if (userSelect == "idealChoice") {
            console.log("ideal choice");
            $(".gamePlay").append(" which " + ideal);
            //var container = "Container with mesmerizing music";
            //inventory.push(container);
            //console.log("inventory" + inventory)

            //update inventory
            itemsDisplay();


            health += 50;
            playerScore += 100;
            console.log(health);
            console.log(playerScore);
            console.log(highScore);
            //return to map feature

            updateDisplay();
            $(".continue").show();

        } else if (userSelect == "positiveChoice") {
            console.log("positive Choice");
            $(".gamePlay").append(": " + positive);
            health += 25;
            playerScore += 50;
            console.log(highScore);


            //return to main map feature
            updateDisplay();
            // chooseSidekick();
            $(".continue").show();


        } else if (userSelect == "nothingChoice") {
            console.log("nothing happens");
            $(".gamePlay").append(": " + nothing);
            //add button to end interaction or give user a chance to try again
            console.log(highScore);
            // return to main map feature


            updateDisplay();
            $(".continue").show();
        }
        if (userSelect == "negativeChoice") {
            console.log("negative choice");
            $(".gamePlay").append(": " + negative);
            health -= 25;
            playerScore -= 25;

            //return to main map feature

            $(".continue").show();
            console.log(highScore);
            updateDisplay();
        }
    }



    $(".continue").on("click", function () {
        console.log("continue was clicked");

        // playContinue = false;
        $("#gameId").addClass("game-container");
        $(".game-container").removeClass("interactions" + iCounter);
        $(".userStuff").hide();

        //.addClass("game-container" + counter);

        console.log("gamejs " + counter);

        iCounter++;

        console.log("interaction # " + iCounter);

        $("#door").show();

        //hides the game play panel
        $(".gamePlay").hide();

        $(".continue").hide();


    });








    //firebase data for the start of a new game--does not include high score--only data we want to be kept consistnet from one game to another (not high scores and the like)

    function initializeDatabase() {
        playerRef.set({
            hp: 400,
            ap: 10,
        })
        bossRef.set({
            hp: 1000,
            ap: 25,
        })
    }

    // function gameStart() {
    //     //hot spot for sparkle based on game-container #
    //     //hot spot for door based on game-container #
    //     console.log("counter = " + counter);
    //     if (counter === 1) {
    //         console.log("show door");
    //         $("#door").show();
    //     } else {
    //         $("#door").hide();
    //         console.log("hide door");
    //     }
    //     //door will be made transparent once it is overlayed in the appropriate spot



    //     //continue button gets made 

    //     var next = $("<button>");
    //     next.text("Continue");
    //     next.addClass("btn btn-success continue");

    //     $("#buttonSpot").append(next);

    //     $(".continue").hide();

    // }
    // gameStart();
});