/*
Game Variables
*/
var canvas,			// Canvas DOM element
	ctx,			// Canvas rendering context
	keys,			// Keyboard input
	localPlayer,	// Local player
	remotePlayers,	// Remote players
	socket;			// Socket connection

/*
Game Init
*/
function init() {
	// Declare the canvas and rendering context
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");

	// Maximise the canvas
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// Initialise keyboard controls
	keys = new Keys();

	// Calculate a random start position for the local player
	// The minus 5 (half a player size) stops the player being
	// placed right on the egde of the screen
	var initX = Math.round(Math.random()*(canvas.width-5)),
		initY = Math.round(Math.random()*(canvas.height-5));

	// Initialise the local player
	localPlayer = new Player(initX, initY);

	// Initialise socket connection
	socket = io.connect("http://localhost:3000");

	// Initialise remote players array
	remotePlayers = [];

	// Start listening for events
	setEventHandlers();
};

