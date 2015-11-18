var ChoosePlayerAction = require('../../src/app/actions').ChoosePlayerAction;
var PerformMoveAction = require('../../src/app/actions').PerformMoveAction;

module.exports = function () {
    this.When(/^I choose to be player "([^"]*)"$/, function (name, callback) {
        this.gameStore.onChoosePlayer(new ChoosePlayerAction(name));

        callback();
    });

    this.When(/^I mark the ([^ ]*) ([^ ]*) space$/, function (vertical, horizontal, callback) {
        var ys = {
            lower: 0,
            middle: 1,
            upper: 2
        };

        var xs = {
            left: 0,
            center: 1,
            right: 2
        };

        this.gameStore.onPerformMove(new PerformMoveAction(xs[horizontal], ys[vertical]));

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

    this.Then(/^I see a board with (\d+) marked space(?:s?)$/, function (expected, callback) {
        var board = this.gameStore.game.board;
        var actual = 0;

        for (var x = 0; x < board.width; x++) {
            for (var y = 0; y < board.height; y++) {
                if (board.spaceAt(x, y).marked) {
                    actual += 1;
                }
            }
        }

        if (actual === Number(expected)) {
            callback();
        } else {
            callback(new Error('Expected ' + expected + ' space(s) to be marked, found ' + actual));
        }
    });
};
