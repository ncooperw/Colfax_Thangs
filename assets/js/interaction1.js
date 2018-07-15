$(document).ready(function () {

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
    // var newUser;
    var ref = database.ref("user")


    // $("#startGamePlay").on("click", function () {

    //     firebase.auth().onAuthStateChanged(function (user) {
    //         console.log("clicky")
    //         console.log(user.uiu);
    //     })
    // });

    // firebase.auth().onAuthStateChanged(function (user) { /**************** */

    //  newUserID = user.uid;
    //  console.log(user.uid);
    //  console.log(newUserID)
    // newUser = ref.child(newUserID)
    // })


    var playerRef = ref.child("player1");
    var bossRef = ref.child("boss");
    var inventoryRef = ref.child("inventory");
    var sideKitsRef = ref.child("SideKits")
    var scoreRef = ref.child("score");
    // var userRef = ref.child(newUserID)
    // console.log(userRef);
    // var bossAp = 0;
    // var bossHp = 0;
  

    bossRef.on("value", function (snapshot) {
        console.log(snapshot.val())
        bossAp = snapshot.val().ap;
        bossHp = snapshot.val().hp;
        console.log(bossHp)
    });

    playerRef.on("value", function (snapshot) {
        console.log(snapshot.val())
        playerAp = snapshot.val().ap;
        playerHp = snapshot.val().hp;
    });

    // initializeDatabase();

    sideKitsRef.on("value", function (snapshot) {

    })

    inventoryRef.on("value", function (snapshot) {

    })
    scoreRef.on("value", function (snapshot) {
        score = playerScore;

    })


    // $(document).on("click", "#special", function () {
    //     console.log("clicked")
    //     bossHp = bossHp + 10;

    //     bossRef.update({
    //         hp: bossHp,
    //     })
    //     console.log(bossHp)
    // })



    function initializeDatabase() {
        playerRef.set({
            hp: 200,
            ap: 1000,
        })
        bossRef.set({
            hp: 1000,
            ap: 100,
        })
        scoreRef.set({
            score: null,
        })
        inventoryRef.set({
        })
        sideKitsRef.set({
        })

    }
    initializeDatabase();
    //play again button global variable

    var playAgain = $("<button>");
    playAgain.addClass("btn btn-seconadry play-again");
    playAgain.text("Play Again?")






    //function loads the player card and attack button
    function bossFight() {

        $("#gameId").empty();
        $("#gameId").addClass("boss-container");
        $(".boss-container").removeClass("game-container11");


        var bossDiv = $("<div>");
        bossDiv.addClass("row");

        //boss card ~~~~~~~~~~~~~~~~~~~~~~~~~~~

        var bossCard = $("<div>");
        bossCard.addClass("card");
        bossCard.attr("id", "boss-stat-card")

        var b = $("<h5>");
        b.addClass("no-pad");
        b.text("Demogorgan");
        bossCard.append(b);

        var bossHealth = $("<p>");
        bossHealth.text("HP: " + bossHp);
        bossHealth.attr("id", "bossHp")
        bossHealth.addClass("no-pad");
        bossCard.append(bossHealth);

        var bossAttack = $("<p>");
        bossAttack.addClass("no-pad");
        bossAttack.text("AP: " + bossAp);
        bossAttack.attr("id", "bossAp")
        bossCard.append(bossAttack);

        var gorgan = $("<img>");
        gorgan.attr("src", "assets/images/p1-boss.png")
        gorgan.addClass("boss-image");
        $(bossDiv).append(gorgan);

        setTimeout(function () {
            $(".boss-image").fadeIn(3000);
        }, 1)


        //boss card ~~~~~~~~~~~~~~~~~~~~~~~~~~

        //player card~~~~~~~~~~~~~~~~~~~

        var p1card = $("<div>");
        p1card.addClass("card player-card");

        var p1img = $("<img>");
        p1img.addClass("card-img-top");
        p1img.attr("src", "https://placekitten.com/g/100/100");
        p1card.append(p1img);

        var p1 = $("<h5>")
        p1.addClass("no-pad");
        p1.addClass("card-title");
        p1.text("Player 1");
        p1card.append(p1);

        var p1HP = $("<p>");
        p1HP.addClass("no-pad");
        p1HP.addClass("card-text");
        p1HP.attr("id", "p1hp")
        p1HP.text("HP: " + playerHp);

        var p1AP = $("<p>");
        p1AP.addClass("no-pad");
        p1AP.addClass("card-text");
        p1AP.attr("id", "p1ap");
        p1AP.text("AP: " + playerAp);
        p1card.append(p1HP).append(p1AP);

        var attack = $("<button>");
        attack.addClass("btn btn-primary attack");
        attack.text("Attack!");
        p1card.append(attack);

        //player card~~~~~~~~~~~~~~~~~~~~~~~~~~~



        bossDiv.append(p1card);
        bossDiv.append(bossCard);


        $(".boss-container").append(bossDiv)
        // });
    }
    function reset() {

        window.location = "index1.html"

    }


    $(document).on("click", ".play-again", function () {

        reset();
    })


    function winning() {
        $("#gameId").empty();
        $("#gameId").removeClass("game-container").removeClass("boss-container");


        var theEnd = $("<img>");
        theEnd.addClass("thangsIntro");
        theEnd.attr("src", "assets/images/Colfax Thangs - The End.gif");
        $("#gameId").append(theEnd)
        var newSound = document.createElement("audio");
        newSound.src = "assets/sounds/theme.mp3";
        newSound.play();

        $("#gameId").html("<h1> Congradulations! You won with a score of: " + playerScore + "</h1>")
        $("#gameId").append(playAgain);
      
    }

    //game-over function runs when player loses all HP
    function gameOver() {
        //load game-over screen
        $(".boss-container").empty();
        $(".boss-container").addClass("lose");
        $(".lose").removeClass("boss-container");

        $(".lose").html("<h1 id='game-over'> Game Over </h1>")

        $(".lose").append(playAgain);
   
    }
    // })


    //function runs when attack button is pushed
    function attack() {
        if (playerHp && bossHp > 0) {
            bossHp -= playerAp;
            score += 50;
            updateDisplay()
            if (bossHp > 0) {
                // setTimeout(function(){
                    playerHp -= bossAp;
                    updateDisplay();
                // }, 500)
         
            } else {
                console.log("you win")
                console.log(bossHp)
                winning();
            }
            $("#p1hp").text("HP: " + playerHp);
            $("#bossHp").text("HP: " + bossHp);
        }
        if (playerHp <= 0) {
            console.log("you lose")
            gameOver();

        }
    }

    $(document).on("click", ".attack", function () {
      
        attack();
        $(".attack").addClass("dis")
        $(".dis").removeClass("attack");
        setTimeout(function(){
            $(".dis").addClass("attack");
            $(".attack").removeClass("dis");
        }, 1200)
    })


    //-----------------------Interactions-----------------------------------

    var interaction = {
        2: {
            story: "You hear a band playing and the music is intoxicating. Click the door to go inside.",

            scenario: "You cannot maintain clear thought while the music is playing. You are surrounded by people...at least they look like people, it is hard to tell.",

            question: "There is an empty container lying at the doorway. Do you:",

            answerChoices: {
                idealChoice: "Grab the container and capture the music",
                nothingChoice: "Turn around and leave, you want no part of whatever is going on here.",
                negativeChoice: "Go to the bar and get a drink",
                positiveChoice: "move towards the stage and start dancing."
            },
            consequences: {
                ideal: "increases your health and adds the item to your inventory. Nice!",
                nothing: "nothing happens. You are no closer to uncovering the truth.",
                negative: "Your drink is poisoned. You wake up the next day in the alley and you lose health.",
                positive: "Everyone starts laughing at you because your dancing is off beat. You use your new found notoriety to make a new friend."
            },
            item: "music box with hypnotic music",
            itemImg: "assets/images/musicbox.jpg",
            class: "interactions0"
        },
        5: {
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
            itemImg: "assets/images/cowboyHat.jpg",
            class: "interactions1"
        },
        8: {
            story: "The smell of bacon permeates the air. You see a line of people down the street and wonder what they are waiting for. When you look up, you see the sign, 'Pete's Kitchen'. Click the door to go inside.",

            scenario: "The smell is the best smell that you have ever encountered. It makees you hungry and satisfied at the same time.",

            question: "As you cut the line to enter the diner, you notice the cramped space is full of people. A person behind you yells, 'Hey, you can't cut!' Do you:",

            answerChoices: {
                nothingChoice: "turn around and realize that you did indeed cut. You apologize and walk to the end of the line to wait your turn.",
                idealChoice: "look around as you attempt to form a plan. You see a golden fork lying on a table that is waiting to be bussed. You pick up the fork.",
                positiveChoice: "go over to a table with a lone person and ask to sit with them. They are delighted that you asked and invite you to eat thier left over breakfast burrito.",
                negativeChoice: "turn around and punch the person; they sound angry and you are in no mood to deal with them."
            },
            consequences: {
                ideal: "increases your health and adds the item to your inventory. Nice!",
                nothing: "nothing happens. You are no closer to uncovering the truth.",
                negative: "Your are beat up so badly that you lose an entire day...you cannot remember anything. You wake up the next day in the alley and you lose health.",
                positive: "The person you sat next to is so appreciative of the conversation that you share that they give you a hint. They say, 'be kind to people and they will help you.'"
            },
            item: "Golden Fork",
            itemImg: "assets/images/goldFork.jpg",
            class: "interactions2"

        }

    };


    var currrentScenario;
    var userSelect;
    var playerScore = 0;
  
    // var highScore = 0; //get high score from Firebase
    var highPlayer = "No one";
    var health = 100;
    var sidekick = [];
    var inventory = [];
    var sidekickChoice; //user selected sidekick
    var iCounter = 0;


    //need to hide continue button upon game start

    $(".gamePlay").hide();



    // database.ref().on("value", function (snapshot) {
    //     //If Firebase has a highscore and a highPlayer, update our client-side variables
    //     if (snapshot.child("highScore").exists() && snapshot.child("highPlayer").exists()) {
    //         //set the variables for highScore/highPlayer equal to the stored values.
    //         highPlayer = snapshot.val().highPlayer;
    //         highScore = snapshot.val().highScore;
    //         console.log(highPlayer);
    //         console.log(highScore);

    //     }
    // })

    // function storeHighScore() {
    //     //var playerName = $("#player-name").val().trim();
    //     //playerScore = parseInt($("#score").val().trim());
    //     //console.log(playerName);
    //     console.log(playerScore);
    //     if (playerScore > highScore) {
    //         console.warn("new high Score");
    //         database.ref().set({
    //             highPlayer: playerName,
    //             highScore: playerScore,
    //         });
    //     }

    // }
    // storeHighScore();

    function updateDisplay() {
        //Player Stats display --> create function upon game start
        $("#health").html("Player HP: " + playerHp);
        $("#score").html("Score: " + playerScore);
        // if (playerScore <= highScore) {
        //     playerScore = highScore;
        
        // var newDiv = $("<div>");
        // newDiv.append(highPlayer);
        // $("#highScore").append("High Player: " + newDiv);
        // $("#highScore").html("High Score: " + highScore);
        $(".interactions").hide();
        // //push to Firebase
        // ref.update({
        //     highScore: highScore,

        // })
    }

    updateDisplay();

    function itemsDisplay() {
        //need to create items for each scenario
        var image = $("<img>")
        var imgDiv = $("<div>");
        imgDiv.addClass("item img-thumbnail");

        //var image = $("<img>")
        image.attr("src", interaction[counter].itemImg).addClass("imgItems");
        console.log(image);
        imgDiv.append(image);




        $(".inventory").append(imgDiv);
        inventory.push(interaction[counter].item);
        //push inventory to Firebase
        ref.update({
            inventory: inventory
        })

        console.log(inventory);
    }

    //sidekick function
    //----------------------------------------------------

    function gainSidekick() {
        var sparkleDiv = $("<div>");
        sparkleDiv.addClass("sparkle");

        var sparkleImage = "<img src='assets/images/sparkle.gif'/>";

        sparkleDiv.append(sparkleImage);
        sparkleDiv.hide();
        $(".sidekickSparkle").append(sparkleDiv);
        $(".sparkle").on("click", function () {

            $(".sparkle").hide();

            var sidekicks = ["bum", "prostitute", "mangie+dog", "drug dealer"]


            var limit = 1;

            var input = sidekicks[counter];

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function (response) {

                for (var j = 0; j < limit; j++) {
                    console.log(response);

                    var displayDiv = $("<div>");
                    displayDiv.addClass("item");

                    var image = $("<img>");

                    image.attr("src", response.data[j].images.original_still.url);
                    image.attr("data-still", response.data[j].images.original_still.url);
                    image.attr("data-animate", response.data[j].images.original.url);
                    image.attr("data-state", "still");
                    image.attr("class", "gif img-thumbnail");
                    displayDiv.append(image);



                    $(".sidekick").append(displayDiv);


                }
            })
        })
    }


    //create a function upon click of the door
    $("#gameId").on('click', "#door", function doorExplore() {
        pp1 = $(this)[0].offsetLeft - car.position().left
        pp2 = $(this)[0].offsetTop - car.position().top
        distanceCheck = Math.sqrt((pp1 * pp1) + (pp2 * pp2));

        if (distanceCheck < 150) {
            insideMode = true;
            $("#gameId").empty();
            console.log("clicked");
            //as door is clicked, read story
            responsiveVoice.speak(interaction[counter].story);
            //clear the screen
            // $("#door").hide();

            //hides the game play panel
            // $(".gamePlay").hide();
            console.log("gamePlay hidden");

            //changes the background 
            $("#gameId").addClass(interaction[counter].class).removeClass("game-container").removeClass("game-container" + counter);

            var choices = $("<div>");
            // choices.addClass("interactions" + iCounter);
            choices.attr("id", "int");

            $("#game").append(choices)

            //Scenario and choices come up

            beginInteraction();
        } else {
            responsiveVoice.speak("Try getting closer");
        }
    });

    // doorExplore();




    function beginInteraction() {

        //removing game screen
        // $("#gameId").removeClass("game-container");
        // $(".car").hide();
        // $(".userStuff").show();
        //$("#gameId").addClass("")


        //showing the text with the story and the user choices
        $(".interactions").show();
        $(".scenario").html("<h2>Scenario: " + interaction[counter].scenario + "</h2>");
        responsiveVoice.speak(interaction[counter].scenario);
        $(".question").html("<h3>" + interaction[counter].question + "</h3>");
        console.log(iCounter);
        var x;

        // for (var i = 0; i < interaction.answerChoices.length; i++) 
        for (x in interaction[counter].answerChoices) {
            var choices = $("<div>");
            choices.text(interaction[counter].answerChoices[x]);
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

        // makes button after user chooses
        var buttonSpotDiv = $("<div class='col-sm-3' id='buttonSpot'>");
        $("#gameId").append(buttonSpotDiv);
        var next = $("<button>");
        next.text("Continue");
        next.addClass("btn btn-success continue");
        $("#buttonSpot").append(next);

        $(".gamePlay").html("You decide to " + interaction[counter].answerChoices[userSelect]);
        responsiveVoice.speak("You decide to " + interaction[counter].answerChoices[userSelect]);

        var ideal = interaction[counter].consequences.ideal;
        var positive = interaction[counter].consequences.positive;
        var negative = interaction[counter].consequences.negative;
        var nothing = interaction[counter].consequences.nothing;

        //if statements to add consequences for each choice
        if (userSelect == "idealChoice") {
            console.log("ideal choice");
            $(".gamePlay").append(" which " + ideal);
            //var container = "Container with mesmerizing music";
            //inventory.push(container);
            //console.log("inventory" + inventory)

            //update inventory
            itemsDisplay();


            playerHp += 50;
            bossHp -= 50
            playerRef.update({
                hp: playerHp,
            })
            bossRef.update({
                hp: bossHp,
            })
            playerScore += 100;
            // score.push(playerScore);
            scoreRef.update({
                playerScore: playerScore
            })
            console.log(health);
            console.log(playerScore);
            // console.log(highScore);
            //return to map feature

            updateDisplay();
            $(".continue").show();

        } else if (userSelect == "positiveChoice") {
            console.log("positive Choice");
            $(".gamePlay").append(": " + positive);
            playerHp += 25;
            bossHp -= 25;
            playerScore += 50;
            playerRef.update({
                hp: playerHp,
            })
            bossRef.update({
                hp: bossHp,
            })

            // score.push(playerScore);
            scoreRef.update({
                playerScore: playerScore
            })
            // $(".scenario").hide();
            // highScore();
            updateDisplay();
            // console.log(highScore);

            if (userSelect == interaction[2].answerChoices.positiveChoice) {
                var image = $("<img>")
                var imgDiv = $("<div>");
                imgDiv.addClass("item img-thumbnail");
                image.attr("src", "assets/images/rupaul.gif");
                $(".sidekick").append(imgDiv);
                sidekick.push("RuPaul");

                ref.push({
                    sidekick: sidekick
                });
            }

            //return to main map feature
            updateDisplay();
            // chooseSidekick();
            // $(".continue").show();


        } else if (userSelect == "nothingChoice") {
            console.log("nothing happens");
            $(".gamePlay").append(": " + nothing);
            //add button to end interaction or give user a chance to try again
            // console.log(highScore);
            // return to main map feature


            updateDisplay();
            // $(".continue").show();
        }
        if (userSelect == "negativeChoice") {
            console.log("negative choice");
            $(".gamePlay").append(": " + negative);

            pleayerHp -= 25;
            playerScore -= 25;
            bossHp += 25;
            playerRef.update({
                hp: playerHp,
            })
            bossRef.update({
                hp: bossHp,
            })

            //return to main map feature

            // $(".continue").show();
            // console.log(highScore);
            updateDisplay();
        }
    }



    $("#gameId").on("click", ".continue", function () {
        console.log("carpos" + carLastPos);
        insideMode = false;

        // playContinue = false;
        $("#gameId").addClass("game-container").addClass("game-container" + counter);
        $("#gameId").removeClass(interaction[counter].class);
        $(".userStuff").show();
        // $(".scenario").hide();
        trashCanGenerator();
        doorGenerator();
        car.css(carLastPos);

        // $(".car").show()


        //.addClass("game-container" + counter);

        console.log("gamejs " + counter);

        iCounter++;

        console.log("interaction # " + iCounter);

        // $("#door").show();

        //hides the game play panel
        $(".gamePlay").show();

        // $(".continue").hide();


    });

    $(document).on("click", "#start-boss", function(){
        bossFight();
      })


    // bossFight();

});

//boss fight tester code
// $(document).on("click", "#continue-to-boss", function () {
//     console.log("clicky")
//     $("#gameId").removeClass("game-container" + counter);
//     $("#gameId").empty();
//     $("#gameId").addClass("game-container"+ "11")

//     var bossButton = $("<button>");
//     bossButton.addClass("btn btn-danger");
//     bossButton.attr("id", "start-boss");
//     bossButton.text("Fight!")

//     var bossText = $("<div>");
//     bossText.attr("id", "boss-story");
//     bossText.addClass("boss-paragraph");
//     bossText.text("Something russles in the bushes...")
//     setTimeout(function(){
//         responsiveVoice.speak("Prepare to defnd yourself human!");
//         bossText.text("Prepare to defend yourself Human!")
//         bossText.append(bossButton);

//     }, 3000)

//     $(".game-container11").append(bossText);





   

// })










//firebase data for the start of a new game--does not include high score--only data we want to be kept consistnet from one game to another (not high scores and the like)