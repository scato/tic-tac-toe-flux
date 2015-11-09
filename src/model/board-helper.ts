import Board from './board';
import Row from './row';

export default class BoardHelper {
    private _board: Board;

    constructor(board: Board) {
        this._board = board;
    }

    horizontalRowAt(y: number): Row {
        if (0 <= y && y < Board.SIZE) {
            return new Row([
                this._board.spaceAt(0, y),
                this._board.spaceAt(1, y),
                this._board.spaceAt(2, y),
            ]);
        }

        throw new RangeError('Out of range');
    }

    verticalRowAt(x: number): Row {
        if (0 <= x && x < Board.SIZE) {
            return new Row([
                this._board.spaceAt(x, 0),
                this._board.spaceAt(x, 1),
                this._board.spaceAt(x, 2),
            ]);
        }

        throw new RangeError('Out of range');
    }

    diagonalRowAt(d: number): Row {
        if (d === -1 || d === 1) {
            return new Row([
                this._board.spaceAt(0, 1 - d),
                this._board.spaceAt(1, 1),
                this._board.spaceAt(2, 1 + d),
            ]);
        }

        throw new RangeError('Out of range');
    }
}