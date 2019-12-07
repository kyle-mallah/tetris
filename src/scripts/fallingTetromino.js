/**
    Represents a tetromino that has spawned but has not yet stopped falling.
    The position of a falling tetromino refers to the top-left corner of a 4x4
    box in which this tetromino is located.
*/
class FallingTetromino {
    constructor(tetrominoType, position, rotationState) {
        this.tetrominoType = tetrominoType;
        this.position = position;
        this.rotationState = rotationState;
    }

}

export default FallingTetromino;
