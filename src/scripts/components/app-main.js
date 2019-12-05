import React from 'react';
import TopPanel from './topPanel';
import TetrisGamePanel from './tetrisGamePanel';
import TetrisController from '../tetrisController';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.controller = new TetrisController;

        this.state = {
            board: this.controller.initBoard(),
        }
    }

    render() {
        return (
            <div>
                <TopPanel />
                <TetrisGamePanel board={this.state.board}/>
            </div>
        )
    }

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
