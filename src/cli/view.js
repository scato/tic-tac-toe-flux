var _ = require('lodash');
var chalk = require('chalk');
var helper = require('./helper');

var colorsByPlayerName = {
    'X': 'yellow',
    'O': 'cyan'
};

exports.showSpace = (game, coordinates) => {
    var color;

    for (player of game.players) {
        if (game.board.spaceAt(coordinates.x, coordinates.y).markedBy(player)) {
            color = colorsByPlayerName[player.name];

            return chalk[color](player.name);
        }
    }

    return chalk.dim(String(helper.coordinatesToIndex(coordinates)));
};

exports.showBoard = game => {
    var xs = _.range(game.board.width);
    var ys = _.range(game.board.height).reverse();

    var verticalSeparator = '|';
    var horizontalSeparator = '---';

    var rowSeparator = _.fill(xs.slice(), horizontalSeparator).join('+');

    return ys.map(
        y => xs.map(
            x => ' ' + exports.showSpace(game, {x: x, y: y}) + ' '
        ).join(verticalSeparator)
    ).join('\n' + rowSeparator + '\n');
};
