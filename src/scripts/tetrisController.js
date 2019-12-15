import {
    TETROMINO_TYPE,
    TETROMINO_ROTATION_STATE,
    GRID_WIDTH,
    GRID_HEIGHT
} from './constants';
import Tetromino from './tetromino'

class TetrisController {

    spawnTetromino() {
        let allTypes = Object.keys(TETROMINO_TYPE);
        allTypes.splice(allTypes.indexOf(TETROMINO_TYPE.GHOST), 2);

        let randomType = allTypes[Math.floor(Math.random()*allTypes.length)];

        let spawnedTetromino = new Tetromino(
            randomType,
            [0, 3],
            TETROMINO_ROTATION_STATE[0]);

        return spawnedTetromino;
    }

    stablizeTetromino(board, tetromino) {
        let tetrominoPoints = tetromino.getPoints();
        let [offset_y, offset_x] = tetromino.offset;

        for (let [row,col] of tetrominoPoints) {
            board[row+offset_y][col+offset_x] = tetromino.type;
        }

        return board;
    }

    handleLineClears(board) {
        board = board.map(row => row.slice());

        let numRowsEliminated = 0;
        for (let r = board.length-1; r >= 0; r--) {
            let row = board[r];

            if (row.filter(cell => cell !== TETROMINO_TYPE.NONE).length == GRID_WIDTH) {
                row.fill(TETROMINO_TYPE.NONE);
                numRowsEliminated++;
            } else {
                board = this.moveRowToIndex(board, r, r+numRowsEliminated);
            }
        }

        return [board, numRowsEliminated];
    }

    moveRowToIndex(board, rowIndex, toIndex) {
        board[toIndex] = board[rowIndex];

        return board;
    }

    hasBoardOverflowed(board) {
        return false;
    }

    rotateTetromino(board, tetromino) {
        let [offset_y, offset_x] = tetromino.offset;

        let updatedTetromino = new Tetromino(
            tetromino.type,
            [offset_y, offset_x],
            tetromino.rotationState);

        updatedTetromino.rotate();

        return updatedTetromino;
    }

    moveTetrominoLeft(board, tetromino) {
        let [offset_y, offset_x] = tetromino.offset;

        let obstructionDoesExist = false;
        for (let [point_y, point_x] of tetromino.getPoints()) {
            let actual_point_y = point_y + offset_y;
            let actual_point_x = point_x + offset_x - 1;

            let outOfBounds = actual_point_x < 0;
            let cellNotEmpty = board[actual_point_y][actual_point_x] !== TETROMINO_TYPE.NONE;
            obstructionDoesExist = obstructionDoesExist || outOfBounds || cellNotEmpty;
        }

        if (!obstructionDoesExist) {
            let updatedTetromino = new Tetromino(
                tetromino.type,
                [offset_y, offset_x-1],
                tetromino.rotationState);

            return updatedTetromino;
        } else {
            return tetromino;
        }
    }

    moveTetrominoRight(board, tetromino) {
        let [offset_y, offset_x] = tetromino.offset;

        let obstructionDoesExist = false;
        for (let [point_y, point_x] of tetromino.getPoints()) {
            let actual_point_y = point_y + offset_y;
            let actual_point_x = point_x + offset_x + 1;

            let outOfBounds = actual_point_x < 0;
            let cellNotEmpty = board[actual_point_y][actual_point_x] !== TETROMINO_TYPE.NONE;
            obstructionDoesExist = obstructionDoesExist || outOfBounds || cellNotEmpty;
        }

        if (!obstructionDoesExist) {
            let updatedTetromino = new Tetromino(
                tetromino.type,
                [offset_y, offset_x+1],
                tetromino.rotationState);

            return updatedTetromino;
        } else {
            return tetromino;
        }
    }

    isCollision(board, tetromino) {
        let [offset_y, offset_x] = tetromino.offset;
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
        let [offset_y, offset_x] = tetromino.offset;

        let updatedTetromino = new Tetromino(
            tetromino.type,
            [offset_y+1, offset_x],
            tetromino.rotationState);

        return updatedTetromino;
    }

    hardDropTetromino(board, tetromino) {
        while (this.canTetrominoDrop(board, tetromino)) {
            tetromino = this.dropTetromino(tetromino);
        }

        return tetromino;
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
