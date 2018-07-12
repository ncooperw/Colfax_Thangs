// if counter is not divisable by 3, append sidekick image to game container.

//sidekicks/doors/items needs a minimum pos distance req to hover over and interact with.

//


var counter = 1;
var car = $("<img class='car' src=assets/images/p1-carRight.png>");
car.css({top: 200, left: 0});
$(".game-container").append(car);
$(document).keydown(function(e) {
    // car = $("<img id='car' src=assets/images/p1-carRight.png>");
    var pos = car.position();
    var carYAxis = parseInt(pos.top)-1;
    //console.log(pos);
    //console.log(counter);
    //drive left
    if (e.keyCode == 37) {
        $(car).attr("src", "assets/images/p1-carLeft.png").removeClass("carUpDown");
        if (counter === 11 && pos.top < 180){
            if (pos.left < 715) {
                car.css("left", "-=0px");
            } else {
                car.css("left", "-=20px"); 
            }
        }
        else if (pos.left < 10) {
            $(".game-container").removeClass("game-container" + counter);
            counter--;
            $(".game-container").addClass("game-container" + counter);
            car.css({top: carYAxis, left: 800});

            } else {
                // $(car).attr("src", "assets/images/p1-carLeft.png");
                car.css("left", "-=20px"); 
            }
            
        // car.css("left", "-=20px");  
    }

    //drive up
    else if (e.keyCode == 38) {
        $(car).attr("src", "assets/images/p1-carUp.png").addClass("carUpDown");
        if (counter === 11 && pos.left > 615){
            car.css("top", "-=10px");
        } 
        else if (pos.top < 200){
        car.css("top", "-=0px"); 
        } else {
            // $(car).attr("src", "assets/images/p1-carUp.png");
            car.css("top", "-=10px");
            console.log(carYAxis); 
        }
    }

    //drive right
    else if (e.keyCode == 39) {
        $(car).attr("src", "assets/images/p1-carRight.png").removeClass("carUpDown");
        if (counter === 11 && pos.top < 180){
            if (pos.left > 755) {
                car.css("left", "-=0px");
            } else {
                car.css("left", "+=20px"); 
            }
        } else if (pos.left > 800) {
            $(".game-container").removeClass("game-container" + counter);
            counter++;
            $(".game-container").addClass("game-container" + counter);
            console.warn(carYAxis)
            car.css({top: carYAxis, left: 0});
           
        } else {
            // $(car).attr("src", "assets/images/p1-carRight.png");
            car.css("left", "+=20px");
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
                car.css("top", "+=10px"); 
            }
    }
    //door show and hide

    if (counter % 3 == 0) {
        console.log("show door");
        $("#door").show();
    } else {
        $("#door").hide();
        console.log("hide door");
    }

    //sidekicks come up
    
    if (counter % 2 == 0) {
        console.log("sidekick time");
        gainSidekick();
    }
    
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


