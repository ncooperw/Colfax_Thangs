//The sprite comes to the Ogden theater

//Inside
var interactionQuestions ={
    question: 
    "There is an empty container lying at the doorway. Do you:", answerChoices: ["Grab the container and capture the music", "Turn around and leave", "Go to the bar and get a drink", "You move towards the stage and start dancing."],
    consequences: ["increase the users power", "nothing happens", "Your drink is poisoned. You wake up the next day in the alley and you lose power.", "Everyone starts laughing at you because your dancing is off beat."]
}

console.log(interactionQuestions.question);
console.log(interactionQuestions.answerChoices[0]);

//create a function for the (x,y) of the ogden theater. Text pops up on the screen.
//A band is playing and the music is intoxicating. The sprite goes inside. 


//create a rectangle for door -- id=door1

//create a function upon click of the door
$("#door1").on('click', function () {
    console.log("clicked");
    //clicking the door 
    //clear the screen
    $("#door1").hide();
    //changes the background 
    $(".game-container").css('background-image', 'url(assets/images/OgdenTheater.jpg');

//table comes up with the choices
$(".interactions").append(
        '<tr><td>' + interactionQuestions.question +
        '</td></tr><tr><td>' + interactionQuestions.answerChoices[0] +
        '</td><td>' + interactionQuestions.answerChoices[1] +
        '</td></tr><tr><td>' + interactionQuestions.answerChoices[2] +
        '</td><td>' + interactionQuestions.answerChoices[3] + '</td></tr>'
    );

});

//if statements to add consequences for each choice
//click events for each choice


