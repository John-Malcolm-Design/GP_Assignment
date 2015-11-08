/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY, fighterName) {
	var x = startX,
		y = startY,
		name = fighterName,
		id,
		moveAmount = 2,
		oldName = fighterName;
	
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
			if(y > 385 && y < 485){
				return;
			} else{
				y = 385;
			}
		} else if (keys.down) {
			y = y;
		};

		// Left key takes priority over right
		if (keys.left) {
			if(this.getName() == "jumping-jimbo-rvrs"){
				this.setName("jumping-jimbo-img");
			}
			x -= moveAmount;
		} else if (keys.right) {
			if(this.getName() == "jumping-jimbo-img"){
				this.setName("jumping-jimbo-rvrs");
			}
			x += moveAmount;
		};

		return (prevX != x || prevY != y) ? true : false;
	};

	// Draw player
	var draw = function(ctx) {
		var fighter = document.getElementById(name);
		ctx.drawImage(fighter, x, y);
	};

	var changeState = function(condition){
		switch(condition){
			case "falling":
				this.setName("fistyCuffsMcGeeImg");
				break;
			case "normal":
				this.setName(oldName);
				break;
		}
	}

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		getName: getName,		
		setX: setX,
		setY: setY,
		setName: setName,
		update: update,
		changeState: changeState,
		draw: draw
	}
};