/// <reference path="../../typings/tsd.d.ts" />
import {expect} from 'chai';
import {mock, spy} from 'sinon';
import GameStore from '../../src/app/game-store';
import {ChoosePlayerAction, PerformMoveAction} from '../../src/app/actions';
import {Robot} from '../../src/app/robot';
import SinonMock = Sinon.SinonMock;
import SinonSpy = Sinon.SinonSpy;
import Move from '../../src/model/move';
import {Outcome} from '../../src/model/game';

describe('GameStore', () => {
    let subject: GameStore, robot: Robot, robotMock: SinonMock, onChange: SinonSpy;

    beforeEach(() => {
        robot = <any> { chooseMove: () => undefined };
        robotMock = mock(robot);
        subject = new GameStore(robot);
        onChange = spy();
        subject.on('change', onChange);
    });

    afterEach(() => {
        robotMock.verify();
    });

    it('lets you choose a player', () => {
        expect(() => subject.onChoosePlayer(new ChoosePlayerAction('0'))).to.throw(Error);

        subject.onChoosePlayer(new ChoosePlayerAction('X'));

        expect(subject.humanPlayer.name).to.equal('X');
        expect(subject.robotPlayer.name).to.equal('O');
        expect(subject.game.currentPlayer).to.equal(subject.humanPlayer);

        expect(onChange.callCount).to.equal(1);
    });

    it('makes the robot mark spaces', () => {
        robotMock.expects('chooseMove').once().withArgs(subject.game).returns(new Move(1, 1));

        subject.onChoosePlayer(new ChoosePlayerAction('O'));

        expect(subject.game.board.spaceAt(1, 1).marked).to.equal(true);

        expect(onChange.callCount).to.equal(1);
    });

    it('lets you perform moves (and makes the robot respond)', () => {
        robotMock.expects('chooseMove').once().withArgs(subject.game).returns(new Move(1, 1));

        subject.onChoosePlayer(new ChoosePlayerAction('X'));
        subject.onPerformMove(new PerformMoveAction(1, 2));

        expect(subject.game.board.spaceAt(1, 1).marked).to.equal(true);
        expect(subject.game.board.spaceAt(1, 2).marked).to.equal(true);
        expect(subject.game.currentPlayer).to.equal(subject.humanPlayer);

        expect(onChange.callCount).to.equal(2);
    });

    it('stops making the robot mark spaces when the game is finished', () => {
        const gameStub: SinonMock = mock(subject.game);
        gameStub.expects('outcome').atLeast(0).withArgs().returns(Outcome.X_WINS);
        robotMock.expects('chooseMove').never();

        subject.onChoosePlayer(new ChoosePlayerAction('X'));
        subject.onPerformMove(new PerformMoveAction(1, 1));

        expect(onChange.callCount).to.equal(2);
    });
});
