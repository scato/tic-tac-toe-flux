import Player from './player';

export default class Space {
    private _markedBy: Player;

    get marked(): boolean {
        return this._markedBy !== undefined;
    }

    markedBy(player: Player): boolean {
        return this._markedBy === player;
    }

    mark(player: Player): void {
        this._markedBy = player;
    }
}

