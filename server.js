/*
  Requirements
*/
var util = require("util");	// Utility resources (logging, object inspection, etc)
var express = require('express'); // Server Middleware
var app     = express(); // Bind to App
var server  = require('http').createServer(app); // HTTP Server
var socket = require('socket.io').listen(server); // Bind to Socket.io
var Player = require("./Player").Player; // Player class
var	players;	// Array of connected players

/*
Init Function
*/
function init() {
	// Initialize the empty array to store the players
	players = [];

	// Specify public directory for serving files
	app.use(express.static(__dirname + '/public'));

	// Specify port to listen on
	server.listen(3000);

	// Start listening for events
	setEventHandlers();
};

/*
Event Handlers
*/
var setEventHandlers = function() {
	// Event when new client hits server
	socket.sockets.on("new client", onNewClient);
};

// Logs to console new clients details and registers other event handlers
function onNewClient(client) {
	util.log("New player has connected: " +client.id);

	// Listen for client disconnected
	client.on("client_disconnect", onClientDisconnect);

	// Listen for new player message
	client.on("new player", onNewPlayer);

	// Listen for move player message
	client.on("move player", onMovePlayer);
};

// Socket client has disconnected
function onClientDisconnect() {
	util.log("Player has disconnected: " +this.id);

	var removePlayer = playerById(this.id);

	// Player not found
	if (!removePlayer) {
		util.log("Player not found: " +this.id);
		return;
	};

	// Remove player from players array
	players.splice(players.indexOf(removePlayer), 1);

	// Broadcast removed player to connected socket clients
	this.broadcast.emit("remove player", {id: this.id});
};

// New player has joined
function onNewPlayer(data) {
	// Create a new player
	var newPlayer = new Player(data.x, data.y);
	newPlayer.id = this.id;

	// Broadcast new player to connected socket clients
	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});

	// Send existing players to the new player
	var i, existingPlayer;
	for (i = 0; i < players.length; i++) {
		existingPlayer = players[i];
		this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
	};
		
	// Add new player to the players array
	players.push(newPlayer);
};

// Player has moved
function onMovePlayer(data) {
	// Find player in array
	var movePlayer = playerById(this.id);

	// Player not found
	if (!movePlayer) {
		util.log("Player not found: "+this.id);
		return;
	};

	// Update player position
	movePlayer.setX(data.x);
	movePlayer.setY(data.y);

	// Broadcast updated position to connected socket clients
	this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()});
};


/*
Helper Functions
*/
// Find player by ID
function playerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id)
			return players[i];
	};
	
	return false;
};

/*
Run the game
*/
init();



