import React from 'react';

function TetrominoCell(props) {
    let className = "tetrominoCell " + props.type;

    return (
        <div className={className}/>
    )
}

export default TetrominoCell;
