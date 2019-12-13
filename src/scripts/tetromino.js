import { TETROMINO_LAYOUTS } from './constants/tetrominoLayouts';

/**
    Represents a tetromino that has spawned but has not yet stopped falling.
    The offset of a falling tetromino refers to the top-left corner of a 4x4
    box with respect to the game board.
*/
class Tetromino {
    constructor(type, offset, rotationState) {
        this.type = type;
        this.offset = offset;
        this.rotationState = rotationState;

        this._layouts = TETROMINO_LAYOUTS[type];
    }

    getPoints() {
        return this._layouts[this.rotationState];
    }

    rotate() {
        this.rotationState += 1;
        this.rotationState = this.rotationState % 4;
    }

}

export default Tetromino;
