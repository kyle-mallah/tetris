import {
    TETROMINO_TYPE,
    TETROMINO_ROTATION_STATE,
    GRID_WIDTH,
    GRID_HEIGHT
} from './constants';
import { TETROMINO_LAYOUTS } from './constants/tetrominoLayouts';
import Tetromino from './tetromino'

class TetrisController {

    spawnTetromino() {
        let allTypes = Object.keys(TETROMINO_TYPE);
        allTypes.splice(allTypes.indexOf(TETROMINO_TYPE.NONE), 1);

        let randomType = allTypes[Math.floor(Math.random()*allTypes.length)];

        let spawnedTetromino = new Tetromino(
            randomType,
            [0, 3],
            TETROMINO_ROTATION_STATE[0]);

        return spawnedTetromino;
    }

    stablizeTetromino(board, tetromino) {
        let tetrominoPoints = tetromino.getPoints();
        let [offset_y, offset_x] = tetromino.position;

        for (let [row,col] of tetrominoPoints) {
            board[row+offset_y][col+offset_x] = tetromino.type;
        }

        return board;
    }

    handleLineClears(board) {
        return board;
    }

    hasBoardOverflowed(board) {
        return false;
    }

    isCollision(board, tetromino) {
        let [offset_y, offset_x] = tetromino.position;
        let tetrominoPoints = tetromino.getPoints();

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
