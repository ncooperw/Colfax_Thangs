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

    var ref = database.ref("game")
    var playerRef = ref.child("player1");
    var bossRef = ref.child("boss");
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

    //-----------------------Interactions-----------------------------------
    //The sprite comes to the Ogden theater

    //Inside

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
            }
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
        },
        {
            story: "Charlies",

            scenario: "Charlies",

            question: "Charlies",

            answerChoices: {
                negativeChoice: "Bad Charlies",
                nothingChoice: "NOthing",
                idealChoice: "Ideal",
                positiveChoice: "Good"
            },
            consequences: {
                ideal: "increases your health and adds the item to your inventory. Nice!",
                nothing: "nothing happens. You are no closer to uncovering the truth.",
                negative: "Your drink is poisoned. You wake up the next day in the alley and you lose health.",
                positive: "Everyone starts laughing at you because your dancing is off beat. You use your new found notoriety to make a new friend."
            }
        }

    ];


    var currrentScenario;
    var userSelect;
    var playContinue = false;
    var playerScore = 0;
    var highScore = 0; //get high score from Firebase
    var health = 100;
    var sidekick = [];
    var inventory = [];
    var sidekickChoice; //user selected sidekick
    var iCounter = 0;


    //need to hide continue button upon game start
    //$("#continueButton").hide();

    function updateDisplay() {
        //Player Stats display --> create function upon game start
        $("#health").html("Player HP: " + health);
        $("#score").html("Score: " + playerScore);
        $("#highScore").html("High Score: " + highScore);
        $(".interactions").hide();

    }

    updateDisplay();

    //create a function upon click of the door
    $("#door").on('click', function doorExplore() {
        console.log("clicked");
        //clear the screen
        $("#door").hide();
        //hides the game play panel
        $(".gamePlay").hide();

        //changes the background 
        $(".game-container").addClass("interactions" + iCounter);

        //Scenario and choices come up

        beginInteraction();
    });

    function beginInteraction() {
        $(".interactions").show();
        $(".scenario").html("<h2>Scenario: " + interaction[iCounter].scenario + "</h2>");
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
       continueButton(); 
    
    })

    }

    function continueButton() {

        playContinue = true;

        if (playContinue === true) {
            console.log("play Coninue = " + playContinue);
            var next = $("<button>");
            next.text("Continue");
            next.addClass("btn btn-success continue");

            $(".continue").append(next);
        }
    }



    function consequencePage() {
        $(".question").empty();
        $(".userChoices").empty();
        $(".gamePlay").show();
    }
    // update and alert users choice

    $(".gamePlay").html("You decide to " + interaction[iCounter].answerChoices[userSelect]);

    var ideal = interaction[iCounter].consequences.ideal;
    var positive = interaction[iCounter].consequences.positive;
    var negative = interaction[iCounter].consequences.negative;
    var nothing = interaction[iCounter].consequences.nothing;

    //if statements to add consequences for each choice
    if (userSelect == "idealChoice") {
        console.log("ideal choice");
        $(".gamePlay").append(" which " + ideal);
        var container = "Container with mesmerizing music";
        inventory.push(container);
        console.log("inventory" + inventory)

        //update inventory

        //need to create items for each scenario
        var stuff = {
            item: ["music box with powerful music", "Golden fork", "cowboy hat and chaps", "Theyperdermic needle of destruction"],
            image: "<img src='assets/images/musicbox.jpg'/>"
        }
        //var itemsByIndex = ;
        Console.warn("need items by interaction in the interaction object");
        $(".inventory").append("<img src='assets/images/musicbox.jpg'/>");
        inventory.push("stuff.item[iCounter]");
        console.log(inventory);

        health += 50;
        playerScore += 100;
        console.log(health);
        console.log(score);

        //need return to main map feature
        console.warn("need next steps");

        updateDisplay();

    } else if (userSelect == "positiveChoice") {
        console.log("positive Choice");
        $(".gamePlay").append(": " + positive);
        health += 25;
        playerScore += 50;


        //need return to main map feature
        updateDisplay();
        // chooseSidekick();



    } else if (userSelect == "nothingChoice") {
        console.log("nothing happens");
        $(".gamePlay").append(": " + nothing);
        //add button to end interaction or give user a chance to try again
        console.warn("need next steps");
        //need return to main map feature


        updateDisplay();

    }
    if (userSelect == "negativeChoice") {
        console.log("negative choice");
        $(".gamePlay").append(": " + negative);
        health -= 25;
        playerScore -= 25;
        console.warn("need next steps");
        //need return to main map feature


        updateDisplay();
    }
},

$(".continue").on("click", function () {
    console.log("continue was clicked");

    playContinue = false;
    $(".game-container").removeClass("interactions" + iCounter)

    //.addClass("game-container" + counter);

    console.log("gamejs " + counter);

    iCounter++;
    $("#door").show();
    //hides the game play panel
    $(".gamePlay").hide();

    //$(".continue").hide();
    console.warn("need to hide and show button");

}));

//sidekick function
//----------------------------------------------------
//being nice to a sidekick that you come across gives you a sidekick to use in battle.
//sidekick can come from giphy api (bum, prostitute, mangie dog, drug dealer)

function gainSidekick() {

    console.log("I am a function");
    var sidekicks = [{
            name: "Bob",
            image: "assets/images/bobsidekick.png"
        },
        {
            name: "Jimmy",
            image: "assets/images/jimmysidekick.png"
        },
        {
            name: "Maria",
            image: "assets/images/mariasidekick.png"
        },
        {
            name: "Terry",
            image: "assets/images/terrysidekick.jpg"
        }
    ]
    //create a class for the side kick interaction
    // $(".game-container").addClass


    //game background clears 
    //see if you can add a sidekick with the love compatibility API

    //user is presented with four sidekicks during a interaction 
    //connect to the api





}



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


