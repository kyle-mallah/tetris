import React from 'react';
import TetrominoCell from './tetrominoCell';

class TetrisGamePanel extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        const tetrominoBoard = this.props.board.map((boardRow, rowIndex) => {

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
