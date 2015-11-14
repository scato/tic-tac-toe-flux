var ChoosePlayerAction = require('../../src/app/actions').ChoosePlayerAction;

module.exports = function () {
    this.When(/^I choose to be player "([^"]*)"$/, function (name, callback) {
        this.gameStore.onChoosePlayer(new ChoosePlayerAction(name));

        callback();
    });

    this.Then(/^I see an empty board$/, function (callback) {
        var board = this.gameStore.game.board;

        for (var x = 0; x < board.width; x++) {
            for (var y = 0; y < board.height; y++) {
                if (board.spaceAt(x, y).marked) {
                    callback(new Error('Space at (' + x + ', ' + y + ' should not be marked'));
                }
            }
        }

        callback();
    });
}
