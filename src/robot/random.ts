import {Robot} from '../app/robot';
import Game from '../model/game';
import Move from '../model/move';

/**
 * Robot that chooses a move at random
 */
export default class Random implements Robot {
    chooseMove(game: Game): Move {
        const moves = [0, 1, 2].reduce(
            (carry, x) => carry.concat(
                [0, 1, 2].map(y => new Move(x, y))
            ),
            []
        );

        const valid = moves.filter(m => game.isValidMove(m));

        if (valid.length === 0) {
            throw new Error('No more valid moves left');
        }

        return valid[Math.floor(Math.random() * valid.length)];
    }
}
