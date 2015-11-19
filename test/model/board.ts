/// <reference path="../../typings/tsd.d.ts" />
import {expect} from 'chai';
import Board from '../../src/model/board';
import Space from '../../src/model/space';
import Player from '../../src/model/player';

describe('Board', () => {
    let subject: Board, player: Player;

    beforeEach(() => {
        subject = new Board();
        player = new Player('X');
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

    it('can have no marked rows', () => {
        expect(subject.hasRowMarkedBy(player)).to.equal(false);
    });

    it('can have a horizontal marked row', () => {
        subject.spaceAt(0, 0).mark(player);
        subject.spaceAt(1, 0).mark(player);
        subject.spaceAt(2, 0).mark(player);

        expect(subject.hasRowMarkedBy(player)).to.equal(true);
    });

    it('can have a vertical marked row', () => {
        subject.spaceAt(0, 0).mark(player);
        subject.spaceAt(0, 1).mark(player);
        subject.spaceAt(0, 2).mark(player);

        expect(subject.hasRowMarkedBy(player)).to.equal(true);
    });

    it('can have a diagonal marked row', () => {
        subject.spaceAt(0, 0).mark(player);
        subject.spaceAt(1, 1).mark(player);
        subject.spaceAt(2, 2).mark(player);

        expect(subject.hasRowMarkedBy(player)).to.equal(true);
    });

    it('has space left in the beginning', () => {
        expect(subject.hasSpaceLeft()).to.equal(true);
    });

    it('has no space left once all spaces are marked', () => {
        subject.spaceAt(0, 0).mark(player);
        subject.spaceAt(1, 0).mark(player);
        subject.spaceAt(2, 0).mark(player);
        subject.spaceAt(0, 1).mark(player);
        subject.spaceAt(1, 1).mark(player);
        subject.spaceAt(2, 1).mark(player);
        subject.spaceAt(0, 2).mark(player);
        subject.spaceAt(1, 2).mark(player);
        subject.spaceAt(2, 2).mark(player);

        expect(subject.hasSpaceLeft()).to.equal(false);
    });
});
