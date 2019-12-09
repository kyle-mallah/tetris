import { TETROMINO_TYPE, GRID_WIDTH, GRID_HEIGHT } from './constants';
import { TETROMINO_LAYOUTS } from './constants/tetrominoLayouts';
import Tetromino from './tetromino'

class TetrisController {

    isCollision(board, tetromino) {
        let [tetrominoOffset_y, tetrominoOffset_x] = tetromino.position;
        let tetromino_layout = tetromino.getLayout();

        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (r + tetrominoOffset_y < GRID_HEIGHT && c + tetrominoOffset_x < GRID_WIDTH) {

                    let boardCell = board[r + tetrominoOffset_y][c + tetrominoOffset_x]
                    let tetrominoCell = tetromino_layout[r][c];

                    if (boardCell !== TETROMINO_TYPE.NONE && tetrominoCell === 1) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    initBoard() {
        let board = [];

        for (let r = 0; r < GRID_HEIGHT; r++) {
            let row = [];
            for (let c = 0; c < GRID_WIDTH; c++) {
                row.push(TETROMINO_TYPE.NONE);
            }
            board.push(row);
        }

        return board;
    }

}

export default TetrisController;
