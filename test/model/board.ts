/// <reference path="../../typings/tsd.d.ts" />
import {expect} from 'chai';
import Board from '../../src/model/board';
import Space from '../../src/model/space';

describe('Board', () => {
    let subject: Board;

    beforeEach(() => {
        subject = new Board();
    });

    it('has dimensions', () => {
        expect(subject.width).to.equal(3);
        expect(subject.height).to.equal(3);
    });

    it('contains spaces', () => {
        expect(subject.spaceAt(0, 0)).to.be.instanceof(Space);
        expect(subject.spaceAt(2, 2)).to.be.instanceof(Space);
        expect(() => subject.spaceAt(-1, 0)).to.throw(RangeError);
        expect(() => subject.spaceAt(3, 0)).to.throw(RangeError);
        expect(() => subject.spaceAt(0, -1)).to.throw(RangeError);
        expect(() => subject.spaceAt(0, 3)).to.throw(RangeError);
    });
});
