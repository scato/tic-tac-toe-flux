var sinon = require('sinon');
var expect = require('chai').expect;
var inquirer = require('inquirer');

describe('choose-player', () => {
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
            var answer = new Promise((resolve, reject) => {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'player',
                        message: 'Choose a player',
                        choices: ['X', 'O']
                    }
                ], function(answers) {
                    resolve(answers.player);
                });
            });

            input('\n');

            return answer;
        }).then(result => {
            expect(result.value).to.equal('X');
            expect(result.output.calledWithMatch('Choose a player')).to.equal(true);
        });
    });
});
