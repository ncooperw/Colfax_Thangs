//add classes for background by interaction and a interaction counter iCounter
//for each interaction, add and remove classes for the appropriate interactions

//css will overlay the game-container class by using interaction+icounter

//with continue click remove class (interaction +iCounter) iCounter ++, add class (game-container + counter)

$(document).ready(function () {
    //create a function for the (x,y) of the ogden theater. Text pops up on the screen.
    //A band is playing and the music is intoxicating. The sprite goes inside.

    //The sprite comes to the Ogden theater

    //Inside
    var interaction =
        {
            scenario: "You cannot maintain clear thought while the music is playing. You are surrounded by people...at least they look like people, it is hard to tell.",

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
    var iCounter = 1;


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
        $(".game-container").addClass("interactions1");

        //Scenario and choices come up

        beginInteraction();
    });

    function beginInteraction() {
        $(".interactions").show();
        $(".scenario").html("<h2>Scenario: " + interaction.scenario + "</h2>");
        $(".question").html("<h3>" + interaction.interaction+iCounter.question + "</h3>");

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


        playContinue = true;

        if (playContinue === true) {
            console.log("play Coninue = " + playContinue);
            var next = $("<button>");
            next.text("Continue");
            next.addClass("btn btn-success continue");

            $(".continue").append(next);

        }

        $(".gamePlay").html("You decide to " + interaction.answerChoices[userSelect]);

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
            chooseSidekick();



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

    $(".continue").on("click", function () {
        console.log("start sidekick function");

        playContinue = false;
        $(".game-container").removeClass("interactions" + iCounter).addClass("game-container" + counter);

        console.log("gamejs " + counter);

        iCounter++;


    });


    function chooseSidekick() {

        console.log("I am a function");
        // $(".game-container").css("background-image", "url (null)");
        //game background clears 


        //user is presented with four sidekicks to choose from -- loop through the object
        var x;

        // var sideImageArr = Object.keys(interaction.sidekicks.image);
        // console.log(sideImageArr);



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
});