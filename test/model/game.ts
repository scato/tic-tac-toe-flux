/// <reference path="../../typings/tsd.d.ts" />
import {expect} from 'chai';
import Game from '../../src/model/game';
import Move from '../../src/model/move';

describe('Game', () => {
    let subject: Game;

    beforeEach(() => {
        subject = new Game();
    });

    it('has two players: X and O', () => {
        expect(subject.players.length).to.equal(2);
        expect(subject.players[0].name).to.equal('X');
        expect(subject.players[1].name).to.equal('O');
    });

    it('lets players mark spaces', () => {
        expect(subject.board.spaceAt(0, 0).marked).to.equal(false);

        subject.performMove(subject.players[0], new Move(0, 0));
        expect(subject.board.spaceAt(0, 0).marked).to.equal(true);
    });

    it('lets players take turns marking the spaces', () => {
        expect(subject.currentPlayer).to.equal(subject.players[0]);

        subject.performMove(subject.players[0], new Move(0, 0));
        expect(subject.currentPlayer).to.equal(subject.players[1]);

        expect(() => subject.performMove(subject.players[0], new Move(1, 0))).to.throw(Error);
    });

    it('lets robots know if a move is valid', () => {
        subject.performMove(subject.players[0], new Move(0, 0));

        expect(subject.isValidMove(new Move(0, 0))).to.equal(false);
        expect(subject.isValidMove(new Move(1, 0))).to.equal(true);
    });
});
