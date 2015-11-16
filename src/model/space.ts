import Player from './player';

export default class Space {
    private _markedBy: Player;

    get marked(): boolean {
        return this._markedBy !== undefined;
    }

    public markedBy(player: Player): boolean {
        return this._markedBy === player;
    }

    public mark(player: Player): void {
        if (this.marked) {
            throw new Error('Space is already marked');
        }

        this._markedBy = player;
    }
}
