import {Robot} from '../app/robot';
import Game from '../model/game';
import Move from '../model/move';

/**
 * Robot that chooses the first valid move
 */
export default class Random implements Robot {
    chooseMove(game: Game): Move {
        for (let x: number = 0; x < game.board.width; x++) {
            for (let y: number = 0; y < game.board.height; y++) {
                let move: Move = new Move(x, y);

                if (game.isValidMove(move)) {
                    return move;
                }
            }
        }

        throw new Error('No more valid moves left');
    }
}
