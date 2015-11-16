export enum ActionType {
    CHOOSE_PLAYER,
    PERFORM_MOVE,
}

export class Action {
    public type: ActionType;

    constructor (type: ActionType) {
        this.type = type;
    }
}

export class ChoosePlayerAction extends Action {
    public name: string;

    constructor (name: string) {
        super(ActionType.CHOOSE_PLAYER);

        this.name = name;
    }
}

export class PerformMoveAction extends Action {
    public _x: number;
    public _y: number;

    constructor (x: number, y: number) {
        super(ActionType.PERFORM_MOVE);

        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }
}
