var expect = require('chai').expect;
var helper = require('../../src/cli/helper');

describe('helper', () => {
    describe('coordinatesToIndex', () => {
        it('translates coordinates to a number from 1 to 9', () => {
            expect(helper.coordinatesToIndex({x: 0, y: 2})).to.equal(1);
            expect(helper.coordinatesToIndex({x: 1, y: 2})).to.equal(2);
            expect(helper.coordinatesToIndex({x: 2, y: 2})).to.equal(3);

            expect(helper.coordinatesToIndex({x: 0, y: 1})).to.equal(4);
            expect(helper.coordinatesToIndex({x: 1, y: 1})).to.equal(5);
            expect(helper.coordinatesToIndex({x: 2, y: 1})).to.equal(6);

            expect(helper.coordinatesToIndex({x: 0, y: 0})).to.equal(7);
            expect(helper.coordinatesToIndex({x: 1, y: 0})).to.equal(8);
            expect(helper.coordinatesToIndex({x: 2, y: 0})).to.equal(9);
        });
    });
});
