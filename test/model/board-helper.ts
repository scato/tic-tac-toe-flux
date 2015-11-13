/// <reference path="../../typings/tsd.d.ts" />
import {expect} from 'chai';
import {mock, createStubInstance} from 'sinon';
import BoardHelper from '../../src/model/board-helper';
import Board from '../../src/model/board';
import Row from '../../src/model/row';
import Space from '../../src/model/space';

describe('BoardHelper', () => {
    var subject: BoardHelper, board: Board, boardMock: Sinon.SinonMock, space: Space;

    beforeEach(() => {
        board = new Board();
        subject = new BoardHelper(board);

        boardMock = mock(board);
        space = <any> createStubInstance(Space);
    });

    it('builds horizontal rows', () => {
        boardMock.expects('spaceAt').withArgs(0, 1).returns(space);
        boardMock.expects('spaceAt').withArgs(1, 1).returns(space);
        boardMock.expects('spaceAt').withArgs(2, 1).returns(space);

        expect(subject.horizontalRowAt(1)).to.be.instanceof(Row);
        expect(() => subject.horizontalRowAt(-1)).to.throw(RangeError);
        expect(() => subject.horizontalRowAt(3)).to.throw(RangeError);
    });

    it('builds vertical rows', () => {
        boardMock.expects('spaceAt').withArgs(1, 0).returns(space);
        boardMock.expects('spaceAt').withArgs(1, 1).returns(space);
        boardMock.expects('spaceAt').withArgs(1, 2).returns(space);

        expect(subject.verticalRowAt(1)).to.be.instanceof(Row);
        expect(() => subject.verticalRowAt(-1)).to.throw(RangeError);
        expect(() => subject.verticalRowAt(3)).to.throw(RangeError);
    });

    it('builds diagonal rows', () => {
        boardMock.expects('spaceAt').withArgs(0, 2).returns(space);
        boardMock.expects('spaceAt').withArgs(1, 1).returns(space);
        boardMock.expects('spaceAt').withArgs(2, 0).returns(space);

        expect(subject.diagonalRowAt(-1)).to.be.instanceof(Row);
        expect(() => subject.diagonalRowAt(-2)).to.throw(RangeError);
        expect(() => subject.diagonalRowAt(0)).to.throw(RangeError);
        expect(() => subject.diagonalRowAt(2)).to.throw(RangeError);
    });
});
