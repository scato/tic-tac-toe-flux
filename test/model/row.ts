/// <reference path="../../typings/tsd.d.ts" />
import {expect} from 'chai';
import {createStubInstance} from 'sinon';
import sinonChai = require('sinon-chai');
import Player from '../../src/model/player';
import Space from '../../src/model/space';
import Row from '../../src/model/row';

describe('Row', () => {
    var subject: Row,
        spaceOne: any,
        spaceTwo: any,
        spaceThree: any,
        player: Player;

    beforeEach(() => {
        spaceOne = createStubInstance(Space);
        spaceTwo = createStubInstance(Space);
        spaceThree = createStubInstance(Space);
        player = <any> createStubInstance(Player);

        subject = new Row(<any> [spaceOne, spaceTwo, spaceThree]);
    });

    it('is not marked by a player when no spaces are marked by that player', () => {
        spaceOne.markedBy.withArgs(player).returns(false);
        spaceTwo.markedBy.withArgs(player).returns(false);
        spaceThree.markedBy.withArgs(player).returns(false);

        expect(subject.markedBy(player)).to.equal(false);
    });

    it('is not marked by a player when only some spaces are marked by that player', () => {
        spaceOne.markedBy.withArgs(player).returns(true);
        spaceTwo.markedBy.withArgs(player).returns(true);
        spaceThree.markedBy.withArgs(player).returns(false);

        expect(subject.markedBy(player)).to.equal(false);
    });

    it('is marked by a player when all spaces are marked by that player', () => {
        spaceOne.markedBy.withArgs(player).returns(true);
        spaceTwo.markedBy.withArgs(player).returns(true);
        spaceThree.markedBy.withArgs(player).returns(true);

        expect(subject.markedBy(player)).to.equal(true);
    });
});
