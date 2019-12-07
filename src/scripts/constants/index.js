export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;

export const TETROMINO_TYPE = Object.freeze({
    NONE:Symbol('NONE'),
    I:Symbol('I'),
    J:Symbol('J'),
    L:Symbol('L'),
    O:Symbol('O'),
    S:Symbol('S'),
    T:Symbol('T'),
    Z:Symbol('Z')
});

export const TETROMINO_ROTATION_STATE = Object.freeze({
    0:Symbol('0'),
    1:Symbol('1'),
    2:Symbol('2'),
    3:Symbol('3'),
});
