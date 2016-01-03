#!/usr/local/bin/node

require('ts-node/register');

var main = require('../src/cli/main');
var GameStore = require('../src/app/game-store').default;
var Random = require('../src/robot/random').default;
var ctrl = require('../src/cli/ctrl');
var prompt = require('../src/cli/prompt');
var view = require('../src/cli/view');
var log = console.log.bind(console);
var helper = require('../src/cli/helper');

var gameStore = new GameStore(
    new Random()
);

main.init(
    gameStore,
    ctrl.create(
        prompt,
        view,
        log,
        helper
    )
);

gameStore.emit('init');
