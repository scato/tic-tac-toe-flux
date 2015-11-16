/// <reference path="../../typings/tsd.d.ts" />
import {expect} from 'chai';
import Move from '../../src/model/move';

describe('Move', () => {
    let subject: Move;

    beforeEach(() => {
        subject = new Move(1, 2);
    });

    it('has an x coordinate', () => {
        expect(subject.x).to.equal(1);
    });

    it('has a y coordinate', () => {
        expect(subject.y).to.equal(2);
    });
});
