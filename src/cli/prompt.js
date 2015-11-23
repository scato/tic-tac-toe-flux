var inquirer = require('inquirer');

exports.choosePlayer = () => {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'player',
                message: 'Choose a player',
                choices: ['X', 'O']
            }
        ], answers => {
            resolve(answers.player);
        });
    });
};

exports.chooseSpace = freeSpaces => {
    return new Promise((resolve, reject) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'space',
                message: 'Which space do you want to mark?',
                validate: space => freeSpaces.indexOf(Number(space)) !== -1,
                filter: Number
            }
        ], answers => {
            resolve(answers.space);
        });
    });
};
