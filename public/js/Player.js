/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY, fighterName) {
	var x = startX,
		y = startY,
		name = fighterName,
		id,
		moveAmount = 2;
	
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

	// Update player position
	var update = function(keys) {
		// Previous position
		var prevX = x,
			prevY = y;

		// Up key takes priority over down
		if (keys.up) {
			y -= moveAmount;
		} else if (keys.down) {
			y += moveAmount;
		};

		// Left key takes priority over right
		if (keys.left) {
			x -= moveAmount;
		} else if (keys.right) {
			x += moveAmount;
		};

		return (prevX != x || prevY != y) ? true : false;
	};

	// Draw player
	var draw = function(ctx) {
		var fighter = document.getElementById(name);
		ctx.drawImage(fighter, x, y);
	};

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		setName: setName,		
		setX: setX,
		setY: setY,
		setName: setName,
		update: update,
		draw: draw
	}
};