//create a function for the (x,y) of the ogden theater. Text pops up on the screen.
//A band is playing and the music is intoxicating. The sprite goes inside.

//The sprite comes to the Ogden theater
var scenario = "You cannot maintain clear thought while the music is playing. You are surrounded by people...at least they look like people, it is hard to tell."
//Inside
var interactionOgden = {
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
    }
}

var currrentScenario;
var userSelect;
var playerScore = 0;
var highScore = 0; //get high score from Firebase
var health = 100;

console.log(interactionOgden.question);
console.log(interactionOgden.answerChoices.idealChoice);
console.log(interactionOgden.consequences.ideal);

function updateDisplay() {
    //Player Stats display --> create function upon game start
    $("#health").html("Player HP: " + health);
    $("#score").html("Score: " + playerScore);
    $("#highScore").html("High Score: " + highScore);
    $(".consequence").html("Look here for the answers along your quest");
    $(".inventory").html("You carry these items on your person.");
}
//create a rectangle for door -- id=door1
updateDisplay();
//create a function upon click of the door
$("#door1").on('click', function doorExplore() {
    console.log("clicked");
    $(".jumbotron").hide();
    //clicking the door 
    //clear the screen
    $("#door1").hide();
    //changes the background 
    $(".game-container").css('background-image', 'url(assets/images/OgdenTheater.jpg');

    //Scenario and choices come up

    beginInteraction();
});

function beginInteraction() {


    $(".scenario").html("<h2>Scenario: " + scenario + "</h2>");
    $(".question").html("<h3>" + interactionOgden.question + "</h3>");

    var text = "";
    var x;

    // for (var i = 0; i < interactionOgden.answerChoices.length; i++) 
    for (x in interactionOgden.answerChoices) {
        var choices = $("<div>");

        choices.text(interactionOgden.answerChoices[x]);
        choices.attr({
            "data-index": x
        });

        choices.addClass("thisChoice");
        $(".userChoices").append(choices);

        console.log(choices);
    };

    $(".thisChoice").on("click", function () {

        userSelect = $(this).data("index");
        console.log("Index" + userSelect);

        consequencePage();
    })

}

// consequences: {
//     ideal:"increase the users power", 
//     nothing: "nothing happens", 
//     negative: "Your drink is poisoned. You wake up the next day in the alley and you lose power.",
//     positive: "Everyone starts laughing at you because your dancing is off beat. You use your new found notoriety to make a new friend."}

// <div class="scenario"></div>
// <div class="question"></div>
// <div class="userChoices"></div>
// <div id="health"></div>
// <div id="score"></div>
// <div class="consequences"></div>

function consequencePage() {
    $(".question").empty();
    $(".userChoices").empty();

    $(".scenario").html("You decide to " + userSelect);

    //<-- need to print the user's choice

    console.warn("Need to make this string show" + userSelect);

    var ideal = interactionOgden.consequences.ideal;
    var positive = interactionOgden.consequences.positive;
    var negative = interactionOgden.consequences.negative;
    var nothing = interactionOgden.consequences.nothing;

    if (userSelect == "idealChoice") {
        console.log("Yes it works");
        $(".scenario").append(" which " + ideal);
        $(".inventory").append("Container of mesmerizing music");
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
        $(".scenario").append(": " + positive);
        health += 25;
        playerScore += 50;
        //see if you can add a sidekick with the love compatibility API
        console.warn("need to add love compatiblity API")
        //need return to main map feature
        updateDisplay();
    } else if (userSelect == "nothingChoice"){
        console.log ("nothing happens");
        $(".scenario").append(": " + nothing);
        //add button to end interaction or give user a chance to try again
        console.warn("need next steps");
        //need return to main map feature
        updateDisplay();

    } if( userSelect == "negativeChoice"){
        console.log("negative choice");
        $(".scenario").append(": " + negative);
        health -= 25;
        playerScore -= 25;
        console.warn("need next steps");
        //need return to main map feature
        updateDisplay();
    }
}
//if statements to add consequences for each choice
//click events for each choice