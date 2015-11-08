/**************************************************
** GAME VARIABLES
**************************************************/
var canvas,			// Canvas DOM element
	ctx,			// Canvas rendering context
	keys,			// Keyboard input
	localPlayer,	// Local player
	remotePlayers,	// Remote players
	socket;			// Socket connection

// Variables for controling game screen and player selection
var currentScreen = 0;
var currentPlayerSelected = 0;


/**************************************************
** GAME INITIALISATION
**************************************************/
function init() {
	// Declare the canvas and rendering context
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");

	canvas.addEventListener("mousedown", getPosition, false);

	// Initialise keyboard controls
	keys = new Keys();

	// Calculate a random start position for the local player
	// The minus 5 (half a player size) stops the player being
	// placed right on the egde of the screen
	var startX = Math.round(Math.random()*(canvas.width-5)),
		startY = Math.round(Math.random()*(canvas.height-5));

	// Initialise the local player
	localPlayer = new Player(startX, startY);

	// Initialise socket connection
	socket = io.connect("http://localhost:3000");

	// Initialise remote players array
	remotePlayers = [];

	currentScreen = 0;
	currentPlayerSelected = 0;

	// Start listening for events
	setEventHandlers();
};


/**************************************************
** GAME EVENT HANDLERS
**************************************************/
var setEventHandlers = function() {
	// Keyboard
	window.addEventListener("keydown", onKeydown, false);
	window.addEventListener("keyup", onKeyup, false);

	// Window resize
	window.addEventListener("resize", onResize, false);

	// Socket connection successful
	socket.on("connect", onSocketConnected);

	// Socket disconnection
	socket.on("disconnect", onSocketDisconnect);

	// New player message received
	socket.on("new player", onNewPlayer);

	// Player move message received
	socket.on("move player", onMovePlayer);

	// Player removed message received
	socket.on("remove player", onRemovePlayer);
};

// Keyboard key down
function onKeydown(e) {
	if (localPlayer) {
		keys.onKeyDown(e);
	};
};

// Keyboard key up
function onKeyup(e) {
	if (localPlayer) {
		keys.onKeyUp(e);
	};
};

// Browser window resize
function onResize(e) {
	// Maximise the canvas
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};

// Socket connected
function onSocketConnected() {
	console.log("Connected to socket server");

	// Send local player data to the game server
	// socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY()});
};

// Socket disconnected
function onSocketDisconnect() {
	console.log("Disconnected from socket server");
};

// New player
function onNewPlayer(data) {
	console.log("New player connected: "+data.id);

	// Initialise the new player
	var newPlayer = new Player(data.x, data.y, data.name);
	newPlayer.id = data.id;

	// Add new player to the remote players array
	remotePlayers.push(newPlayer);
};

// Move player
function onMovePlayer(data) {
	var movePlayer = playerById(data.id);

	// Player not found
	if (!movePlayer) {
		console.log("Player not found: "+data.id);
		return;
	};

	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);
};

// Remove player
function onRemovePlayer(data) {
	var removePlayer = playerById(data.id);

	// Player not found
	if (!removePlayer) {
		console.log("Player not found: "+data.id);
		return;
	};

	// Remove player from array
	remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
};


/**************************************************
** GAME ANIMATION LOOP
**************************************************/
function animate() {
	update();
	draw();

	// Request a new animation frame using Paul Irish's shim
	window.requestAnimFrame(animate);
};


/**************************************************
** GAME UPDATE
**************************************************/
function update() {
	// Update local player and check for change
	if (localPlayer.update(keys)) {
		// Send local player data to the game server
		socket.emit("move player", {x: localPlayer.getX(), y: localPlayer.getY()});
	};
};


/**************************************************
** GAME DRAW
**************************************************/
function draw() {
	// Wipe the canvas clean
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draws BG Image
	bgGame = document.getElementById("bg-game");
  	ctx.drawImage(bgGame, 0, 0);

	// Draw the local player
	localPlayer.draw(ctx);

	// Draw the remote players
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		remotePlayers[i].draw(ctx);
	};
};


