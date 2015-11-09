# Canvas Fighter
## Multiplayer Canvas Game using Node &amp; Socket.io

**Retro street fighter game. Node, Express, Socket.IO & HTML5 Canvas**

All graphics are made by myself beside the active game background image and the Fistycuffs McGee image.

PSD's for game and character design can be downloaded here: https://drive.google.com/folderview?id=0B5Ll8cw07fgmbVlMN2dhZWRTOXc&usp=sharing

#### Files & Folders
**server.js** Contains Node.JS reqirements. Creates server using Express & Node and binds socket.io to listen on port 3000. Init function and event handlers for socket are created in this file. 

**Player.js** Server side Player class that is used for Fighter characters. Slimmed down class with getters, setter & an export statement.

**package.json** Used for dependency management and project details.

**/public** All client side code.

**/public/images** Game image assets. 

**/public/index.html** Game HTML page. Served with express when client hits the server. Contains client side script tags and canvas element. 

**/public/js/main.js** Initializes global variables. init() game function. Event handlers for socket.io. draw(), update(), animate() and newGame() functions.

**/public/js/IntroAndfighterSelection.js** Functions for intro & fighter selection screen. 

**/public/js/Keys.js** Handles gameplay Keyboard interaction.

**/public/js/Player.js** Clientside Player class for Fighter. 

**/public/js/helper.js** Helper functions.

**/public/js/requestAnimationFrame.js** Optimized request animation frame shim written by Paul Irish. 

Tutorial followed for scaffolding out multiplayer architecture: http://rawkes.com/articles/creating-a-real-time-multiplayer-game-with-websockets-and-node.html

