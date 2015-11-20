import Player from './player';
import Board from './board';
import Move from './move';

export enum Outcome {
    NONE,
    X_WINS,
    O_WINS,
    DRAW
}

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

    public outcome(): Outcome {
        if (this._board.hasRowMarkedBy(this._players[0])) {
            return Outcome.X_WINS;
        }

        if (this._board.hasRowMarkedBy(this._players[1])) {
            return Outcome.O_WINS;
        }

        if (!this._board.hasSpaceLeft()) {
            return Outcome.DRAW;
        }

        return Outcome.NONE;
    }

    public performMove(player: Player, move: Move): void {
        if (player !== this._currentPlayer) {
            throw new Error('It\'s not this players turn');
        }

        this._board.spaceAt(move.x, move.y).mark(player);

        this._currentPlayer = this._players.filter(p => p !== this._currentPlayer)[0];
    }

    public isValidMove(move: Move): boolean {
        return !this._board.spaceAt(move.x, move.y).marked;
    }
}
