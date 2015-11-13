/// <reference path="../../typings/tsd.d.ts" />
import {expect} from 'chai';
import Player from '../../src/model/player';

describe('Player', () => {
    let subject: Player;

    beforeEach(() => {
        subject = new Player('X');
    });

    it('has a name', () => {
        expect(subject.name).to.equal('X');
    });
});

