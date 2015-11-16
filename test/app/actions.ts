/// <reference path="../../typings/tsd.d.ts" />
import {expect} from 'chai';
import {ActionType, Action} from '../../src/app/actions';
import {ChoosePlayerAction, PerformMoveAction} from '../../src/app/actions';

describe('actions', () => {
    describe('ChoosePlayerAction', () => {
        let subject: ChoosePlayerAction;

        beforeEach(() => {
            subject = new ChoosePlayerAction('X');
        });

        it('is an Action', () => {
            expect(subject).to.be.instanceof(Action);
        });

        it('has the right type', () => {
            expect(subject.type).to.equal(ActionType.CHOOSE_PLAYER);
        });

        it('has the right name', () => {
            expect(subject.name).to.equal('X');
        });
    });

    describe('PerformMoveAction', () => {
        let subject: PerformMoveAction;

        beforeEach(() => {
            subject = new PerformMoveAction(1, 2);
        });

        it('is an Action', () => {
            expect(subject).to.be.instanceof(Action);
        });

        it('has the right type', () => {
            expect(subject.type).to.equal(ActionType.PERFORM_MOVE);
        });

        it('has an x coordinate', () => {
            expect(subject.x).to.equal(1);
        });

        it('has a y coordinate', () => {
            expect(subject.y).to.equal(2);
        });
    });
});
