var Outcome = require('../../src/model/game').Outcome;

module.exports = function () {
    this.Then(/^I win the game$/, function (callback) {
        var expectedOutcome;

        if (this.gameStore.humanPlayer.name === 'X') {
            expectedOutcome = Outcome.X_WINS;
        } else {
            expectedOutcome = Outcome.O_WINS;
        }

        if (this.gameStore.game.outcome !== expectedOutcome) {
            throw new Error(
                'Expected outcome to be ' + Outcome[expectedOutcome] +
                ', not ' + Outcome[this.gameStore.game.outcome]
            );
        }

        callback();
    });
};
