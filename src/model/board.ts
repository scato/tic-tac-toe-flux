import Space from './space';

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
}
