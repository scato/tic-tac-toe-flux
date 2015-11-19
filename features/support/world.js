var GameStore = require('../../src/app/game-store').default;
var First = require('../../src/robot/first').default;

function World() {
    this.gameStore = new GameStore(new First());
}

module.exports = function () {
    this.World = World;
}
