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


// Function used for tracking mouse co-ordinates for click events
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
