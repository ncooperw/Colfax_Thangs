//create a function for the (x,y) of the ogden theater. Text pops up on the screen.
//A band is playing and the music is intoxicating. The sprite goes inside.

//The sprite comes to the Ogden theater



$(document).ready(function () {
    //create a function for the (x,y) of the ogden theater. Text pops up on the screen.
    //A band is playing and the music is intoxicating. The sprite goes inside.



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
    var playerAp = 0;
    var playerHp = 0;
    var playerScore = 0;



    //from the start screen, the "play" button is pushed which triggers the following fucntion:

    //sets the initial values of hp and ap for the game
    // $(document).on("click", "startButton", function(){
    // initializeDatabase()
    //load first map-page function
    //})
    initializeDatabase();

    bossRef.on("value", function (snapshot) {
        console.log(snapshot.val())
        bossAp = snapshot.val().ap;
        bossHp = snapshot.val().hp;

        bossRef.update({
            ap: bossAp,
            hp: bossHp,
        })
    });

    playerRef.on("value", function (snapshot) {
        playerAp = snapshot.val().ap;
        playerHp = snapshot.val().hp;

        playerRef.update({
            ap: playerAp,
            hp: playerHp,
        })
    })


    //click function works to update ---will add this functionality when choosing right answer durring question interaction
    $(document).on("click", "#special", function () {
        console.log("clicked")
        bossHp = bossHp + 10;

        bossRef.update({
            hp: bossHp,
            ap: bossAp,
        })
        console.log(bossHp)
    })

    //The sprite comes to the Ogden theater
    var scenario = "You cannot maintain clear thought while the music is playing. You are surrounded by people...at least they look like people, it is hard to tell."
    //Inside
    var interaction = {
        question: "There is an empty container lying at the doorway. Do you:",

        answerChoices: {
            idealChoice: "Grab the container and capture the music",
            nothingChoice: "Turn around and leave",
            negativeChoice: "Go to the bar and get a drink",
            positiveChoice: "You move towards the stage and start dancing."

        },
        consequences: {
            ideal: "increases your health and adds the item to your inventory. Nice!",
            nothing: "nothing happens. You are no closer to uncovering the truth.",
            negative: "Your drink is poisoned. You wake up the next day in the alley and you lose health.",
            positive: "Everyone starts laughing at you because your dancing is off beat. You use your new found notoriety to make a new friend."
        },
        sidekicks: [{
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
    }

    var currrentScenario;
    var userSelect;
    var playContinue = false;
    var playerScore = 0;
    var highScore = 0; //get high score from Firebase
    var health = 100;
    var sidekick = [];
    var inventory = [];
    var sidekickChoice; //user selected sidekick



    //need to hide continue button upon game start
    $("#continueButton").hide();

    function updateDisplay() {
        //Player Stats display --> create function upon game start
        $("#health").html("Player HP: " + health);
        $("#score").html("Score: " + playerScore);
        $("#highScore").html("High Score: " + highScore);
        $(".interactions").hide();

    }

    updateDisplay();

    //create a function upon click of the door
    $("#door1").on('click', function doorExplore() {
        console.log("clicked");
        $(".jumbotron").hide();
        //clicking the door 
        //clear the screen
        $("#door1").hide();
        //hides the game play panel
        $(".gamePlay").hide();

        //changes the background 
        $(".game-container").css('background-image', 'url(assets/images/OgdenTheater.jpg');

        //Scenario and choices come up

        beginInteraction();
    });

    function beginInteraction() {
        $(".interactions").show();
        $(".scenario").html("<h2>Scenario: " + scenario + "</h2>");
        $(".question").html("<h3>" + interaction.question + "</h3>");

        var x;

        // for (var i = 0; i < interaction.answerChoices.length; i++) 
        for (x in interaction.answerChoices) {
            var choices = $("<div>");

            choices.text(interaction.answerChoices[x]);
            choices.attr({
                "data-index": x
            });

            choices.addClass("thisChoice");
            $(".userChoices").append(choices);

            console.log(choices);
        };

        //click events for each choice
        $(".thisChoice").on("click", function () {

            userSelect = $(this).data("index");
            console.log("Index" + userSelect);

            consequencePage();
        })

    }



    function consequencePage() {
        $(".question").empty();
        $(".userChoices").empty();
        $(".gamePlay").show();


        playContinue = true;

        if (playContinue === true) {
            console.log("play Coninue = " + playContinue);
            var next = $("<button>");
            next.text("Continue");
            next.addClass("btn btn-success continue");

            $(".continue").append(next);

        }

        $(".gamePlay").html("You decide to " + userSelect);

        //<-- need to print the user's choice

        console.warn("Need to make this string show" + userSelect);

        var ideal = interaction.consequences.ideal;
        var positive = interaction.consequences.positive;
        var negative = interaction.consequences.negative;
        var nothing = interaction.consequences.nothing;

        //if statements to add consequences for each choice
        if (userSelect == "idealChoice") {
            console.log("ideal choice");
            $(".gamePlay").append(" which " + ideal);
            var container = "Container with mesmerizing music";
            inventory.push(container);
            console.log("inventory" + inventory)

            //update inventory
            $(".inventory").append("<img src='assets/images/musicbox.jpg'/>");

            health += 50;
            playerScore += 100;
            console.log(health);
            console.log(score);
            console.warn("need to add item to inventory");
            //need return to main map feature
            console.warn("need next steps");

            updateDisplay();

        } else if (userSelect == "positiveChoice") {
            console.log("positive Choice");
            $(".gamePlay").append(": " + positive);
            health += 25;
            playerScore += 50;
            //see if you can add a sidekick with the love compatibility API
            console.warn("need to add love compatiblity API")
            //need return to main map feature
            updateDisplay();

            $(".continue").on("click", function () {
                console.log("start sidekick function");
                chooseSidekick();
            });

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
    }

    function chooseSidekick() {
        console.log("I am a function");
        // $(".game-container").css("background-image", "url (null)");
        //game background clears 


        //user is presented with four sidekicks to choose from -- loop through the object
        var x;





        for (x in interaction.sidekicks) {

            console.log("inside sidekick loop");
            var sidekickImg = $("<img>");
            var newDiv = $("<div>");

            newDiv.addClass("card-deck");

            $(".gamePlay").append(newDiv);
            // var sidekickName = interaction.sidekicks[i].name;

            sidekickImg.attr("src", interaction.sidekicks[x].image);

            sidekickImg.addClass("sidekickChoice");
            newDiv.append(sidekickImg);

        }


        //the user clicks the potential sidekick
        //the sidekicks name along with the user's name are put into the love calculator API and the compatability message and percentage is displayed
        //user has a choice to select the sidekick based on the message and percentage
        //percentage of 50% or less = no help, 10 points
        //50% < 75% = increase of 35 hp, 25 points
        //75% < 85% = increase of 50 hp, 50 points
        //>85% = double the hp and double the score
        //sidekick image is added to the .sidekick div
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
    // $(document).on("click", "#fight-boss", function(){
    // bossFight();
    // })


    //game-over function runs when player loses all HP
    function gameOver() {
        //load game-over screen
        $(".boss-container").empty();
        $(".boss-container").html("<h1> Game Over </h1>")

        $(".boss-container").append(playAgain);
    }
    //win function runs when player defeats the boss
    function winning() {
        $(".boss-container").empty();
        $(".boss-container").html("<h1> Congradulations! You won with a score of: " + playerScore + "</h1>")

        $(".boss-container").append(playAgain);



    }


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

    //firebase data for the start of a new game--does not include high score--only data we want to be kept consistnet from one game to another (not high scores and the like)

    function initializeDatabase() {
        playerRef.set({
            hp: 400,
            ap: 20,
        })
        bossRef.set({
            hp: 1000,
            ap: 20,
        })
    }


});