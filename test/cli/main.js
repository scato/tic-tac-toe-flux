var sinon = require('sinon');
var expect = require('chai').expect;
var main = require('../../src/cli/main');
var GameStore = require('../../src/app/game-store').default;
var Outcome = require('../../src/model/game').Outcome;

describe('main', () => {
    var ctrl, ctrlMock;

    beforeEach(() => {
        gameStore = new GameStore();
        gameMock = sinon.mock(gameStore.game);

        ctrl = {
            showStart: () => {},
            showBoard: () => {},
            showOutcome: () => {},
        };
        ctrlMock = sinon.mock(ctrl);

        main.init(gameStore, ctrl);
    });

    it('should show the start of the game', () => {
        ctrlMock.expects('showStart').once().withArgs(gameStore).returns(Promise.resolve());

        gameStore.emit('init');
        ctrlMock.verify();
    });

    it('should show the board', () => {
        gameMock.expects('outcome').returns(Outcome.NONE);
        ctrlMock.expects('showBoard').once().withArgs(gameStore).returns(Promise.resolve());

        gameStore.emit('change');
        ctrlMock.verify();
    });

    it('should show the outcome', () => {
        gameMock.expects('outcome').returns(Outcome.X_WINS);
        ctrlMock.expects('showOutcome').once().withArgs(gameStore).returns(Promise.resolve());

        gameStore.emit('change');
        ctrlMock.verify();
    });
});
