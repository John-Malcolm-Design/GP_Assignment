/**************************************************
 ** GAME VARIABLES
 **************************************************/
var canvas, // Canvas DOM element
	ctx, // Canvas rendering context
	keys, // Keyboard input
	localPlayer, // Local player
	remotePlayers, // Remote players
	socket; // Socket connection

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

// Socket connected
function onSocketConnected() {
	console.log("Connected to socket server");

};

// Socket disconnected
function onSocketDisconnect() {
	console.log("Disconnected from socket server");
};

// New player
function onNewPlayer(data) {
	console.log("New player connected: " + data.id);

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
		console.log("Player not found: " + data.id);
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
		console.log("Player not found: " + data.id);
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

	// Request a new animation frame using Paul Irish's code
	window.requestAnimFrame(animate);
};


/**************************************************
 ** GAME UPDATE
 **************************************************/
function update() {

	if (localPlayer.getY() < 485) {
		localPlayer.setY(localPlayer.getY() + 2);
	}

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

	// Draws Ground
	ctx.fillStyle = "#020508";
	ctx.fillRect(0, 580, 800, 20);

	// Draw the local player
	localPlayer.draw(ctx);

	// Draw the remote players
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		remotePlayers[i].draw(ctx);
	};
};

/**************************************************
 ** NEW GAME FUNCTION
 **************************************************/
 function newGame(fighter) {

  if (fighter == 0) {
    var name1 = "jumping-jimbo-img";

    var startX = 650, startY = 485;

    // Initialise the local player
    localPlayer = new Player(startX, startY, name1);

    socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY(), name: name1});
    animate();

  } else if (fighter == 1) {
    var name2 = "fisty-cuffs-img";

    var startX = 25, startY = 485;

    // Initialise the local player
    localPlayer = new Player(startX, startY, name2);

    socket.emit("new player", {x: localPlayer.getX(), y: localPlayer.getY(), name: name2});

    animate();

  }
}