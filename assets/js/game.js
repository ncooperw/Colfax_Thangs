// if counter is not divisable by 3, append sidekick image to game container.

//sidekicks/doors/items needs a minimum pos distance req to hover over and interact with.

//
var progressTotal = 0;
// var progress = true;
var counter = 0;
var t;
// var trash;
var spawnX;
var spawnY;
var car = $("<img class='car' src='assets/images/p1-carRight.png'>");
car.css({top: 200, left: 0});
$(".game-container").append(car);
var pos;
var carYAxis;
var trashSpawnPoints = [
    [
        {
            streetY: 100,
            streetX: 350,
            state: "closed"
        },
        {
            streetY: 150,
            streetX: 300,
            state: "closed"

        },
        {
            streetY: 170,
            streetX: 420,
            state: "closed"

        }
    ],
    [
        {
            streetY: 120,
            streetX: 80,
            state: "closed"
        },
        {
            streetY: 430,
            streetX: 90,
            state: "closed"

        },
        {
            streetY: 120,
            streetX: 820,
            state: "closed"

        }
    ],
    [
        {
            streetY: 110,
            streetX: 260,
            state: "closed"
        },
        {
            streetY: 450,
            streetX: 550,
            state: "closed"

        },
        {
            streetY: 450,
            streetX: 20,
            state: "closed"

        }
    ],
    [
        {
            streetY: 90,
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
    [
        {
            streetY: 120,
            streetX: 135,
            state: "closed"
        },
        {
            streetY: 450,
            streetX: 450,
            state: "closed"

        },
        {
            streetY: 150,
            streetX: 800,
            state: "closed"

        }
    ],
    [
        {
            streetY: 450,
            streetX: 690,
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
    [
        {
            streetY: 100,
            streetX: 300,
            state: "closed"
        },
        {
            streetY: 80,
            streetX: 880,
            state: "closed"

        },
        {
            streetY: 450,
            streetX: 400,
            state: "closed"

        }
    ],
    [
        {
            streetY: 90,
            streetX: 200,
            state: "closed"
        },
        {
            streetY: 460,
            streetX: 480,
            state: "closed"

        },
        {
            streetY: 140,
            streetX: 720,
            state: "closed"

        }
    ],
    [
        {
            streetY: 117,
            streetX: 250,
            state: "closed"
        },
        {
            streetY: 140,
            streetX: 880,
            state: "closed"

        },
        {
            streetY: 430,
            streetX: 210,
            state: "closed"

        }
    ],
    [
        {
            streetY: 140,
            streetX: 250,
            state: "closed"
        },
        {
            streetY: 450,
            streetX: 200,
            state: "closed"

        },
        {
            streetY: 450,
            streetX: 725,
            state: "closed"

        }
    ],
    [
        {
            streetY: 130,
            streetX: 660,
            state: "closed"
        },
        {
            streetY: 460,
            streetX: 880,
            state: "closed"

        },
        {
            streetY: 450,
            streetX: 150,
            state: "closed"

        }
    ],
];
// var trashSpawnPoints = [
//     {
//         streetY:[100, 150, 150],
//         streetX:[350, 400, 600],
//         state: ["closed","closed","closed"]
//     },
//     {
//         streetY:[100, 150, 150],
//         streetX:[350, 400, 600],
//         state: ["closed","closed","closed"]
//     },
//     {
//         streetY:[100, 100, 420],
//         streetX:[80, 200, 300],
//         state: ["closed","closed","closed"]
//     },
//     {
//         streetY:[160, 180, 190],
//         streetX:[300, 410, 500],
//         state: ["closed","closed","closed"]
//     },
//     {
//         streetY:[50, 150, 200],
//         streetX:[30, 600, 700],
//         state: ["closed","closed","closed"]

//     },
//     {
//         streetY:[100, 150, 150],
//         streetX:[350, 400, 600],
//         state: ["closed","closed","closed"]
//     },
//     {
//         streetY:[100, 150, 150],
//         streetX:[350, 400, 600],
//         state: ["closed","closed","closed"]
//     },
//     {
//         streetY:[100, 150, 150],
//         streetX:[350, 400, 600],
//         state: ["closed","closed","closed"]

//     },
//     {
//         streetY:[100, 150, 150],
//         streetX:[350, 400, 600],
//         state: ["closed","closed","closed"]

//     },
//     {
//         streetY:[100, 150, 150],
//         streetX:[350, 400, 600],
//         state: ["closed","closed","closed"]

//     },
//     {
//         streetY:[100, 150, 150],
//         streetX:[350, 400, 600],
//         state: ["closed","closed","closed"]

//     },
// ]
trashcanStates = {
    "open" :  "<img class='trash' src='assets/images/p1-trashcan-opened.png'>",
    "closed" :  "<img class='trash' src='assets/images/p1-trashcan-unopened.png'>"
};

// for (j = 0; j < trashSpawnPoints.length; j++) {
    // trash = $("<img class='trash' src='assets/images/p1-trashcan-unopened.png'>")
    function trashCanGenerator() {
        $(".game-container").empty();
        car.css({top: carYAxis, left: 0});
        $(".game-container").append(car);


    

        for (xT = 0; xT < trashSpawnPoints[counter].length; xT++) {
            // if (progressTotal <= counter){

                var trashCan = trashSpawnPoints[counter][xT];
                var trashHtml = $(trashcanStates[trashCan.state]);
                trashHtml.css({top: trashCan.streetY, left: trashCan.streetX});
                $(".game-container").append(trashHtml);

                // var trash = $(trashcanStates[trashSpawnPoints[counter].state[xT]]);
                // var spawnX = trashSpawnPoints[counter].streetY[xT];
                // var spawnY = trashSpawnPoints[counter].streetX[xT];
                // trash.css({top: spawnX, left: spawnY});
                // $(".game-container").append(trash); 



            // } else if (progress===false) {
            //     trash = $("<img class='trashOpened' src='assets/images/p1-trashcan-opened.png'>");
            //     var spawnX = trashSpawnPoints[counter].streetY[xT];
            //     var spawnY = trashSpawnPoints[counter].streetX[xT];
            //     trash.css({top: spawnX, left: spawnY});
            //     $(".game-container").append(trash); 
            // } else {
            //     trash = $("<img class='trashOpened' src='assets/images/p1-trashcan-opened.png'>");
            //     var spawnX = trashSpawnPoints[counter].streetY[xT];
            //     var spawnY = trashSpawnPoints[counter].streetX[xT];
            //     trash.css({top: spawnX, left: spawnY});
            //     $(".game-container").append(trash); 
            // }
        }

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


$(document).keydown(function(e) {
    // car = $("<img id='car' src=assets/images/p1-carRight.png>");
    // progressTotal = counter;
    pos = car.position();
    carYAxis = parseInt(pos.top)-1;
    console.log(pos);
    console.log(counter);
    //drive left
    if (e.keyCode == 37) {
        $(car).attr("src", "assets/images/p1-carLeft.png").removeClass("carUpDown");
        if (counter === 10 && pos.top < 180){
            if (pos.left < 715) {
                car.css("left", "-=0px");
            } else {
                car.css("left", "-=20px"); 
            }
        }
        else if (pos.left < 10) {
            $(".game-container").removeClass("game-container" + counter);
            counter--;
            // progress = false;
            // progressTotal = false;
            trashCanGenerator();
            $(".game-container").addClass("game-container" + counter);
            car.css({top: carYAxis, left: 800});
            // console.log("progress "+progress);
            console.log("progress total "+progressTotal);

            } else {
                // $(car).attr("src", "assets/images/p1-carLeft.png");
                car.css("left", "-=50px"); 
            }
            
        // car.css("left", "-=20px");  
    }

    //drive up
    else if (e.keyCode == 38) {
        $(car).attr("src", "assets/images/p1-carUp.png").addClass("carUpDown");
        if (counter === 10 && pos.left > 615){
            car.css("top", "-=20px");
        } 
        else if (pos.top < 200){
        car.css("top", "-=0px"); 
        } else {
            // $(car).attr("src", "assets/images/p1-carUp.png");
            car.css("top", "-=20px");
            console.log(carYAxis); 
        }
    }

    //drive right
    else if (e.keyCode == 39) {
        $(car).attr("src", "assets/images/p1-carRight.png").removeClass("carUpDown");
        if (counter === 10 && pos.top < 180){
            if (pos.left > 755) {
                car.css("left", "-=0px");
            } else {
                car.css("left", "+=20px"); 
            }
        } else if (pos.left > 800) {
            $(".game-container").removeClass("game-container" + counter);
            counter++;
            if (counter > progressTotal) {
                progressTotal++;
            }
            
            trashCanGenerator();
            $(".game-container").addClass("game-container" + counter);
            console.log("progress total "+progressTotal);
            // console.log("progress "+progress);

            // console.log("progress "+progress);


            
            
            trashCanGenerator();
            $(".game-container").addClass("game-container" + counter);
            // console.warn(carYAxis)
            // console.log("progress "+progress);


            car.css({top: carYAxis, left: 0});
           
        } else {
            // $(car).attr("src", "assets/images/p1-carRight.png");
            car.css("left", "+=50px");
        // car.animate("left", "+=20px"); 
 
        }
    }

    //drive down
    else if (e.keyCode == 40) {
        $(car).attr("src", "assets/images/p1-carDown.png").addClass("carUpDown");
        if (pos.top > 360){
            car.css("top", "+=0px"); 
            } else {
                // $(car).attr("src", "assets/images/p1-carDown.png");
                car.css("top", "+=20px"); 
            }
    }
    
});    

