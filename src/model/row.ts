import Space from './space';
import Player from './player';

export default class Row {
    private _spaces: Array<Space>;

    constructor(spaces: Array<Space>) {
        this._spaces = spaces;
    }

    public markedBy(player: Player): boolean {
        return this._spaces.every(space => space.markedBy(player));
    }
}
