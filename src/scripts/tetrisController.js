import { TETROMINO_TYPE, GRID_WIDTH, GRID_HEIGHT } from './constants';
import { TETROMINO_LAYOUTS } from './constants/tetrominoLayouts';
import Tetromino from './tetromino'

class TetrisController {

    isCollision(board, tetromino) {
        let [offset_y, offset_x] = tetromino.position;
        let tetrominoLayout = tetromino.getLayout();

        let tetrominoPoints = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (tetrominoLayout[r][c]) {
                    tetrominoPoints.push([r,c])
                }
            }
        }

        for (const [point_y, point_x] of tetrominoPoints) {
            if (point_y + offset_y >= GRID_HEIGHT) {
                return true;
            }

            let boardPoint = board[point_y + offset_y][point_x + offset_x];
            if (boardPoint !== TETROMINO_TYPE.NONE) {
                return true;
            }
        }

        return false;
    }

    canTetrominoDrop(board, tetromino) {
        let droppedTetromino = this.dropTetromino(tetromino);
        return !this.isCollision(board, droppedTetromino);
    }

    dropTetromino(tetromino) {
        let [pos_y, pos_x] = tetromino.position;

        let updatedTetromino = new Tetromino(
            tetromino.type,
            [pos_y+1, pos_x],
            tetromino.rotationState);

        return updatedTetromino;
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
