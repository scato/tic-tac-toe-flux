var sinon = require('sinon');
var expect = require('chai').expect;
var ctrl = require('../../src/cli/ctrl');
var actions = require('../../src/app/actions');
var GameStore = require('../../src/app/game-store').default;
var Outcome = require('../../src/model/game').Outcome;

describe('ctrl', () => {
    var subject, gameStore, gameStoreMock, prompt, log;

    beforeEach(() => {
        gameStore = new GameStore();
        gameStoreMock = sinon.mock(gameStore);

        prompt = {
            choosePlayer: sinon.stub(),
            chooseSpace: sinon.stub()
        };
        view = {
            renderWelcome: sinon.stub(),
            renderBoard: sinon.stub(),
            renderOutcome: sinon.stub()
        };
        log = sinon.spy();
        helper = {
            freeSpaces: sinon.stub(),
            indexToCoordinates: sinon.stub()
        };

        subject = ctrl.create(prompt, view, log, helper);
    });

    it('should show a welcoming message', () => {
        view.renderWelcome.withArgs().returns('WELCOME');
        prompt.choosePlayer.withArgs().returns(Promise.resolve('X'));

        gameStoreMock.expects('onChoosePlayer');

        return subject.showStart(gameStore).then(() => {
            expect(log.calledWith('WELCOME')).to.equal(true);
        });
    });

    it('should pass the chosen player to the game store', () => {
        var action;

        prompt.choosePlayer.withArgs().returns(Promise.resolve('X'));

        action = new actions.ChoosePlayerAction('X');
        gameStoreMock.expects('onChoosePlayer').once().withArgs(sinon.match(action));

        return subject.showStart(gameStore).then(() => {
            gameStoreMock.verify();
        });
    });

    it('should show the board', () => {
        view.renderBoard.withArgs(gameStore.game).returns('BOARD');
        helper.freeSpaces.withArgs(gameStore.game.board).returns([1, 2, 3]);
        prompt.chooseSpace.withArgs([1, 2, 3]).returns(Promise.resolve(1));
        helper.indexToCoordinates.withArgs(1).returns({x: 0, y: 2});

        gameStoreMock.expects('onPerformMove');

        return subject.showBoard(gameStore).then(() => {
            expect(log.calledWith('BOARD')).to.equal(true);
        });
    });

    it('should pass the chosen space to the game store', () => {
        var action;

        gameStore.onChoosePlayer(new actions.ChoosePlayerAction('X'));
        helper.freeSpaces.withArgs(gameStore.game.board).returns([1, 2, 3]);
        prompt.chooseSpace.withArgs([1, 2, 3]).returns(Promise.resolve(1));
        helper.indexToCoordinates.withArgs(1).returns({x: 0, y: 2});

        action = new actions.PerformMoveAction(0, 2);
        gameStoreMock.expects('onPerformMove').once().withArgs(sinon.match(action));

        return subject.showBoard(gameStore).then(() => {
            gameStoreMock.verify();
        });
    });

    it('should show the final board, as well as the outcome', () => {
        view.renderBoard.withArgs(gameStore.game).returns('BOARD');
        view.renderOutcome.withArgs(gameStore.game).returns('OUTCOME');

        return subject.showOutcome(gameStore).then(() => {
            expect(log.calledWith('BOARD')).to.equal(true);
            expect(log.calledWith('OUTCOME')).to.equal(true);
        });
    });
});
