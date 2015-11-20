/// <reference path="../../typings/tsd.d.ts" />
import {expect} from 'chai';
import {mock} from 'sinon';
import Game from '../../src/model/game';
import Move from '../../src/model/move';
import {Outcome} from '../../src/model/game';
import SinonMock = Sinon.SinonMock;

describe('Game', () => {
    let subject: Game, boardStub: SinonMock;

    beforeEach(() => {
        subject = new Game();
        boardStub = mock(subject.board);
    });

    it('has two players: X and O', () => {
        expect(subject.players.length).to.equal(2);
        expect(subject.players[0].name).to.equal('X');
        expect(subject.players[1].name).to.equal('O');
    });

    it('lets players mark spaces', () => {
        const spaceMock: SinonMock = mock(subject.board.spaceAt(0, 0));
        spaceMock.expects('mark').once().withArgs(subject.players[0]);

        subject.performMove(subject.players[0], new Move(0, 0));

        spaceMock.verify();
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

    it('starts with no outcome', () => {
        expect(subject.outcome()).to.equal(Outcome.NONE);
    });

    it('ends with player X winning if he marked an entire row', () => {
        boardStub.expects('hasRowMarkedBy').withArgs(subject.players[0]).returns(true);
        boardStub.expects('hasRowMarkedBy').withArgs(subject.players[1]).returns(false);
        boardStub.expects('hasSpaceLeft').withArgs().returns(true);

        expect(subject.outcome()).to.equal(Outcome.X_WINS);
    });

    it('ends with player O winning if he marked an entire row', () => {
        boardStub.expects('hasRowMarkedBy').withArgs(subject.players[0]).returns(false);
        boardStub.expects('hasRowMarkedBy').withArgs(subject.players[1]).returns(true);
        boardStub.expects('hasSpaceLeft').withArgs().returns(true);

        expect(subject.outcome()).to.equal(Outcome.O_WINS);
    });

    it('ends in a draw if no player manages to mark an entire row', () => {
        boardStub.expects('hasRowMarkedBy').withArgs(subject.players[0]).returns(false);
        boardStub.expects('hasRowMarkedBy').withArgs(subject.players[1]).returns(false);
        boardStub.expects('hasSpaceLeft').withArgs().returns(false);

        expect(subject.outcome()).to.equal(Outcome.DRAW);
    });
});
