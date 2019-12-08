import TetrisController from './tetrisController';
import FallingTetromino from './fallingTetromino';
import {
    TETROMINO_TYPE,
    GRID_HEIGHT,
    GRID_WIDTH,
    TETROMINO_ROTATION_STATE
} from './constants'

let controller = new TetrisController();

let board;
beforeEach(() => {
    board = controller.initBoard();
});

test("Board has dimensions GRID_HEIGHT x GRID_WIDTH", () => {
    expect(board.length).toBe(GRID_HEIGHT);

    board.forEach((row) => {
        expect(row.length).toBe(GRID_WIDTH);
    });

});

test("Board is initialized with no tetrominos on it", () => {
    for (const row of board) {
        for (const cell of row) {
            expect(cell).toBe(TETROMINO_TYPE.NONE);
        }
    }

});

test("No Collision: FallingTetromino resting on bottom of empty board", () => {
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.NONE);
    let fallingTetromino = new FallingTetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-2, 0],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.isCollision(board, fallingTetromino)).toBeFalsy();
});

test("Collision: FallingTetromino overlapping non-empty bottom row of board", () => {
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    let fallingTetromino = new FallingTetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-2, 0],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.isCollision(board, fallingTetromino)).toBeTruthy();
});

test("No Collision: FallingTetromino sitting one row above non-empty bottom row of board", () => {
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    let fallingTetromino = new FallingTetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-3, 0],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.isCollision(board, fallingTetromino)).toBeFalsy();
});

test("No Collision: FallingTetromino sitting one row below non-empty bottom row of board", () => {
    board[GRID_HEIGHT-3] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    let fallingTetromino = new FallingTetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-2, 0],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.isCollision(board, fallingTetromino)).toBeFalsy();
});

test("No Collision: FallingTetromino sitting one column right of non-empty board cell", () => {
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    board[GRID_HEIGHT-1][GRID_WIDTH-1] = TETROMINO_TYPE.NONE;
    board[GRID_HEIGHT-1][GRID_WIDTH-2] = TETROMINO_TYPE.NONE;

    let fallingTetromino = new FallingTetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-2, GRID_WIDTH-2],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.isCollision(board, fallingTetromino)).toBeFalsy();
});

test("No Collision: FallingTetromino sitting one column left of non-empty board cell", () => {
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    board[GRID_HEIGHT-1][0] = TETROMINO_TYPE.NONE;
    board[GRID_HEIGHT-1][1] = TETROMINO_TYPE.NONE;

    let fallingTetromino = new FallingTetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-2, -1],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.isCollision(board, fallingTetromino)).toBeFalsy();
});
