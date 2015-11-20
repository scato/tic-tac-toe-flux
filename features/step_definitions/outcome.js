var Outcome = require('../../src/model/game').Outcome;

module.exports = function () {
    function outcomeForWinner(name) {
        if (name === 'X') {
            return Outcome.X_WINS;
        } else {
            return Outcome.O_WINS;
        }
    }

    function checkOutcome(actual, expected) {
        if (actual !== expected) {
            throw new Error(
                'Expected outcome to be ' + Outcome[expected] +
                ', not ' + Outcome[actual]
            );
        }
    }

    this.Then(/^I win the game$/, function (callback) {
        var expectedOutcome = outcomeForWinner(this.gameStore.humanPlayer.name);

        checkOutcome(this.gameStore.game.outcome(), expectedOutcome);

        callback();
    });

    this.Then(/^I lose the game$/, function (callback) {
        var expectedOutcome = outcomeForWinner(this.gameStore.robotPlayer.name);

        checkOutcome(this.gameStore.game.outcome(), expectedOutcome);

        callback();
    });

    this.Then(/^the game ends in a draw$/, function (callback) {
        checkOutcome(this.gameStore.game.outcome(), Outcome.DRAW);

        callback();
    });
};
