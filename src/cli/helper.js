exports.coordinatesToIndex = coordinates => {
    var x = coordinates.x;
    var y = coordinates.y;

    return 1 + x + 3 * (3 - y - 1);
};
