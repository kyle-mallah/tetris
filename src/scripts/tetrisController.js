import { TETROMINO_TYPE, GRID_WIDTH, GRID_HEIGHT } from './constants';
import { TETROMINO_LAYOUTS } from './constants/tetrominoLayouts';

class TetrisController {

    isCollision(board, tetromino) {
        let [tetromino_offset_y, tetromino_offset_x] = tetromino.position;
        let tetromino_layout = tetromino.getLayout();

        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (r + tetromino_offset_y < GRID_HEIGHT && c + tetromino_offset_x < GRID_WIDTH) {

                    let boardCell = board[r + tetromino_offset_y][c + tetromino_offset_x]
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
