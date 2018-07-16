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

    var ref = database.ref("user")


    var playerRef = ref.child("player1");
    var bossRef = ref.child("boss");
    var inventoryRef = ref.child("inventory");
    var sideKitsRef = ref.child("SideKits")
    var scoreRef = ref.child("score");
    var nameRef = ref.child("name");
    var playerInput = "";


    bossRef.on("value", function (snapshot) {
        bossAp = snapshot.val().ap;
        bossHp = snapshot.val().hp;
    });

    playerRef.on("value", function (snapshot) {
        playerAp = snapshot.val().ap;
        playerHp = snapshot.val().hp;
    });

    sideKitsRef.on("value", function (snapshot) {

    })

    inventoryRef.on("value", function (snapshot) {

    })
    scoreRef.on("value", function (snapshot) {
        playerScore = snapshot.val().score;

    })

    function initializeDatabase() {
        playerRef.set({
            hp: 200,
            ap: 25,
        })
        bossRef.set({
            hp: 1000,
            ap: 100,
        })
        scoreRef.set({
            score: 0,
        })
        inventoryRef.set({

        })
        sideKitsRef.set({

        })
        nameRef.set({
            name: playerInput,
        })

    }
    initializeDatabase();
    //play again button global variable


    var playAgain = $("<button>");
    playAgain.addClass("btn btn-seconadry play-again");
    playAgain.text("Play Again?")

    function instr() {

        $("#gameId").hide();

        var instructions = $("<div>");
        instructions.addClass("instruct");
        instructions.html("<h4>Something ... strange is happening on Colfax tonight. You should investigate before you meet your firends at the civic center.</h4><h4> Hop in you car and use the W, A, S, and D keys or your arrow keys to navigate, and use the mouse to inspect suspicious or interesting things on the street.</h4><h4>Enter in your alias, and push 'I am ready'</h4>")



        // var readInstructions = $("<button>");
        // readInstructions.addClass("btn btn-danger");
        // readInstructions.attr("id", "done-reading");
        // readInstructions.text("I'm Ready!");

        var input = $("<div>");
        input.html('<div class="input-group input-group-lg">' +
            '<button class="input-group-text done-reading" id="inputGroup-sizing-lg">' + "I am Ready" + '</button>' +
            '<input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm">' +
            '</div>');

        // instructions.append(readInstructions);
        instructions.append(input);

        $(".min").append(instructions);


    }

    instr();
    $(".done-reading").on("click", function () {
        playerInput = $(".form-control").val()
        if (playerInput != "") {
            $(".min").remove();
            $("#gameId").show();
            nameRef.update({
                name: playerInput,
            })
            updateDisplay();
        } else {
            responsiveVoice.speak("Enter Your Name Please")
        }
    })

    //function loads the player card and attack button
    function bossFight() {

        updateDisplay();

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

        var growl = document.createElement("audio");
        growl.src = "assets/sounds/growl.wav";
        growl.play();

        var gorgan = $("<img>");
        gorgan.attr("src", "assets/images/p1-boss.png")
        gorgan.addClass("boss-image");
        $(bossDiv).append(gorgan);

        setTimeout(function () {
            $(".boss-image").fadeIn(3000);
            $("#boss-stat-card").fadeIn(3000);
        }, 1)


        //boss card ~~~~~~~~~~~~~~~~~~~~~~~~~~

        //player card~~~~~~~~~~~~~~~~~~~

        var p1card = $("<div>");
        p1card.addClass("card player-card");

        var p1img = $("<img>");
        p1img.addClass("card-img-top");
        p1img.attr("src", "https://robohash.org/" + playerInput);
        p1card.append(p1img);

        var p1 = $("<h5>")
        p1.addClass("no-pad");
        p1.addClass("card-title");
        p1.text(playerInput);
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
        attack.addClass("btn btn-danger attack");
        attack.text("Attack!");
        p1card.append(attack);

        setTimeout(function () {
            $(".player-card").fadeIn(2000)
        }, 1)
        //player card~~~~~~~~~~~~~~~~~~~~~~~~~~~

        bossDiv.append(p1card);
        bossDiv.append(bossCard);
        $(".boss-container").append(bossDiv)
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
        theEnd.addClass("thangsOutro");
        theEnd.attr("src", "assets/images/colfaxTheEnd.gif");
        $("#gameId").append(theEnd)
        var newSound = document.createElement("audio");
        newSound.src = "assets/sounds/theme.mp3";
        newSound.play();
        var colfaxStill = $("<img>");
        colfaxStill.attr("src", "assets/images/colfax_thangs_static.gif");
        colfaxStill.addClass("end-still");

        setInterval(function () {
            $("#gameId").html("<h1 class='game-over'> Congradulations!</h1><h1 class='game-over'> You won with a score of: " + playerScore + "</h1>")
            $("#gameId").append(playAgain);
            $("#gameId").append(colfaxStill);
            setTimeout(function () {
                $(".end-still").fadeIn(3000);
            }, 1)
        }, 14500)

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

    if (playerHp <= 0) {
        gameOver();
    }


    //function runs when attack button is pushed
    function attack() {
        if (playerHp && bossHp > 0) {
            bossHp -= playerAp;
            playerScore += 50;
            scoreRef.update({
                playerScore: playerScore
            })
            updateDisplay()
            if (bossHp > 0) {
                $(".boss-image").animate({
                    left: "-=350px"
                }, 150);
                // setTimeout(function () {
                $(".boss-image").animate({
                    left: "+=350px"
                }, 350)
                // }, 150)

                setTimeout(function () {
                    playerHp -= bossAp;
                    $("#p1hp").text("HP: " + playerHp);
                    updateDisplay();
                }, 500);
                setTimeout(function () {
                    if (playerHp <= 0) {
                        gameOver();
                    }
                }, 700)
            } else {
                winning();
            }
            $("#bossHp").text("HP: " + bossHp);
        }
        if (playerHp <= 0) {
            gameOver();

        }
    }

    $(document).on("click", ".attack", function () {

        attack();
        $(".attack").addClass("dis")
        $(".dis").removeClass("attack");
        setTimeout(function () {
            $(".dis").addClass("attack");
            $(".attack").removeClass("dis");
        }, 1200)
    })


    //-----------------------Interactions-----------------------------------

    var interaction = {
        2: {
            story: "You hear a band playing and the music is intoxicating.",

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
                idealChoice: "Go up to the bar and order a drink from a bar tender who is wearing a rainbow-cowboy-hat.",
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
            story: "The smell of bacon permeates the air. You see a line of people down the street and wonder what they are waiting for. When you look up, you see the sign, 'Pete's Kitchen'. ",

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
    var highPlayer = "No one";
    var health = 100;
    var sidekick = [];
    var inventory = [];
    var sidekickChoice; //user selected sidekick
    var door2 = false;
    var door5 = false;
    var door8 = false;

    $(".gamePlay").hide();


    function updateDisplay() {
        sideKitDisplay();
        //Player Stats display --> create function upon game start
        $("#health").html(playerInput + " HP: " + playerHp);
        $("#score").html("Score: " + playerScore);
        scoreRef.update({
            score: playerScore,
        })
        playerRef.update({
            hp: playerHp,
            ap: playerAp,
        })
        bossRef.update({
            hp: bossHp,
            ap: bossAp,
        })
        $(".interactions").hide();
    }

    updateDisplay();

    function itemsDisplay() {
        //need to create items for each scenario
        var image = $("<img>")
        var imgDiv = $("<div>");
        imgDiv.addClass("item img-thumbnail");

        image.attr("src", interaction[counter].itemImg).addClass("imgItems");
        // console.log(image);
        imgDiv.append(image);

        $(".inventory").append(imgDiv);
        inventory.push(interaction[counter].item);
        //push inventory to Firebase
        ref.update({
            inventory: inventory
        })
    }

    function sideKitDisplay() {
        ref.update({
            sidekits: sideKittens,
        })
    }

    function checkDoor() {

        insideMode = true;
        $("#gameId").empty();
        //as door is clicked, read story
        responsiveVoice.speak(interaction[counter].story);
        //changes the background 
        $("#gameId").addClass(interaction[counter].class).removeClass("game-container").removeClass("game-container" + counter);
        var choices = $("<div>");
        // choices.addClass("interactions" + iCounter);
        choices.attr("id", "int");

        $("#game").append(choices)

        //Scenario and choices come up
        console.log("1", door2)
        console.log("2", door5);
        console.log("3", door8);
        beginInteraction();
    }

    function checkForRepeat() {
        if (door8 === false) {
            checkDoor();
        }
        else if (door5 === false) {
            checkDoor()
        }
        else if (door2 === false) {
            checkDoor();
        } else {
            responsiveVoice.speak("You've been here tonight already.")
        }
    }

    $(document).on("click", ".doorNum2", function () {
        door2 = true
    })
    $(document).on("click", ".doorNum5", function () {
        door5 = true
    })
    $(document).on("click", ".doorNum8", function () {
        door8 = true
    })



    //create a function upon click of the door
    $("#gameId").on('click', "#door", function doorExplore() {

        pp1 = $(this)[0].offsetLeft - car.position().left
        pp2 = $(this)[0].offsetTop - car.position().top
        distanceCheck = Math.sqrt((pp1 * pp1) + (pp2 * pp2));

        if (distanceCheck < 150) {
            checkForRepeat()
            // checkDoor()

        } else {
            responsiveVoice.speak("Try getting closer");
        }

    });

    function beginInteraction() {




        $(".interactions").show();
        $(".scenario").html("<h2>Scenario: " + interaction[counter].scenario + "</h2>");
        responsiveVoice.speak(interaction[counter].scenario);
        $(".question").html("<h3>" + interaction[counter].question + "</h3>");
        var x;

        for (x in interaction[counter].answerChoices) {
            var choices = $("<div>");
            choices.text(interaction[counter].answerChoices[x]);
            choices.attr({
                "data-index": x
            });

            choices.addClass("thisChoice");
            $(".userChoices").append(choices);

            // console.log(choices);

        };

        //click events for each choice
        $(".thisChoice").on("click", function () {
            userSelect = $(this).attr("data-index")
            consequencePage();
        })
    }

    function consequencePage() {
        $(".question").empty();
        $(".userChoices").empty();
        $(".gamePlay").show();

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
            // console.log("ideal choice");
            $(".gamePlay").append(" which " + ideal);
            itemsDisplay();
            playerHp += 50;
            playerAp += 10;
            bossHp -= 75;
            bossAp -= 10;
            playerScore += 100;

            updateDisplay();
            $(".continue").show();

        } else if (userSelect == "positiveChoice") {
            // console.log("positive Choice");
            $(".gamePlay").append(": " + positive);
            playerHp += 25;
            playerAp += 15;
            bossHp -= 50;
            bossAp -= 10;
            playerScore += 50;
            updateDisplay();

            // if (userSelect == interaction[2].answerChoices.positiveChoice) {
            //     var image = $("<img>")
            //     var imgDiv = $("<div>");
            //     imgDiv.addClass("item img-thumbnail");
            //     image.attr("src", "assets/images/rupaul.gif");
            //     $(".sidekick").append(imgDiv);
            //     sidekick.push("RuPaul");

            //     ref.push({
            //         sidekick: sidekick
            //     });
            // }
            //return to main map feature
            // updateDisplay();

        } else if (userSelect == "nothingChoice") {
            // console.log("nothing happens");
            $(".gamePlay").append(": " + nothing);
            //add button to end interaction or give user a chance to try again
            playerScore += 1;
            // return to main map feature
            updateDisplay();
        }
        if (userSelect == "negativeChoice") {
            // console.log("negative choice");
            $(".gamePlay").append(": " + negative);

            playerHp -= 25;
            playerScore -= 25;
            bossHp += 50;
            bossAp += 15;
            updateDisplay();
        }

    }



    $("#gameId").on("click", ".continue", function () {
        // console.log("carpos" + carLastPos);
        insideMode = false;
        $("#gameId").addClass("game-container").addClass("game-container" + counter);
        $("#gameId").removeClass(interaction[counter].class);
        $(".userStuff").show();
        trashCanGenerator();
        doorGenerator();
        car.css(carLastPos);
        // console.log("gamejs " + counter);
        $(".gamePlay").show();
    });

    $(document).on("click", "#start-boss", function () {
        bossFight();
    })
});