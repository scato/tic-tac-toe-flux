var actions = require('../app/actions');

exports.create = (prompt, view, log, helper) => {
    var ctrl = {};

    ctrl.showStart = gameStore => {
        log(view.renderWelcome());

        return prompt.choosePlayer().then(value => {
            var action = new actions.ChoosePlayerAction(value);

            gameStore.onChoosePlayer(action);
        });
    };

    ctrl.showBoard = gameStore => {
        log(view.renderBoard(gameStore.game));

        return prompt.chooseSpace(helper.freeSpaces(gameStore.game.board)).then(value => {
            var coordinates = helper.indexToCoordinates(value);
            var action = new actions.PerformMoveAction(coordinates.x, coordinates.y);

            gameStore.onPerformMove(action);
        });
    };

    ctrl.showOutcome = gameStore => {
        log(view.renderBoard(gameStore.game));
        log(view.renderOutcome(gameStore.game));

        return Promise.resolve();
    };

    return ctrl;
};
