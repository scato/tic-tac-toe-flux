export enum ActionType {
    CHOOSE_PLAYER,
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
