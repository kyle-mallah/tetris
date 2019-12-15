import React from 'react';
import TetrisController from '../tetrisController';
import { TETROMINO_TYPE } from '../constants';
import TetrominoCell from './tetrominoCell';

class TetrisGamePanel extends React.Component {

    constructor(props) {
        super(props);

        this.controller = new TetrisController();
    }

    render() {
        let boardToRender = this.props.board.map(boardRow => 
            boardRow.slice()
        );

        let tetromino = this.props.tetromino;
        if (tetromino) {
            let [offset_y, offset_x] = tetromino.offset;
            let tetrominoPoints = tetromino.getPoints();

            const ghostTetromino = this.controller.hardDropTetromino(this.props.board, tetromino);
            let [ghost_offset_y, ghost_offset_x] = ghostTetromino.offset;

            for (let [row,col] of tetrominoPoints) {
                boardToRender[row+offset_y][col+offset_x] = tetromino.type;
                boardToRender[row+ghost_offset_y][col+ghost_offset_x] = TETROMINO_TYPE.GHOST;
            }

        }

        const tetrominoBoard = boardToRender.map((boardRow, rowIndex) => {

            const tetrominoRow = boardRow.map((tetromino, columnIndex) => {
                    return <TetrominoCell type={tetromino} key={columnIndex}/>
            });

            return (
                <div className="tetrominoRow" key={rowIndex}>
                    {tetrominoRow}
                </div>
            )
        });

        return (
            <div className="TetrisGamePanel">
                {tetrominoBoard}
            </div>
        )
    }

}

export default TetrisGamePanel;
