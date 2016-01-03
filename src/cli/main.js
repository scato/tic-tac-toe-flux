var Outcome = require('../model/game').Outcome;

exports.init = (gameStore, ctrl) => {
    gameStore.on('init', () => {
        ctrl.showStart(gameStore);
    });

    gameStore.on('change', () => {
        if (gameStore.game.outcome() === Outcome.NONE) {
            ctrl.showBoard(gameStore);
        } else {
            ctrl.showOutcome(gameStore);
        }
    });
};
