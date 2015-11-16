/// <reference path="../../typings/tsd.d.ts" />
import {expect} from 'chai';
import Space from '../../src/model/space';
import Player from '../../src/model/player';

describe('Space', () => {
    let subject: Space, playerOne: Player, playerTwo: Player;

    beforeEach(() => {
        subject = new Space();
        playerOne = new Player('X');
        playerTwo = new Player('O');
    });

    it('is unmarked by default', () => {
        expect(subject.marked).to.equal(false);
        expect(subject.markedBy(playerOne)).to.equal(false);
        expect(subject.markedBy(playerTwo)).to.equal(false);
    });

    it('can be marked', () => {
        subject.mark(playerOne);

        expect(subject.marked).to.equal(true);
        expect(subject.markedBy(playerOne)).to.equal(true);
        expect(subject.markedBy(playerTwo)).to.equal(false);
    });

    it('cannot be marked twice', () => {
        subject.mark(playerOne);
        expect(() => subject.mark(playerTwo)).to.throw(Error);
    });
});

