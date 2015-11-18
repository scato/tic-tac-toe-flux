/// <reference path="../../typings/tsd.d.ts" />
import {expect} from 'chai';
import {mock} from 'sinon';
import GameStore from '../../src/app/game-store';
import {ChoosePlayerAction, PerformMoveAction} from '../../src/app/actions';
import {Robot} from '../../src/app/robot';
import SinonMock = Sinon.SinonMock;
import Move from '../../src/model/move';

describe('GameStore', () => {
    let subject: GameStore, robot: Robot, robotMock: SinonMock;

    beforeEach(() => {
        robot = <any> { chooseMove: () => undefined };
        robotMock = mock(robot);
        subject = new GameStore(robot);
    });

    it('lets you choose a player', () => {
        expect(() => subject.onChoosePlayer(new ChoosePlayerAction('0'))).to.throw(Error);

        subject.onChoosePlayer(new ChoosePlayerAction('X'));

        expect(subject.humanPlayer.name).to.equal('X');
        expect(subject.robotPlayer.name).to.equal('O');
        expect(subject.game.currentPlayer).to.equal(subject.humanPlayer);
    });

    it('makes the robot mark spaces', () => {
        robotMock.expects('chooseMove').withArgs(subject.game).returns(new Move(1, 1));

        subject.onChoosePlayer(new ChoosePlayerAction('O'));

        expect(subject.game.board.spaceAt(1, 1).marked).to.equal(true);
    });

    it('lets you perform moves (and makes the robot respond)', () => {
        robotMock.expects('chooseMove').withArgs(subject.game).returns(new Move(1, 1));

        subject.onChoosePlayer(new ChoosePlayerAction('X'));
        subject.onPerformMove(new PerformMoveAction(1, 2));

        expect(subject.game.board.spaceAt(1, 1).marked).to.equal(true);
        expect(subject.game.board.spaceAt(1, 2).marked).to.equal(true);
        expect(subject.game.currentPlayer).to.equal(subject.humanPlayer);
    });
});
