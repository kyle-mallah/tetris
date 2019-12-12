import TetrisController from './tetrisController';
import Tetromino from './tetromino';
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

test("No Collision: Tetromino resting on bottom of empty board", () => {
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.NONE);
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-2, 0],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.isCollision(board, tetromino)).toBeFalsy();
});

test("Collision: Tetromino overlapping non-empty bottom row of board", () => {
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-2, 0],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.isCollision(board, tetromino)).toBeTruthy();
});

test("No Collision: Tetromino sitting one row above non-empty bottom row of board", () => {
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-3, 0],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.isCollision(board, tetromino)).toBeFalsy();
});

test("No Collision: Tetromino sitting one row below non-empty bottom row of board", () => {
    board[GRID_HEIGHT-3] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-2, 0],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.isCollision(board, tetromino)).toBeFalsy();
});

test("No Collision: Tetromino sitting one column right of non-empty board cell", () => {
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    board[GRID_HEIGHT-1][GRID_WIDTH-1] = TETROMINO_TYPE.NONE;
    board[GRID_HEIGHT-1][GRID_WIDTH-2] = TETROMINO_TYPE.NONE;

    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-2, GRID_WIDTH-3],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.isCollision(board, tetromino)).toBeFalsy();
});

test("No Collision: Tetromino sitting one column left of non-empty board cell", () => {
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    board[GRID_HEIGHT-1][0] = TETROMINO_TYPE.NONE;
    board[GRID_HEIGHT-1][1] = TETROMINO_TYPE.NONE;

    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-2, -1],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.isCollision(board, tetromino)).toBeFalsy();
});

test("Collision: Tetromino extending past bottom of board", () => {
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    board[GRID_HEIGHT-1][0] = TETROMINO_TYPE.NONE;
    board[GRID_HEIGHT-1][1] = TETROMINO_TYPE.NONE;

    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-1, -1],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.isCollision(board, tetromino)).toBeTruthy();
});

test("Tetromino should drop by one row", () => {
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [0,0],
        TETROMINO_ROTATION_STATE[0]);

    let updatedTetromino = controller.dropTetromino(tetromino);

    expect(updatedTetromino.position).toEqual([1,0]);
});

test("Tetromino cannot drop: adjacent stable tetromino below", () => {
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);

    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-3, 0],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.canTetrominoDrop(board, tetromino)).toBeFalsy();
});

test("Tetromino can drop: no adjacent stable tetromino below", () => {
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);

    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-4, 0],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.canTetrominoDrop(board, tetromino)).toBeTruthy();
});

test("Tetromino cannot drop: It would pass the board limits", () => {
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [GRID_HEIGHT-2, 0],
        TETROMINO_ROTATION_STATE[0]);

    expect(controller.canTetrominoDrop(board, tetromino)).toBeFalsy();
});

test("StablieTetriomino: Tetromino should become part of board", () => {
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [5, 5],
        TETROMINO_ROTATION_STATE[0]);

    let expectedBoard = board.map(row => row.slice());
    console.log("wtf: " + expectedBoard[0]);
    expectedBoard[5][6] = TETROMINO_TYPE.O;
    expectedBoard[5][7] = TETROMINO_TYPE.O;
    expectedBoard[6][6] = TETROMINO_TYPE.O;
    expectedBoard[6][7] = TETROMINO_TYPE.O;

    let updatedBoard = controller.stablizeTetromino(board, tetromino);

    expect(JSON.stringify(updatedBoard)).toEqual(JSON.stringify(expectedBoard));

})
