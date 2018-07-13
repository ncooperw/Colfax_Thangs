// if counter is not divisable by 3, append sidekick image to game container.

//sidekicks/doors/items needs a minimum pos distance req to hover over and interact with.

//
var progressTotal = 0;
var counter = 8;
var t;

var spawnX;
var spawnY;
var car = $("<img class='car' src='assets/images/p1-carRight.png'>");
car.css({top: 200, left: 0});
$("#gameId").append(car);
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
            streetY: 100,
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
            streetY: 95,
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

trashcanStates = {
    "open" :  "<img class='trashOpened' src='assets/images/p1-trashcan-opened.png'>",
    "closed" :  "<img class='trash' src='assets/images/p1-trashcan-unopened.png'>"
};

// for (j = 0; j < trashSpawnPoints.length; j++) {
    // trash = $("<img class='trash' src='assets/images/p1-trashcan-unopened.png'>")
    function trashCanGenerator() {
        $("#gameId").empty();
        car.css({top: carYAxis, left: 0});
        $("#gameId").append(car);
        var trashCan;
        var trashHtml;
        for (xT = 0; xT < trashSpawnPoints[counter].length; xT++) {
            
                trashCan = trashSpawnPoints[counter][xT];
                trashHtml = $(trashcanStates[trashCan.state]);
                // trashHtml.trashCanIndex = xT;
                trashHtml.attr("data", xT);
                trashHtml.css({top: trashCan.streetY, left: trashCan.streetX});
                $("#gameId").append(trashHtml);
        }
        $(".trash").click(function() {
            
                var pp1 =  $(this)[0].offsetLeft - car.position().left
                var pp2 = $(this)[0].offsetTop  - car.position().top
                var distanceCheck = Math.sqrt((pp1 * pp1) + (pp2 * pp2));

            if(distanceCheck < 120) {
            trashSpawnPoints[counter][$(this).attr("data")].state = "open";
            // trashSpawnPoints[counter][$(this).attr("data")].streetX = (trashSpawnPoints[counter][$(this).attr("data")].streetX - 40);
            // trashHtml.css({top: trashCan.streetY, left: trashCan.streetX});
            $(this).attr("src", "assets/images/p1-trashcan-opened.png").addClass("trashOpened").animate({left:"-=15px"}, 100);
            // trashSpawnPoints[counter][$(this).attr("data")].streetX = (trashSpawnPoints[counter][$(this).attr("data")].streetX -40); 
            // $(".game-container").append(trashHtml);
            console.log($(this)[0].offsetLeft);
            console.log(car.position().left);
            } else {
                //audio "drive closer"
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


$(document).keydown(function(e) {
    // car = $("<img id='car' src=assets/images/p1-carRight.png>");
    var pos = car.position();
    var carYAxis = parseInt(pos.top)-1;
    //console.log(pos);
    //console.log(counter);
    //drive left
    if (e.keyCode == 37 || e.keyCode == 65) {
        $(car).attr("src", "assets/images/p1-carLeft.png").removeClass("carUpDown");
        if (counter === 10 && pos.top < 180){
            if (pos.left < 715) {
                car.css("left", "-=0px");
            } else {
                car.css("left", "-=20px"); 
            }
        }
        else if (pos.left < 10) {
            $("#gameId").removeClass("game-container" + counter);
            counter--;
            // progress = false;
            // progressTotal = false;
            trashCanGenerator();
            $("#gameId").addClass("game-container" + counter);
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
    else if (e.keyCode == 38 || e.keyCode == 87) {
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
    else if (e.keyCode == 39 || e.keyCode == 68) {
        $(car).attr("src", "assets/images/p1-carRight.png").removeClass("carUpDown");
        if (counter === 10){
            if (pos.left > 755) {
                car.css("left", "-=0px");
            } else {
                car.css("left", "+=50px"); 
            }
        } else if (pos.left > 800) {
            $("#gameId").removeClass("game-container" + counter);
            counter++;
            if (counter > progressTotal) {
                progressTotal++;
            }
            
            trashCanGenerator();
            $("#gameId").addClass("game-container" + counter);
            console.log("progress total "+progressTotal);
            console.log("counter " + counter);
            car.css({top: carYAxis, left: 0});
           
        } else {
            car.css("left", "+=50px");
        
        }
    }

    //drive down
    else if (e.keyCode == 40 || e.keyCode == 83) {
        $(car).attr("src", "assets/images/p1-carDown.png").addClass("carUpDown");
        if (pos.top > 360){
            car.css("top", "+=0px"); 
            } else {
               
                car.css("top", "+=20px"); 
            }
    }
    //door show and hide

    // if (counter % 3 == 0) {
    //     console.log("show door");
    //     $("#door").show();
    // } else {
    //     $("#door").hide();
    //     console.log("hide door");
    // }

    //sidekicks come up
    
    // if (counter % 2 == 0) {
    //     console.log("sidekick time");
    //     gainSidekick();
    // }
    
});    

function gainSidekick() {
    var sparkleDiv = $("<div>");
    sparkleDiv.addClass("sparkle");

    var sparkleImage = "<img src='assets/images/sparkle.gif'/>";

    sparkleDiv.append(sparkleImage);
    sparkleDiv.hide();
    $("#buttonSpot").append(sparkleDiv);
    $(".sparkle").on("click", function () {

        $(".sparkle").hide();

        var sidekicks = ["bum", "prostitute", "mangie+dog", "drug dealer"]


        var limit = 1;

        var input = sidekicks[iCounter];

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


