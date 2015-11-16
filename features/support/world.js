var GameStore = require('../../src/app/game-store').default;
var Random = require('../../src/robot/random').default;

function World() {
    this.gameStore = new GameStore(new Random());
}

module.exports = function () {
    this.World = World;
}
