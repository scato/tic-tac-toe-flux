const sinon = require('sinon');
const expect = require('chai').expect;
const main = require('../../src/cli/main');

describe('main', () => {
    beforeEach(() => {
        sinon.spy(console, 'log');
    });

    afterEach(() => {
        console.log.restore();
    });

    it('should display a welcome message', () => {
        main.run();

        expect(console.log.called).to.equal(true);
        expect(console.log.calledWith('Welcome to tic-tac-toe')).to.equal(true);
    });
});
