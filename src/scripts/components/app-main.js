import React from 'react';
import TopPanel from './topPanel';
import TetrisGamePanel from './tetrisGamePanel';
import TetrisController from '../tetrisController';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.controller = new TetrisController;

        this.state = {
            timeRemaining: 100,
            board: this.controller.initBoard(),
            tetromino:null,
            linesSent:0
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.updateGameState()
        }, 700);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateGameState() {
        let workingBoard = this.state.board.map(row => row.slice());
        let workingTimeRemaining = this.state.timeRemaining;
        let workingTetromino = this.state.tetromino;

        if (this.state.timeRemaining > 0) {
            if (workingTetromino) {
                if (this.controller.canTetrominoDrop(workingBoard,workingTetromino)) {
                    workingTetromino = this.controller.dropTetromino(workingTetromino);
                } else {
                    // tetromino becomes stable
                    workingBoard = this.controller.stablizeTetromino(
                        workingBoard,
                        workingTetromino);
                    workingTetromino = null;
                }
            } else {
                // Board is stable
                workingBoard = this.controller.handleLineClears(workingBoard);
                if (this.controller.hasBoardOverflowed(workingBoard)) {
                    // TODO: game over
                }
        
                workingTetromino = this.controller.spawnTetromino();
            }
        } else {
            // TODO: game over
        }

        workingTimeRemaining -= 1;
        
        this.setState({
            timeRemaining: workingTimeRemaining,
            board: workingBoard,
            tetromino: workingTetromino,
        });
    }

    render() {
        return (
            <div>
                <TopPanel />
                <TetrisGamePanel
                    board={this.state.board}
                    tetromino={this.state.tetromino}/>
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
