

//game start, title screen needs to go away

//game start

//user need to enter his/her name to use with the love compatability API to gain a side kick

//title screen needs to go away
//.gamePlay needs to be hidden upon game start and be shown during game play when necessary


//game will be divided into instances

//each instance will have a separate js file
// function Circle(x, y, radius, color) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.color = color;

//     this.update = function() {
//         this.draw();
//     };

//     this.draw = function() {
//         c.beginPath();
//         c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//         c.fillStyle = this.color;
//         c.fill();
//         c.closePath();
//     }
// }
// var element = $(".game-container");
// var context = element.getContext("2d");
// var vanSprite = $("#van");
// var xPos = 0;
// var yPos = 0;

// context.vanSprite(xPos, yPos, 50, 50);
// context.stroke();
// function getPositions(box) {
//     var $box = $(box);
//     var pos = $box.position();
//     var width = $box.width();
//     var height = $box.height();
//     return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
//   }
//instance 1--walking the sprite on the screen
var counter = 1;
var van = $("<img id='van' src=assets/images/carvan-sprite.png>");
van.css({top: 200, left: 0});
$(".game-container").append(van);
$(document).keydown(function(e) {
    var pos = van.position();
    console.log(pos);
    console.log(counter);
    if (e.keyCode == 37) {
        if (pos.left < 158) {
            $(".game-container").removeClass("game-container" + counter);
            counter--;
            $(".game-container").addClass("game-container" + counter);
            van.css({top: 200, left: 840});

            } else {
                van.css("left", "-=20px"); 
            }
            
        van.css("left", "-=20px");  
    }
    if (e.keyCode == 38) {  
        if (pos.top < 350){
        van.css("top", "-=0px"); 
        } else {
            van.css("top", "-=20px"); 
        }
    }
    if (e.keyCode == 39) {
        if (pos.left > 940) {
            $(".game-container").removeClass("game-container" + counter);
            counter++;
            $(".game-container").addClass("game-container" + counter);
            van.css({top: 200, left: 0});
           
        } else {
        van.css("left", "+=20px"); 
        }
    }
    if (e.keyCode == 40) {
        if (pos.top > 420){
            van.css("top", "+=0px"); 
            } else {
                van.css("top", "+=20px"); 
            }
    }
    // element.width = element.width;
    // context.vanSprite(xPos, yPos, 50, 50);
    // context.stroke();
});    
// $(document).keydown(function(e) {
//     switch (e.which) {

//     // Move Buttons (Keyboard Down)
//     case 40:
//       vanSprite.css({ top: "+=20px" }, "normal");
//       break;

//       // Move Buttons (Keyboard Right)
//     case 39:
//       vanSprite.css({ left: "+=20px" }, "normal");
//       break;

//       // Move Buttons (Keyboard Up)
//     case 38:
//       vanSprite.css({ top: "-=20px" }, "normal");
//       break;

//       // Move Buttons (Keyboard Left)
//     case 37:
//       vanSprite.css({ left: "-=20px" }, "normal");
//       break;

//     default:
//       break;
//     }
// });
//instrance 2--question and collecting objects (trivia game)
    //much like the trivia game--computer asks questions and the user picks the answer
    //depending on the answer 

        //instance 1 will be inbetween instances 2

//instance 3--boss fight (rpg)

