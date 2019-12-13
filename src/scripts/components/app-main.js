import React from 'react';
import TopPanel from './topPanel';
import TetrisGamePanel from './tetrisGamePanel';
import TetrisController from '../tetrisController';
import { ENOTCONN } from 'constants';
import { Z_BEST_SPEED } from 'zlib';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.controller = new TetrisController;

        this.state = {
            timeRemaining: 10000,
            board: this.controller.initBoard(),
            tetromino:null,
            linesSent:0
        }

        this.handleKeypress = this.handleKeyPress(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.updateGameState()
        }, 200);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                this.handleRotateTetromino();
                break;
            case 'ArrowLeft':
                this.handleMoveTetrominoLeft();
                break;
            case 'ArrowRight':
                this.handleMoveTetrominoRight();
                break;
        }
    }

    handleRotateTetromino() {
        let board = this.state.board;
        let tetromino = this.state.tetromino;

        if (tetromino) {
            let updatedTetromino = this.controller.rotateTetromino(
                this.state.board,
                this.state.tetromino);
        
            this.setState({tetromino: updatedTetromino});

        }
    }

    handleMoveTetrominoLeft() {
        let board = this.state.board;
        let tetromino = this.state.tetromino;

        if (tetromino) {
            let updatedTetromino = this.controller.moveTetrominoLeft(
                this.state.board,
                this.state.tetromino);
        
            this.setState({tetromino: updatedTetromino});

        }
    }

    handleMoveTetrominoRight() {
        let board = this.state.board;
        let tetromino = this.state.tetromino;

        if (tetromino) {
            let updatedTetromino = this.controller.moveTetrominoRight(
                this.state.board,
                this.state.tetromino);
        
            this.setState({tetromino: updatedTetromino});

        }
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

        // todo: controller rotate -> check that rotate is possible. Tests
        // - make sure we are copying things properly e.g. workingTetromino etc
        // - change time to countdown independent of update speed

        workingTimeRemaining -= 1;
        
        this.setState({
            timeRemaining: workingTimeRemaining,
            board: workingBoard,
            tetromino: workingTetromino,
        });
    }

    render() {
        return (
            <div id="sup" tabIndex="1" onKeyDown={(e) => this.handleKeyPress(e)}>
                <TopPanel timeRemaining={this.state.timeRemaining}/>
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
