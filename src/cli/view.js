var _ = require('lodash');
var chalk = require('chalk');
var helper = require('./helper');
var Outcome = require('../model/game').Outcome;

var colorsByPlayerName = {
    'X': 'yellow',
    'O': 'cyan'
};

exports.renderSpace = (game, coordinates) => {
    var color;

    for (player of game.players) {
        if (game.board.spaceAt(coordinates.x, coordinates.y).markedBy(player)) {
            color = colorsByPlayerName[player.name];

            return chalk[color](player.name);
        }
    }

    return chalk.dim(String(helper.coordinatesToIndex(coordinates)));
};

exports.renderBoard = game => {
    var xs = _.range(game.board.width);
    var ys = _.range(game.board.height).reverse();

    var verticalSeparator = '|';
    var horizontalSeparator = '---';

    var rowSeparator = _.fill(xs.slice(), horizontalSeparator).join('+');

    return ys.map(
        y => xs.map(
            x => ' ' + exports.renderSpace(game, {x: x, y: y}) + ' '
        ).join(verticalSeparator)
    ).join('\n' + rowSeparator + '\n');
};

exports.renderOutcome = game => {
    switch (game.outcome()) {
        case Outcome.X_WINS:
            return 'X wins!';
        case Outcome.O_WINS:
            return 'O wins!';
        case Outcome.DRAW:
            return 'It\'s a draw!';
        default:
            return '';
    }
};
