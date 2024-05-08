
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$("h1").on("click", function() {
    if(started === false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        $("h2").addClass("hidden");
        started = true;
    }
});


$(".btn").on("click", function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
   checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
       if(userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
       }
    } else {
        
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Tap Here to Restart");
        $("h2").text("You Made it to Level " + level);
        $("h2").removeClass("hidden");
        startOver();
    }
};



function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#"+randomChosenColor).fadeIn(500).fadeOut(500).fadeIn(500);
    
    playSound(randomChosenColor);
    
   
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    
}


function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed")
    },100);
};





