var expect = require('chai').expect;
var mock = require('sinon').mock;
var chalk = require('chalk');
var view = require('../../src/cli/view');
var Game = require('../../src/model/game').default;
var Outcome = require('../../src/model/game').Outcome;

describe('view', () => {
    describe('renderWelcome', () => {
        it('should render a welcoming message', () => {
            var expected, actual;

            expected = 'Welcome to tic-tac-toe';
            actual = view.renderWelcome();

            expect(actual).to.equal(expected);
        });
    });

    describe('renderSpace', () => {
        var game;

        beforeEach(() => {
            game = new Game();
        });

        it('should render an empty space', () => {
            var expected, actual;

            expected = chalk.dim('4');
            actual = view.renderSpace(game, {x: 0, y: 1});

            expect(actual).to.equal(expected);
        });

        it('should render a space marked with X', () => {
            var expected, actual;

            expected = chalk.yellow('X');
            game.board.spaceAt(0, 1).mark(game.players[0]);
            actual = view.renderSpace(game, {x: 0, y: 1});

            expect(actual).to.equal(expected);
        });

        it('should render a space marked with O', () => {
            var expected, actual;

            expected = chalk.cyan('O');
            game.board.spaceAt(0, 1).mark(game.players[1]);
            actual = view.renderSpace(game, {x: 0, y: 1});

            expect(actual).to.equal(expected);
        });
    });

    describe('renderBoard', () => {
        var game;

        beforeEach(() => {
            game = new Game();
        });

        it('should render an empty board', () => {
            var expected, actual;

            expected = ' 1 | 2 | 3 \n'
                     + '---+---+---\n'
                     + ' 4 | 5 | 6 \n'
                     + '---+---+---\n'
                     + ' 7 | 8 | 9 ';

            actual = chalk.stripColor(view.renderBoard(game));

            expect(actual).to.equal(expected);
        });

        it('should render a partially filled board', () => {
            var expected, actual;

            expected = ' 1 | 2 | X \n'
                     + '---+---+---\n'
                     + ' O | X | 6 \n'
                     + '---+---+---\n'
                     + ' O | 8 | 9 ';

            game.board.spaceAt(1, 1).mark(game.players[0]);
            game.board.spaceAt(0, 1).mark(game.players[1]);
            game.board.spaceAt(2, 2).mark(game.players[0]);
            game.board.spaceAt(0, 0).mark(game.players[1]);

            actual = chalk.stripColor(view.renderBoard(game));

            expect(actual).to.equal(expected);
        });
    });

    describe('renderOutcome', () => {
        beforeEach(() => {
            game = new Game();
        });

        it('should render a victory by X', () => {
            var actual;

            mock(game).expects('outcome').withArgs().returns(Outcome.X_WINS);

            actual = view.renderOutcome(game);

            expect(actual).to.equal('X wins!');
        });

        it('should render a victory by O', () => {
            var actual;

            mock(game).expects('outcome').withArgs().returns(Outcome.O_WINS);

            actual = view.renderOutcome(game);

            expect(actual).to.equal('O wins!');
        });

        it('should render a draw', () => {
            var actual;

            mock(game).expects('outcome').withArgs().returns(Outcome.DRAW);

            actual = view.renderOutcome(game);

            expect(actual).to.equal('It\'s a draw!');
        });
    });
});
