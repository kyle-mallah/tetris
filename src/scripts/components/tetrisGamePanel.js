import React from 'react';
import TetrominoCell from './tetrominoCell';

class TetrisGamePanel extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        let boardToRender = this.props.board.map(boardRow => 
            boardRow.slice()
        );


        let tetromino = this.props.tetromino;
        if (tetromino) {
            let [offset_y, offset_x] = tetromino.position;
            let tetrominoLayout = tetromino.getLayout();
            for (let r = 0; r < 4; r++) {
                for (let c = 0; c < 4; c++) {
                    if (tetrominoLayout[r][c]) {
                        boardToRender[r+offset_y][c+offset_x] = tetromino.type;
                    }
                }
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
