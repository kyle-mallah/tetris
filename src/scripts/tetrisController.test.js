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

    expect(updatedTetromino.offset).toEqual([1,0]);
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

test("StablizeTetriomino: Tetromino should become part of board", () => {
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

});

test("rotateTetromino: Tetromino should go from rotationState 0 to rotationState 1", () => {
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [5, 5],
        TETROMINO_ROTATION_STATE[0]);

    let updatedTetromino = controller.rotateTetromino(board, tetromino);

    expect(updatedTetromino.rotationState).toEqual(TETROMINO_ROTATION_STATE[1]);
});

test("rotateTetromino: Tetromino should go from rotationState 1 to rotationState 2", () => {
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [5, 5],
        TETROMINO_ROTATION_STATE[1]);

    let updatedTetromino = controller.rotateTetromino(board, tetromino);

    expect(updatedTetromino.rotationState).toEqual(TETROMINO_ROTATION_STATE[2]);
});

test("rotateTetromino: Tetromino should go from rotationState 2 to rotationState 3", () => {
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [5, 5],
        TETROMINO_ROTATION_STATE[2]);

    let updatedTetromino = controller.rotateTetromino(board, tetromino);

    expect(updatedTetromino.rotationState).toEqual(TETROMINO_ROTATION_STATE[3]);
});

test("rotateTetromino: Tetromino should go from rotationState 3 to rotationState 0", () => {
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [5, 5],
        TETROMINO_ROTATION_STATE[3]);

    let updatedTetromino = controller.rotateTetromino(board, tetromino);

    expect(updatedTetromino.rotationState).toEqual(TETROMINO_ROTATION_STATE[0]);
});

test("moveTetrominoLeft: No obstruction to left of tetromino", () => {
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [0, 0],
        TETROMINO_ROTATION_STATE[0]);

    let updatedTetromino = controller.moveTetrominoLeft(board, tetromino);

    let expectedPosition = JSON.stringify([0, -1]);
    let actualPosition = JSON.stringify(updatedTetromino.offset);

    expect(actualPosition).toEqual(expectedPosition);
});

test("moveTetrominoLeft: Obstruction to left of tetromino", () => {
    board[0][0] = TETROMINO_TYPE.O;
    board[1][0] = TETROMINO_TYPE.O;

    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [0, 0],
        TETROMINO_ROTATION_STATE[0]);

    let updatedTetromino = controller.moveTetrominoLeft(board, tetromino);

    let expectedPosition = JSON.stringify([0, 0]);
    let actualPosition = JSON.stringify(updatedTetromino.offset);

    expect(actualPosition).toEqual(expectedPosition);
});

test("moveTetrominoLeft: Tetromino would move past bounds of board", () => {
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [0, -1],
        TETROMINO_ROTATION_STATE[0]);

    let updatedTetromino = controller.moveTetrominoLeft(board, tetromino);

    let expectedPosition = JSON.stringify([0, -1]);
    let actualPosition = JSON.stringify(updatedTetromino.offset);

    expect(actualPosition).toEqual(expectedPosition);
});

test("moveTetrominoRight: No obstruction to Right of tetromino", () => {
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [0, GRID_WIDTH-4],
        TETROMINO_ROTATION_STATE[0]);

    let updatedTetromino = controller.moveTetrominoRight(board, tetromino);

    let expectedPosition = JSON.stringify([0, GRID_WIDTH-3]);
    let actualPosition = JSON.stringify(updatedTetromino.offset);

    expect(actualPosition).toEqual(expectedPosition);
});

test("moveTetrominoRight: Obstruction to Right of tetromino", () => {
    board[0][GRID_WIDTH-1] = TETROMINO_TYPE.O;
    board[1][GRID_WIDTH-1] = TETROMINO_TYPE.O;

    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [0, GRID_WIDTH-4],
        TETROMINO_ROTATION_STATE[0]);

    let updatedTetromino = controller.moveTetrominoRight(board, tetromino);

    let expectedPosition = JSON.stringify([0, GRID_WIDTH-4]);
    let actualPosition = JSON.stringify(updatedTetromino.offset);

    expect(actualPosition).toEqual(expectedPosition);
});

test("moveTetrominoRight: Tetromino would move past bounds of board", () => {
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [0, GRID_WIDTH-3],
        TETROMINO_ROTATION_STATE[0]);

    let updatedTetromino = controller.moveTetrominoRight(board, tetromino);

    let expectedPosition = JSON.stringify([0, GRID_WIDTH-3]);
    let actualPosition = JSON.stringify(updatedTetromino.offset);

    expect(actualPosition).toEqual(expectedPosition);
});

test("hardDropTetromino: Dropping onto bottom of empty board", () => {
    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [0, 5],
        TETROMINO_ROTATION_STATE[0]);

    let updatedTetromino = controller.hardDropTetromino(board, tetromino);

    let actualOffset = JSON.stringify(updatedTetromino.offset);
    let expectedOffset = JSON.stringify([GRID_HEIGHT-2, 5]);

    expect(actualOffset).toEqual(expectedOffset)
});

test("hardDropTetromino: Dropping onto bottom of board with bottom row filled", () => {
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);

    let tetromino = new Tetromino(
        TETROMINO_TYPE.O,
        [0, 5],
        TETROMINO_ROTATION_STATE[0]);

    let updatedTetromino = controller.hardDropTetromino(board, tetromino);

    let actualOffset = JSON.stringify(updatedTetromino.offset);
    let expectedOffset = JSON.stringify([GRID_HEIGHT-3, 5]);

    expect(actualOffset).toEqual(expectedOffset)
});

test("handleLineClears: only bottom row is full", () => {
    let expectedBoard = board.map(row => row.slice());
    
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    let updatedBoard = controller.handleLineClears(board);

    expect(JSON.stringify(updatedBoard)).toEqual(JSON.stringify(expectedBoard));
});

test("handleLineClears: bottom 4 rows are full", () => {
    let expectedBoard = board.map(row => row.slice());
    
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    board[GRID_HEIGHT-2] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    board[GRID_HEIGHT-3] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    board[GRID_HEIGHT-4] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    let updatedBoard = controller.handleLineClears(board);


    expect(JSON.stringify(updatedBoard)).toEqual(JSON.stringify(expectedBoard));
});

test("handleLineClears: first and third from bottom clear", () => {
    let expectedBoard = board.map(row => row.slice());
    expectedBoard[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I, 2);
    expectedBoard[GRID_HEIGHT-2] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I, 2);
    
    board[GRID_HEIGHT-1] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    board[GRID_HEIGHT-2] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I, 2);
    board[GRID_HEIGHT-3] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I);
    board[GRID_HEIGHT-4] = Array(GRID_WIDTH).fill(TETROMINO_TYPE.I, 2);
    let updatedBoard = controller.handleLineClears(board);

    expect(JSON.stringify(updatedBoard)).toEqual(JSON.stringify(expectedBoard));
});
