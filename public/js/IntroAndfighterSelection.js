/**************************************************
 ** INTRODUCTION & FIGHTER SELECTION FUNCTIONS
 **************************************************/

// Function handles the game intro screen
function newGameIntroScreen() {

  // Variables for the controlling the 
  // active game screen and player selection
  var currentScreen = 0;
  var currentPlayerSelected = 0;

  // Welcome screen image elements
  var bg = document.getElementById("bg-intro");
  var cfTitle = document.getElementById("title-intro");
  var playTitle = document.getElementById("play-intro");

  // Draw Welcome Screen to canvas
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(cfTitle, 250, 400);
  ctx.drawImage(playTitle, 160, 40);
}

// Function handles loading the "SELECT A PLAYER" screen
function playerSelectLoadScreen(x, y) {
  if ((y < 505 && y > 415) && (x < 506 && x > 274)) {

    // If player selects "PLAY" change currentScreen to 1
    currentScreen = 1;

    // Background red color
    ctx.rect(0, 0, 800, 600);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    // Player Selection handles loaded from DOM into variables
    var selectPlayerImg = document.getElementById("select-player");
    var jumpingJimboTxt = document.getElementById("jumping-jimbo");
    var jumpingJimboImg = document.getElementById("jumping-jimbo-img-lrg");
    var leftArrow = document.getElementById("left-arrow");
    var rightArrow = document.getElementById("right-arrow");

    // Draws Player Select assets to canvas
    ctx.drawImage(selectPlayerImg, 100, 60);
    ctx.drawImage(jumpingJimboTxt, 265, 500);
    ctx.drawImage(leftArrow, 150, 270);
    ctx.drawImage(rightArrow, 580, 270);

    // Draws white background for fighter graphics
    ctx.beginPath();
    ctx.rect(270, 150, 250, 300);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    // Draws first fighter graphic
    ctx.drawImage(jumpingJimboImg, 300, 200);

    // Resets currently selected player to 0
    currentPlayerSelected = 0;
  }
}

// Function handles the selection of a player on the player seletion screen
function playerSelectClickHandlers(x, y) {
  if ((x < 221 && x > 128) && (y < 312 && y > 277)) {
    arrowClickPlayerSelect();
  } else if ((x < 644 && x > 583) && (y < 363 && y > 276)) {
    arrowClickPlayerSelect();
  } else if ((x < 521 && x > 269) && (y < 450 && y > 150)) {
    currentScreen = 2;
    newGame(currentPlayerSelected);
  }
}

// Function handles arrow clicks on the player seletion screen
function arrowClickPlayerSelect() {

  // Redraws White Square
  ctx.beginPath();
  ctx.rect(270, 150, 250, 300);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();

  // Checks to see which player is selected
  if (currentPlayerSelected == 0) {
    // Updates player selection variable
    currentPlayerSelected = 1;

    // Picks Player asset from the dom
    var fistycuffsMcGeeTxt = document.getElementById("fistyCuffsMcGeeTxt");

    // Draws Red Background
    ctx.beginPath();
    ctx.rect(250, 500, 362, 42);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    // Draws Fighter Name Text
    ctx.drawImage(fistycuffsMcGeeTxt, 220, 490);

    // Draws Fighter
    var fistyCuffsMcGeeImg = document.getElementById("fisty-cuffs-img-lrg");
    ctx.drawImage(fistyCuffsMcGeeImg, 290, 200);

  } else if (currentPlayerSelected == 1) {
    // Updates player selection variable
    currentPlayerSelected = 0;

    // Draws Red Background
    ctx.beginPath();
    ctx.rect(150, 500, 462, 36);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    // Draws Fighter Name Text
    var jumpingJimboTxt = document.getElementById("jumping-jimbo");
    ctx.drawImage(jumpingJimboTxt, 265, 500);

    // Draws Fighter
    var jumpingJimboImg = document.getElementById("jumping-jimbo-img-lrg");
    ctx.drawImage(jumpingJimboImg, 290, 210);
  }
}