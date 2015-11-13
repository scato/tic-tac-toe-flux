import Player from './player';
import Board from './board';

export default class Game {
    private _players: Array<Player>;
    private _currentPlayer: Player;
    private _board: Board;

    constructor() {
        this._players = [
            new Player('X'),
            new Player('O'),
        ];

        this._currentPlayer = this._players[0];

        this._board = new Board();
    }

    get players(): Array<Player> {
        return this._players;
    }

    get currentPlayer(): Player {
        return this._currentPlayer;
    }

    get board(): Board {
        return this._board;
    }

    public mark(player: Player, x: number, y: number): void {
        if (player !== this._currentPlayer) {
            throw new Error('It\'s not this players turn');
        }

        this._board.spaceAt(x, y).mark(player);

        this._currentPlayer = this._players.filter(p => p !== this._currentPlayer)[0];
    }
}
