// if counter is not divisable by 3, append sidekick image to game container.

//sidekicks/doors/items needs a minimum pos distance req to hover over and interact with.

//

var progressTotal = 0;
var counter = 0;
var t;
var insideMode = false;
var spawnX;
var spawnY;
var door;
var door = $("<img id='door' src='assets/images/DoorOpening-gif.gif'>");
var car = $("<img class='car' src='assets/images/p1-carRight.png'>");
car.css({
    top: 380,
    left: 0
});
$("#gameId").append(car);
var pos;
var carYAxis;
var trashSpawnPoints = [
    [{
            streetY: 450,
            streetX: 850,
            state: "closed"
        },
        {
            streetY: 120,
            streetX: 850,
            state: "closed"

        },
        {
            streetY: 120,
            streetX: 80,
            state: "closed"

        }
    ],
    [{
            streetY: 125,
            streetX: 80,
            state: "closed"
        },
        {
            streetY: 440,
            streetX: 80,
            state: "closed"

        },
        {
            streetY: 130,
            streetX: 810,
            state: "closed"

        }
    ],
    [{
            streetY: 120,
            streetX: 260,
            state: "closed"
        },
        {
            streetY: 450,
            streetX: 530,
            state: "closed"

        },
        {
            streetY: 450,
            streetX: 20,
            state: "closed"

        }
    ],
    [{
            streetY: 110,
            streetX: 40,
            state: "closed"
        },
        {
            streetY: 450,
            streetX: 400,
            state: "closed"

        },
        {
            streetY: 130,
            streetX: 800,
            state: "closed"

        }
    ],
    [{
            streetY: 120,
            streetX: 145,
            state: "closed"
        },
        {
            streetY: 460,
            streetX: 420,
            state: "closed"

        },
        {
            streetY: 100,
            streetX: 760,
            state: "closed"

        }
    ],
    [{
            streetY: 450,
            streetX: 670,
            state: "closed"
        },
        {
            streetY: 450,
            streetX: 50,
            state: "closed"

        },
        {
            streetY: 150,
            streetX: 620,
            state: "closed"

        }
    ],
    [{
            streetY: 100,
            streetX: 300,
            state: "closed"
        },
        {
            streetY: 95,
            streetX: 840,
            state: "closed"

        },
        {
            streetY: 450,
            streetX: 400,
            state: "closed"

        }
    ],
    [{
            streetY: 110,
            streetX: 200,
            state: "closed"
        },
        {
            streetY: 460,
            streetX: 450,
            state: "closed"

        },
        {
            streetY: 140,
            streetX: 720,
            state: "closed"

        }
    ],
    [{
            streetY: 125,
            streetX: 295,
            state: "closed"
        },
        {
            streetY: 145,
            streetX: 840,
            state: "closed"

        },
        {
            streetY: 440,
            streetX: 210,
            state: "closed"

        }
    ],
    [{
            streetY: 140,
            streetX: 250,
            state: "closed"
        },
        {
            streetY: 450,
            streetX: 240,
            state: "closed"

        },
        {
            streetY: 455,
            streetX: 725,
            state: "closed"

        }
    ],
    [{
            streetY: 130,
            streetX: 660,
            state: "closed"
        },
        {
            streetY: 460,
            streetX: 670,
            state: "closed"

        },
        {
            streetY: 450,
            streetX: 150,
            state: "closed"

        }
    ],
];

trashcanStates = {
    "open": "<img class='trashOpened' src='assets/images/p1-trashcan-opened.png'>",
    "closed": "<img class='trash' src='assets/images/p1-trashcan-unopened.png'>"
};
// doorGenerator();
trashCanGenerator();

