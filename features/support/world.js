var GameStore = require('../../src/app/game-store').default;

function World() {
    this.gameStore = new GameStore();
}

module.exports = function () {
    this.World = World;
}
