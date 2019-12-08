import tetrisController from './tetrisController';
import { TETROMINO_TYPE, GRID_HEIGHT, GRID_WIDTH } from './constants'

let controller = new tetrisController();

test("Board has dimensions GRID_HEIGHT x GRID_WIDTH", () => {
    let board = controller.initBoard();

    expect(board.length).toBe(GRID_HEIGHT);

    board.forEach((row) => {
        expect(row.length).toBe(GRID_WIDTH);
    });

});

test("Board is initialized with no tetrominos on it", () => {
    let board = controller.initBoard();

    for (const row of board) {
        for (const cell of row) {
            expect(cell).toBe(TETROMINO_TYPE.NONE);
        }
    }

});