function doorGenerator() {

    door.removeAttr("src");
    door.attr("src", 'assets/images/DoorOpening-gif.gif');

    console.log(counter);
    if (counter === 2) {
        door.css({
            top: 105,
            left: 410
        });
        $("#gameId").append(door);
    } else if (counter === 5) {
        door.css({
            top: 79,
            left: 400
        });
        $("#gameId").append(door);
    } else if (counter === 8) {
        door.css({
            top: 132,
            left: 440
        });
        $("#gameId").append(door);
    }
    // door.css({top:100,left:100});
    // $("#gameId").append(door);
}
var randomNumber;
// for (j = 0; j < trashSpawnPoints.length; j++) {
// trash = $("<img class='trash' src='assets/images/p1-trashcan-unopened.png'>")
function trashCanGenerator() {
    randomNumber = Math.floor(Math.random() * 5);
    console.log("rand" + randomNumber);
    $("#gameId").empty();
    car.css({
        top: carYAxis,
        left: 0
    });
    $("#gameId").append(car);
    var trashCan;
    var trashHtml;
    for (xT = 0; xT < trashSpawnPoints[counter].length; xT++) {

        trashCan = trashSpawnPoints[counter][xT];
        trashHtml = $(trashcanStates[trashCan.state]);
        // trashHtml.trashCanIndex = xT;
        trashHtml.attr("data", xT);
        trashHtml.css({
            top: trashCan.streetY,
            left: trashCan.streetX
        });
        $("#gameId").append(trashHtml);
    }
    var pp1;
    var pp2;
    var distanceCheck;
    $(".trash").click(function () {
        //clicking trashcan data2 makes a sidekick/item pop up

        // if ($(this).attr("data") == 2 && distanceCheck < 120){
        // gainSidekick();
        // }

        console.log($(this).attr("data"));

        pp1 = $(this)[0].offsetLeft - car.position().left
        pp2 = $(this)[0].offsetTop - car.position().top
        distanceCheck = Math.sqrt((pp1 * pp1) + (pp2 * pp2));

        if (distanceCheck < 120) {

            //clicking trashcan data2 makes a sidekick/item pop up
            if ($(this).attr("data") == randomNumber) {
                gainSidekick();
            }

            trashSpawnPoints[counter][$(this).attr("data")].state = "open";
            // trashSpawnPoints[counter][$(this).attr("data")].streetX = (trashSpawnPoints[counter][$(this).attr("data")].streetX - 40);
            // trashHtml.css({top: trashCan.streetY, left: trashCan.streetX});
            $(this).attr("src", "assets/images/p1-trashcan-opened.png").addClass("trashOpened").animate({
                left: "-=15px"
            }, 100);
            // trashSpawnPoints[counter][$(this).attr("data")].streetX = (trashSpawnPoints[counter][$(this).attr("data")].streetX -40); 
            // $(".game-container").append(trashHtml);
            console.log($(this)[0].offsetLeft);
            console.log(car.position().left);
        } else {
            responsiveVoice.speak("Try getting closer");

        }
        console.log(distanceCheck);
        // console.log((trashSpawnPoints[counter][$(this).attr("data")].streetX));
    })

}
// for (let yT = 0; yT < trashSpawnPoints[j].streetX.length; yT++) {
//     var spawnY = trashSpawnPoints[j].streetY[yT];
//     trash.css({left: spawnY});
//     $(".game-container").append(trash); 

// }
// $(".game-container").append(trash); 
// var spawnX = trashSpawnPoints[j].streetY[t];
// var spawnY = trashSpawnPoints[j].streetX[t];
// trash = $("<img class='trash' src='assets/images/p1-trashcan-unopened.png'>")
// trash.css({top: spawnX, left: spawnY});
// $(".game-container").append(trash); 

