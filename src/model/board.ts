import Space from './space';
import Player from './player';
import BoardHelper from './board-helper';

export default class Board {
    public static SIZE: number = 3;

    private _spaces: Array<Array<Space>>;

    constructor() {
        this._spaces = [
            [new Space(), new Space(), new Space()],
            [new Space(), new Space(), new Space()],
            [new Space(), new Space(), new Space()],
        ];
    }

    get width(): number {
        return Board.SIZE;
    }

    get height(): number {
        return Board.SIZE;
    }

    public spaceAt(x: number, y: number): Space {
        if (0 <= x && x < Board.SIZE) {
            if (0 <= y && y < Board.SIZE) {
                return this._spaces[x][y];
            }
        }

        throw new RangeError('Out of range');
    }

    public hasRowMarkedBy(player: Player): boolean {
        const helper: BoardHelper = new BoardHelper(this);

        for (let y = 0; y < this.height; y++) {
            if (helper.horizontalRowAt(y).markedBy(player)) {
                return true;
            }
        }

        for (let x = 0; x < this.width; x++) {
            if (helper.verticalRowAt(x).markedBy(player)) {
                return true;
            }
        }

        for (let d of [-1, 1]) {
            if (helper.diagonalRowAt(d).markedBy(player)) {
                return true;
            }
        }

        return false;
    }

    public hasSpaceLeft(): boolean {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.width; y++) {
                if (!this.spaceAt(x, y).marked) {
                    return true;
                }
            }
        }

        return false;
    }
}
