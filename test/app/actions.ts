/// <reference path="../../typings/tsd.d.ts" />
import {expect} from 'chai';
import {ActionType, Action} from '../../src/app/actions';
import {ChoosePlayerAction} from '../../src/app/actions';

describe('actions', () => {
    describe('ChoosePlayerAction', () => {
        let action: ChoosePlayerAction;

        beforeEach(() => {
            action = new ChoosePlayerAction('X');
        });

        it('is an Action', () => {
            expect(action).to.be.instanceof(Action);
        });

        it('has the right type', () => {
            expect(action.type).to.equal(ActionType.CHOOSE_PLAYER);
        });

        it('has the right name', () => {
            expect(action.name).to.equal('X');
        });
    });
});
