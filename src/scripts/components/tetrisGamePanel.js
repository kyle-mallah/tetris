import React from 'react';
import { GRID_WIDTH, GRID_HEIGHT } from '../constants';
import TetrominoCell from './tetrominoCell'

class TetrisGamePanel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {board: this.initBoard()};
    }

    initBoard() {
        let board = [];

        for (let r = 0; r < GRID_HEIGHT; r++) {
            let row = [];
            for (let c = 0; c < GRID_WIDTH; c++) {
                row.push(null);
            }
            board.push(row);
        }

        return board;
    }

    render() {
        const tetronimoBoard = this.state.board.map((boardRow, rowIndex) => {

            const tetrominoRow = boardRow.map((tetromino, columnIndex) => {
                    return <TetrominoCell key={columnIndex}/>
            });

            return (
                <div className="tetrominoRow" key={rowIndex}>
                    {tetrominoRow}
                </div>
            )
        });

        return (
            <div className="TetrisGamePanel">
                {tetronimoBoard}
            </div>
        )
    }

}

export default TetrisGamePanel;
