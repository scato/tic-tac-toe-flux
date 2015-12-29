var expect = require('chai').expect;
var helper = require('../../src/cli/helper');
var Game = require('../../src/model/game').default;

describe('helper', () => {
    it('translates coordinates to a number from 1 to 9', () => {
        expect(helper.coordinatesToIndex({x: 0, y: 2})).to.equal(1);
        expect(helper.coordinatesToIndex({x: 1, y: 2})).to.equal(2);
        expect(helper.coordinatesToIndex({x: 2, y: 2})).to.equal(3);

        expect(helper.coordinatesToIndex({x: 0, y: 1})).to.equal(4);
        expect(helper.coordinatesToIndex({x: 1, y: 1})).to.equal(5);
        expect(helper.coordinatesToIndex({x: 2, y: 1})).to.equal(6);

        expect(helper.coordinatesToIndex({x: 0, y: 0})).to.equal(7);
        expect(helper.coordinatesToIndex({x: 1, y: 0})).to.equal(8);
        expect(helper.coordinatesToIndex({x: 2, y: 0})).to.equal(9);
    });

    it('translates a number from 1 to 9 to coordinates', () => {
        expect(helper.indexToCoordinates(1)).to.deep.equal({x: 0, y: 2});
        expect(helper.indexToCoordinates(2)).to.deep.equal({x: 1, y: 2});
        expect(helper.indexToCoordinates(3)).to.deep.equal({x: 2, y: 2});

        expect(helper.indexToCoordinates(4)).to.deep.equal({x: 0, y: 1});
        expect(helper.indexToCoordinates(5)).to.deep.equal({x: 1, y: 1});
        expect(helper.indexToCoordinates(6)).to.deep.equal({x: 2, y: 1});

        expect(helper.indexToCoordinates(7)).to.deep.equal({x: 0, y: 0});
        expect(helper.indexToCoordinates(8)).to.deep.equal({x: 1, y: 0});
        expect(helper.indexToCoordinates(9)).to.deep.equal({x: 2, y: 0});
    });

    it('compiles a list of unmarked spaces', () => {
        var expected, actual, game;

        expected = [1, 2, 6, 8, 9];

        game = new Game();
        game.board.spaceAt(1, 1).mark(game.players[0]);
        game.board.spaceAt(0, 1).mark(game.players[1]);
        game.board.spaceAt(2, 2).mark(game.players[0]);
        game.board.spaceAt(0, 0).mark(game.players[1]);

        actual = helper.freeSpaces(game.board);

        expect(actual).to.deep.equal(expected);
    });
});
