/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY, fighterName) {
	var x = startX,
		y = startY,
		name = fighterName,
		id,
		moveAmount = 2,
		normal = fighterName,
		reverse = fighterName + '-rvrs';
	
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

	var getReverse = function() {
		return reverse;
	};

	var getNormal = function() {
		return normal;
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

	var setReverse = function(newReverse) {
		reverse = newReverse;
	};

	var setNormal = function(newNormal) {
		normal = newNormal;
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

		// If else statements below change the graphic and 
		// the x and y for each player when keys are pressed
		if(this.getNormal() == "fisty-cuffs-img"){
			// Left key takes priority over right
			if (keys.left) {
				if(this.getName() == this.getNormal()){
					this.setName(this.getReverse());
				}
				if(this.getX() < 0){
					x = x;
				} else{
					x -= moveAmount;
				}
			} else if (keys.right) {
				if(this.getName() == this.getReverse()){
					this.setName(this.getNormal());
				}
				if(this.getX() > 699){
					x = x;
				} else{
					x += moveAmount;
				}
			};
		} 
		else{
			// Left key takes priority over right
			if (keys.left) {
				if(this.getName() == this.getReverse()){
					this.setName(this.getNormal());
				}
				if(this.getX() < 0){
					x = x;
				} else{
					x -= moveAmount;
				}
			} else if (keys.right) {
				if(this.getName() == this.getNormal()){
					this.setName(this.getReverse());
				}
				if(this.getX() > 699){
					x = x;
				} else{
					x += moveAmount;
				}
			};
		}
		return (prevX != x || prevY != y) ? true : false;
	};

	// Draw player
	var draw = function(ctx) {
		var fighter = document.getElementById(name);
		ctx.drawImage(fighter, x, y);
	};

	// Function changes graphic dependant on player state
	var changeState = function(condition){
		switch(condition){
			case "falling":
				this.setName(this.getNormal() + "-fall");
				break;
			case "normal":
				this.setName(this.getNormal());
				break;
		}
	}

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		getName: getName,	
		getReverse: getReverse,
		getNormal: getNormal,
		setX: setX,
		setY: setY,
		setName: setName,
		setReverse: setReverse,
		setNormal: setNormal,
		update: update,
		changeState: changeState,
		draw: draw
	}
};