var _ = require('lodash');

exports.coordinatesToIndex = coordinates => {
    var x = coordinates.x;
    var y = coordinates.y;

    return 1 + x + 3 * (3 - y - 1);
};

exports.indexToCoordinates = index => {
    var x = (index - 1) % 3;
    var y = 2 - (index - 1 - x) / 3;

    return {x: x, y: y}
};

exports.freeSpaces = board => {
    return _.range(1, 10).filter(index => {
        var coordinates = exports.indexToCoordinates(index);

        return !board.spaceAt(coordinates.x, coordinates.y).marked;
    });
};