/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Find player by ID
function playerById(id) {
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		if (remotePlayers[i].id == id)
			return remotePlayers[i];
	};
	
	return false;
};


// Function used for trakcing mouse co-ordinates for click events
function getPosition(event) {
  var x = event.x;
  var y = event.y;

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  switch (currentScreen) {
    case 0:
      playerSelectLoadScreen(x, y);
      break;

    case 1:
      playerSelectClickHandlers(x, y);
      break;

  }
}

// Function handles loading the "SELECT A PLAYER" screen
function playerSelectLoadScreen(x, y) {
  if ((y < 505 && y > 415) && (x < 506 && x > 274)) {
  	currentScreen = 1;

    ctx.rect(0, 0, 800, 600);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    var selectPlayerImg = document.getElementById("select-player");
    var jumpingJimboTxt = document.getElementById("jumping-jimbo");
    var jumpingJimboImg = document.getElementById("jumping-jimbo-img");
    var leftArrow = document.getElementById("left-arrow");
    var rightArrow = document.getElementById("right-arrow");

    ctx.drawImage(selectPlayerImg, 100, 60);
    ctx.drawImage(jumpingJimboTxt, 250, 500);
    ctx.drawImage(leftArrow, 150, 270);
    ctx.drawImage(rightArrow, 580, 270);

    ctx.beginPath();
    ctx.rect(270, 150, 250, 300);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    ctx.drawImage(jumpingJimboImg, 290, 200);
    currentPlayerSelected = 0;
  }
}


// Function handles the selection of a plater on the player seletion screen
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
  ctx.beginPath();
  ctx.rect(270, 150, 250, 300);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
  if (currentPlayerSelected == 0) {
    currentPlayerSelected = 1;

    var fistycuffsMcGeeTxt = document.getElementById("fistyCuffsMcGeeTxt");

    ctx.beginPath();
    ctx.rect(250, 500, 362, 42);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.drawImage(fistycuffsMcGeeTxt, 250, 500);

    var fistyCuffsMcGeeImg = document.getElementById("fistyCuffsMcGeeImg");
    ctx.drawImage(fistyCuffsMcGeeImg, 290, 200);

  } else if (currentPlayerSelected == 1) {
    currentPlayerSelected = 0;

    ctx.beginPath();
    ctx.rect(150, 500, 462, 36);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    var jumpingJimboTxt = document.getElementById("jumping-jimbo");

    ctx.drawImage(jumpingJimboTxt, 250, 500);

    var jumpingJimboImg = document.getElementById("jumping-jimbo-img");

    ctx.drawImage(jumpingJimboImg, 290, 200);
  }
}

function newGameIntroScreen(){
	// Variables for controling game screen and player selection
	var currentScreen = 0;
	var currentPlayerSelected = 0;

	// Welcome screen image elements
	var bg = document.getElementById("bg-intro");
	var cfTitle = document.getElementById("title-intro");
	var playTitle = document.getElementById("play-intro");
	ctx.drawImage(bg, 0, 0);
	ctx.drawImage(cfTitle, 250, 400);
	ctx.drawImage(playTitle, 160, 40);
}

// Main Game Function
function newGame(fighter) {

  if (fighter == 0) {
    var fighterImg = document.getElementById("jumping-jimbo-img");
    var name1 = "jumping-jimbo-img";
    localPlayer.setName(name1);
    socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY(), name: name1});
    animate();

  } else if (fighter == 1) {
    var fighterImg = document.getElementById("fistyCuffsMcGeeImg");
    var name2 = "fistyCuffsMcGeeImg";
    localPlayer.setName(name2);
   	socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY(), name: name2});
    animate();

  }
}


// Add an event listener to the keypress event.
window.addEventListener("keydown", function(event) { 

switch(event.keyCode) {
  case 39:
      xGlobal = xGlobal + 10;
      console.log('x+');
    break;
  case 37:
      xGlobal = xGlobal - 10;
      console.log('x-');
    break;
}
});

