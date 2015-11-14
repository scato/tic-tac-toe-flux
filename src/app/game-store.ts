import {ChoosePlayerAction} from './actions';
import Player from '../model/player';
import Game from '../model/game';

export default class GameStore {
    private _game: Game;
    private _humanPlayer: Player;
    private _robotPlayer: Player;

    constructor() {
        this._game = new Game();
    }

    get game(): Game {
        return this._game;
    }

    get humanPlayer(): Player {
        return this._humanPlayer;
    }

    get robotPlayer(): Player {
        return this._robotPlayer;
    }

    public onChoosePlayer(action: ChoosePlayerAction): void {
        const player: Player = this._game.players.filter(p => p.name === action.name)[0];

        if (player === undefined) {
            throw new Error('Unknown player "' + action.name + '"');
        }

        this._humanPlayer = player;
        this._robotPlayer = this._game.players.filter(p => p !== player)[0];
    }
}
