import { TETROMINO_LAYOUTS } from './constants/tetrominoLayouts';

/**
    Represents a tetromino that has spawned but has not yet stopped falling.
    The position of a falling tetromino refers to the top-left corner of a 4x4
    box with respect to the game board.
*/
class FallingTetromino {
    constructor(tetrominoType, position, rotationState) {
        this.tetrominoType = tetrominoType;
        this.position = position;
        this.rotationState = rotationState;

        this._layouts = TETROMINO_LAYOUTS[tetrominoType];
    }

    getLayout() {
        return this._layouts[this.rotationState];
    }

}

export default FallingTetromino;