// }
// for (let i = 0; i < 3; i++) {
//     trashSpawnPoints
//     trash = $("<img class='trash' src='assets/images/p1-trashcan-unopened.png'>")
//     trash.css({top: 100, left: 400});
//     $(".game-container").append(trash); 
// }
// doorGenerator();
// var carLastPos;
$(document).keydown(function (e) {

    // car = $("<img id='car' src=assets/images/p1-carRight.png>");
    if (insideMode == false) {
        var pos = car.position();
        var carYAxis = parseInt(pos.top) - 1;
        carLastPos = pos;
        //console.log(pos);
        //console.log(counter);
        //drive left
        if (e.keyCode == 37 || e.keyCode == 65) {
            // $(car).attr("src", "assets/images/p1-carLeft.png").removeClass("carUpDown");
            // $(car).attr("data","west");
            if (counter === 10 && pos.top < 180) {





                //  if ($(car).attr("data") === "north"){
                //     $(car).attr("src","assets/images/p1-car-turning-NW.png").removeClass("carUpDown").addClass("carTurning");
                //     if (pos.top < 210){
                //         car.animate({
                //             top: "-=0px"
                //         }, 100); 
                //     } else {
                //        car.animate({
                //         top: "-=20px"
                //     }, 100); 
                //     }
                //     $(car).removeAttr("data", "north").attr("data", "west");
                // } else if ($(car).attr("data") === "south"){
                //     $(car).attr("src","assets/images/p1-car-turning-WS.png").removeClass("carUpDown").addClass("carTurning");
                //     if (pos.top > 360){
                //         car.animate({
                //             top: "+=0px"
                //         }, 100); 
                //     } else {
                //        car.animate({
                //         top: "+=20px"
                //     }, 100); 
                //     }
                //     $(car).removeAttr("data", "south").attr("data", "west");
                // } else {
                //     $(car).attr("src", "assets/images/p1-carLeft.png");
                //     $(car).attr("data","west").removeClass("carTurning");
                //     car.css("left", "-=50px");
                // }




                if (pos.left < 715) {
                    car.css("left", "-=0px");
                } else {
                    car.css("left", "-=20px");
                }
            }
            if (pos.left < 20) {
                if (counter !== 0) {
                    $("#gameId").removeClass("game-container" + counter);
                    counter--;
                    trashCanGenerator();
                    doorGenerator();
                    $("#gameId").addClass("game-container" + counter);
                    car.css({
                        top: carYAxis,
                        left: 800
                    });

                    console.log("progress total " + progressTotal);
                } else {
                    car.css("left", "-=0px");

                }
            }
            if ($(car).attr("data") === "north") {
                $(car).attr("src", "assets/images/p1-car-turning-NW.png").removeClass("carUpDown").addClass("carTurning");
                if (pos.top < 210) {
                    car.animate({
                        top: "-=0px"
                    }, 100);
                } else {
                    car.animate({
                        top: "-=20px"
                    }, 100);
                }
                $(car).removeAttr("data", "north").attr("data", "west");
            } else if ($(car).attr("data") === "south") {
                $(car).attr("src", "assets/images/p1-car-turning-WS.png").removeClass("carUpDown").addClass("carTurning");
                if (pos.top > 360) {
                    car.animate({
                        top: "+=0px"
                    }, 100);
                } else {
                    car.animate({
                        top: "+=20px"
                    }, 100);
                }
                $(car).removeAttr("data", "south").attr("data", "west");
            } else {
                $(car).attr("src", "assets/images/p1-carLeft.png");
                $(car).attr("data", "west").removeClass("carTurning");
                car.css("left", "-=50px");
            }
        }

        //drive up
        else if (e.keyCode == 38 || e.keyCode == 87) {
            $(car).attr("src", "assets/images/p1-carUp.png").removeClass("carTurning");

            if (counter === 10 && pos.left > 675) {
                // car.css("top", "-=20px");



                // if ($(car).attr("data") === "east"){
                //     $(car).attr("src","assets/images/p1-car-turning-NE.png").addClass("carTurning");
                //     car.animate({
                //         left: "+=20px"
                //     }, 100);
                //     $(car).removeAttr("data", "east").attr("data", "north");

                // } else if ($(car).attr("data") === "west"){
                //     $(car).attr("src","assets/images/p1-car-turning-NW.png").addClass("carTurning");
                //     car.animate({
                //         left: "-=20px"
                //     }, 100);
                //     $(car).removeAttr("data", "west").attr("data", "north");

                // } else {
                //     $(car).attr("data", "north").attr("src", "assets/images/p1-carUp.png").addClass("carUpDown").removeClass("carTurning");
                //     car.css("top", "-=20px");  
                // }


                if (pos.top < 20) {
                    insideMode = true;
                    $("#gameId").empty();
                    $("#gameId").removeClass("game-container" + counter);
                    counter++;
                    $("#gameId").addClass("game-container" + counter);

                    var bossButton = $("<button>");
                    bossButton.addClass("btn btn-danger");
                    bossButton.attr("id", "start-boss");
                    bossButton.text("Fight!")

                    var bossText = $("<div>");
                    bossText.attr("id", "boss-story");
                    bossText.addClass("boss-paragraph");
                    bossText.text("Something russles in the bushes...")
                    setTimeout(function () {
                        responsiveVoice.speak("Prepare to defnd yourself human!");
                        bossText.text("Prepare to defend yourself Human!")
                        bossText.append(bossButton);

                    }, 3000)

                    $(".game-container11").append(bossText);





                    $(document).on("click", "#start-boss", function () {
                        bossFight();
                    })

                }
                console.log(car.position());
            }
            if (pos.top < 210) {
                $(car).attr("data", "north").attr("src", "assets/images/p1-carUp.png").addClass("carUpDown").removeClass("carTurning");
                car.css("top", "-=0px");


            } else if ($(car).attr("data") === "east") {
                $(car).attr("src", "assets/images/p1-car-turning-NE.png").addClass("carTurning");
                car.animate({
                    left: "+=20px"
                }, 100);
                $(car).removeAttr("data", "east").attr("data", "north");

            } else if ($(car).attr("data") === "west") {
                $(car).attr("src", "assets/images/p1-car-turning-NW.png").addClass("carTurning");
                car.animate({
                    left: "-=20px"
                }, 100);
                $(car).removeAttr("data", "west").attr("data", "north");

            } else {
                $(car).attr("data", "north").attr("src", "assets/images/p1-carUp.png").addClass("carUpDown").removeClass("carTurning");
                car.css("top", "-=20px");
            }
        }

        //drive right
        else if (e.keyCode == 39 || e.keyCode == 68) {






            if (counter === 10) {


                //  if ($(car).attr("data") === "north"){
                //     $(car).attr("src","assets/images/p1-car-turning-NE.png").addClass("carTurning").removeClass("carUpDown");
                //     if (pos.top < 210){
                //         car.animate({
                //             top: "-=0px"
                //         }, 100); 
                //     } else {
                //        car.animate({
                //         top: "-=20px"
                //     }, 100); 
                //     }
                //     $(car).removeAttr("data", "north").attr("data", "east");
                // } else if ($(car).attr("data") === "south"){
                //     $(car).attr("src","assets/images/p1-car-turning-ES.png").removeClass("carUpDown").addClass("carTurning");
                //     if (pos.top > 360){
                //         car.animate({
                //             top: "+=0px"
                //         }, 100); 
                //     } else {
                //        car.animate({
                //         top: "+=20px"
                //     }, 100); 
                //     }
                //     $(car).removeAttr("data", "south").attr("data", "east");
                // } 


                if (pos.left > 775) {
                    car.css("left", "-=0px");
                    responsiveVoice.speak("Look up there, go north");
                } else {
                    car.css("left", "+=50px");
                }
            } else if (pos.left > 800) {
                $("#gameId").removeClass("game-container" + counter);
                counter++;
                $("#gameId").addClass("game-container" + counter);
                if (counter > progressTotal) {
                    progressTotal++;
                }
                trashCanGenerator();
                doorGenerator();
                console.log("progress total " + progressTotal);
                console.log("counter " + counter);
                car.css({
                    top: carYAxis,
                    left: 0
                });
            } else if ($(car).attr("data") === "north") {
                $(car).attr("src", "assets/images/p1-car-turning-NE.png").addClass("carTurning").removeClass("carUpDown");
                if (pos.top < 210) {
                    car.animate({
                        top: "-=0px"
                    }, 100);
                } else {
                    car.animate({
                        top: "-=20px"
                    }, 100);
                }
                $(car).removeAttr("data", "north").attr("data", "east");
            } else if ($(car).attr("data") === "south") {
                $(car).attr("src", "assets/images/p1-car-turning-ES.png").removeClass("carUpDown").addClass("carTurning");
                if (pos.top > 360) {
                    car.animate({
                        top: "+=0px"
                    }, 100);
                } else {
                    car.animate({
                        top: "+=20px"
                    }, 100);
                }
                $(car).removeAttr("data", "south").attr("data", "east");
            } else {
                $(car).attr("src", "assets/images/p1-carRight.png").removeClass("carTurning carUpDown").attr("data", "east");
                car.css("left", "+=50px");
            }
        }

        //drive down
        else if (e.keyCode == 40 || e.keyCode == 83) {
            $(car).attr("src", "assets/images/p1-carDown.png").removeClass("carTurning");
            if (pos.top > 360) {
                $(car).attr("data", "south").attr("src", "assets/images/p1-carDown.png").addClass("carUpDown");
                car.css("top", "+=0px");
            } else if ($(car).attr("data") === "east") {
                $(car).removeAttr("data", "east").attr("data", "south");
                car.animate({
                    left: "+=20px"
                }, 100);
                $(car).attr("src", "assets/images/p1-car-turning-ES.png").addClass("carTurning");
            } else if ($(car).attr("data") === "west") {
                $(car).removeAttr("data", "west").attr("data", "south");
                car.animate({
                    left: "-=20px"
                }, 100);
                $(car).attr("src", "assets/images/p1-car-turning-WS.png").addClass("carTurning");
            } else {
                $(car).attr("data", "south").attr("src", "assets/images/p1-carDown.png").addClass("carUpDown").removeClass("carTurning");
                car.css("top", "+=20px");
            }
        }
    }
})


var kittens = ["Devin", "Jen", "Jared", "Dylan", "Charlie", "Bryan", "Colin"];

function gainSidekick() {

    var arrNum = Math.floor(Math.random() * kittens.length);
    var sidekit = $("<img>");
    var displayDiv = $("<div>");
    var kittenName = $("<p class='text-center'>" + kittens[arrNum] + "</p>");
    var apiImage = "https://robohash.org/" + kittens[arrNum] + "/?set=set4";
    sidekit.attr("src", apiImage).addClass("imgItems img-thumbnail");
    console.log(apiImage);
    displayDiv.addClass("item");
    displayDiv.append(sidekit).append(kittenName);
    $("#gameId").append(displayDiv);
    $(".sidekick").append(displayDiv);
    kittens.splice(arrNum, 1);
    console.log(kittens);
}