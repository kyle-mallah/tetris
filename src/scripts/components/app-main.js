import React from 'react';
import TopPanel from './topPanel'
import TetrisGamePanel from './tetrisGamePanel'

function App(props) {
    return (
        <div>
            <TopPanel />
            <TetrisGamePanel />
        </div>
    )
}

export default App;


/*

    1. Tetris Container
    2. Top Panel
    3. Game Panel
    4. Game-left-hud panel
    5. Game-right-hud panel
    6. Game-tetris panel
    7. Tetromino Cell


*/
