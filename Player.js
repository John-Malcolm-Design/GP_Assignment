/*
Server side Player Class for Fighters
*/
var Player = function(startX, startY, fighterName) {
	var x = startX,
		y = startY,
		name = fighterName,
		id;

	// Getters and setters
	var getX = function() {
		return x;
	};

	var getY = function() {
		return y;
	};

	var getName = function() {
		return name;
	};

	var setX = function(newX) {
		x = newX;
	};

	var setY = function(newY) {
		y = newY;
	};

	var setName = function(newName) {
		name = newName;
	};

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		getName: getName,
		setX: setX,
		setY: setY,
		setName: setName,
		id: id
	}
};

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;