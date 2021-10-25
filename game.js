var buttonColours = ["red", "blue", "green", "yellow"]; //List of button colours
var gamePattern = []; //Stores games sequence colours
var userClickedPattern = []; //Store colours player has clicked
var gameStart = false; //Tracks if game has begun
var level = 0; //Tracks level number
var score = 1;

//Runs function when a key is pressed
$(document).on("keypress", function () {
  //Code only runs when gameStart === false, which prevents keypreses being allowed when has begun
  if (!gameStart) {
    gameStart = true; //Tracks game has started
    $("#level-title").text("Level 1"); //Changes level number 1
    $("#player-score").text("");
    nextSequence(); //Invokes function to start game
  }
});

function nextSequence() {
  level++; //increment level value
  $("#level-title").text("Level " + level); //Heading changes whenever there is a level increase
  userClickedPattern = []; //Empty's array for next sequence - this results in user having to remember entire sequence
  var randomNumber = Math.floor(Math.random() * buttonColours.length); //Generates random colour
  var randomColour = buttonColours[randomNumber]; //Stores randomNumber into array index in order to select a colour randomly
  gamePattern.push(randomColour); //Stores random colour to gamePattern
  //gamePattern;
  $("#" + randomColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); //Flashes random colour to indicate to player next sequence
  playSound(randomColour); //Plays sound of random colour
}

//Runs function when coloured button is clicked
$(".btn").click(function () {
  var userChosenColour = this.id; //ID of button clicked is assigned to variable
  userClickedPattern.push(userChosenColour); //Above variable is pushed to userClickedPattern array
  playSound(userChosenColour); //Invokes playSound function with button variable as argument
  animatePress(userChosenColour); //Invokes animatePress function with button variable as argument
  var currentLevel = userClickedPattern.length - 1; //Variable storing number of players correct clicks
  checkAnswer(currentLevel); //Pass in index of last answer to checkAnswer function
});

function checkAnswer(currentLevel) {
  //Requires two conditions below to confirm correct click
  //Checks last inputs are the same
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //Checks sequence length are the same
    if (userClickedPattern.length === gamePattern.length) {
      score += 3; //Stores player score
      setTimeout(function () {
        nextSequence();
      }, 1000); //nextSequence invoked after 1 second
    }
  } else {
    //Runs code if player input is incorrect
    //Plays incorrect sound
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    //Changes level-title
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("#player-score").text("Your score is " + score);
    //Screen flashes red and removes after 2 seconds
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 2000);
    //Invokes startOver function
    startOver();
  }
}

//Resets chenged values to default
function startOver() {
  level = 0;
  score = 1;
  gamePattern = [];
  gameStart = false;
}

//Plays sound based on which coloured button is clicked
function playSound(btnName) {
  var audio = new Audio("sounds/" + btnName + ".mp3");
  audio.play();
}

//Button flashes based on which one is clicked
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  //Button returns to normal colour
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
