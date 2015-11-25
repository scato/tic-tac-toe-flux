var sinon = require('sinon');
var expect = require('chai').expect;
var inquirer = require('inquirer');
var prompt = require('../../src/cli/prompt');

describe('prompt', () => {
    function capture(body) {
        return new Promise((resolve, reject) => {
            var input = data => process.stdin.emit('data', data);
            var output = sinon.spy();
            var initialOutput = process.stdout.write;

            process.stdout.write = output;
            body(input).then(value => {
                process.stdout.write = initialOutput;
                resolve({value: value, output: output});
            }, reason => {
                process.stdout.write = initialOutput;
                reject(reason);
            });
        });
    }

    it('should ask the user to choose a player', () => {
        return capture(input => {
            var answer = prompt.choosePlayer();

            input('\n');

            return answer;
        }).then(result => {
            expect(result.value).to.equal('X');
            expect(result.output.calledWithMatch('Choose a player')).to.equal(true);
        });
    });

    it('should ask the user to choose a space', () => {
        return capture(input => {
            var freeSpaces = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            var answer = prompt.chooseSpace(freeSpaces);

            input('1\n');

            return answer;
        }).then(result => {
            expect(result.value).to.equal(1);
            expect(result.output.calledWithMatch('Which space do you want to mark?'));
        });
    });
});
