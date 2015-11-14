/// <reference path="../../typings/tsd.d.ts" />
import {expect} from 'chai';
import GameStore from '../../src/app/game-store';
import {ChoosePlayerAction} from '../../src/app/actions';

describe('GameStore', () => {
    let subject: GameStore;

    beforeEach(() => {
        subject = new GameStore();
    });

    it('lets you choose a player', () => {
        expect(() => subject.onChoosePlayer(new ChoosePlayerAction('0'))).to.throw(Error);

        subject.onChoosePlayer(new ChoosePlayerAction('X'));

        expect(subject.humanPlayer.name).to.equal('X');
        expect(subject.robotPlayer.name).to.equal('O');
    });
});
