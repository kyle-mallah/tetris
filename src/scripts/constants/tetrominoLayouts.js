const I = {
    TETROMINO_ROTATION_STATE[0]: [[0,0,0,0],
                                  [1,1,1,1],
                                  [0,0,0,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[1]: [[0,0,1,0],
                                  [0,0,1,0],
                                  [0,0,1,0],
                                  [0,0,1,0]],

    TETROMINO_ROTATION_STATE[2]: [[0,0,0,0],
                                  [0,0,0,0],
                                  [1,1,1,1],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[3]: [[0,1,0,0],
                                  [0,1,0,0],
                                  [0,1,0,0],
                                  [0,1,0,0]],
};

const J = {
    TETROMINO_ROTATION_STATE[0]: [[1,0,0,0],
                                  [1,1,1,0],
                                  [0,0,0,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[1]: [[0,1,1,0],
                                  [0,1,0,0],
                                  [0,1,0,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[2]: [[0,0,0,0],
                                  [1,1,1,0],
                                  [0,0,1,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[3]: [[0,1,0,0],
                                  [0,1,0,0],
                                  [1,1,0,0],
                                  [0,0,0,0]],
};

const L = {
    TETROMINO_ROTATION_STATE[0]: [[0,0,1,0],
                                  [1,1,1,0],
                                  [0,0,0,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[1]: [[0,1,0,0],
                                  [0,1,0,0],
                                  [0,1,1,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[2]: [[0,0,0,0],
                                  [1,1,1,0],
                                  [1,0,0,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[3]: [[1,1,0,0],
                                  [0,1,0,0],
                                  [0,1,0,0],
                                  [0,0,0,0]],
};

const O = {
    TETROMINO_ROTATION_STATE[0]: [[0,1,1,0],
                                  [0,1,1,0],
                                  [0,0,0,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[1]: [[0,1,1,0],
                                  [0,1,1,0],
                                  [0,0,0,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[2]: [[0,1,1,0],
                                  [0,1,1,0],
                                  [0,0,0,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[3]: [[0,1,1,0],
                                  [0,1,1,0],
                                  [0,0,0,0],
                                  [0,0,0,0]],
};

const S = {
    TETROMINO_ROTATION_STATE[0]: [[0,1,1,0],
                                  [1,1,0,0],
                                  [0,0,0,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[1]: [[0,1,0,0],
                                  [0,1,1,0],
                                  [0,0,1,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[2]: [[0,0,0,0],
                                  [0,1,1,0],
                                  [1,1,0,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[3]: [[1,0,0,0],
                                  [1,1,0,0],
                                  [0,1,0,0],
                                  [0,0,0,0]],
};

const T = {
    TETROMINO_ROTATION_STATE[0]: [[0,1,0,0],
                                  [1,1,1,0],
                                  [0,0,0,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[1]: [[0,1,0,0],
                                  [0,1,1,0],
                                  [0,1,0,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[2]: [[0,0,0,0],
                                  [1,1,1,0],
                                  [0,1,0,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[3]: [[0,1,0,0],
                                  [1,1,0,0],
                                  [0,1,0,0],
                                  [0,0,0,0]],
};

const Z = {
    TETROMINO_ROTATION_STATE[0]: [[1,1,0,0],
                                  [0,1,1,0],
                                  [0,0,0,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[1]: [[0,0,1,0],
                                  [0,1,1,0],
                                  [0,1,0,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[2]: [[0,0,0,0],
                                  [1,1,0,0],
                                  [0,1,1,0],
                                  [0,0,0,0]],

    TETROMINO_ROTATION_STATE[3]: [[0,1,0,0],
                                  [1,1,0,0],
                                  [1,0,0,0],
                                  [0,0,0,0]],
};

export const TETROMINO_LAYOUTS = Object.freeze({
    "I": I,
    "J": J,
    "L": L,
    "O": O,
    "S": S,
    "T": T,
    "Z": Z,
};
