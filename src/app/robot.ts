import Move from '../model/move';
import Game from '../model/game';

export interface Robot {
    chooseMove(game: Game): Move;
}
