import React from 'react';
import TopPanel from './topPanel';
import TetrisGamePanel from './tetrisGamePanel';
import TetrisController from '../tetrisController';
import { FPS, TETROMINO_TYPE } from '../constants';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.gameLoop = {
            animationId: null,
            frameInterval: 1000.0/FPS,
            lastFrameUpdateTime: null,
            lastGameUpdateTime: null,
        }

        this.controller = new TetrisController();
        this.focusRef = React.createRef();

        this.state = {
            gravity: 1/20,
            board: this.controller.initBoard(),
            tetromino:null,
            linesCleared:0
        }

        this.handleKeypress = this.handleKeyPress(this);
        this.gameTick = this.gameTick.bind(this);
    }

    componentDidMount() {
        let now = Date.now();
        this.gameLoop.lastFrameUpdateTime = now;
        this.gameLoop.lastGameUpdateTime = now;
        this.gameLoop.animationId = window.requestAnimationFrame(this.gameTick);

        this.focusRef.current.focus();
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.gameLoop.animationId);
    }

    handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                this.handleRotateTetromino();
                break;
            case 'ArrowDown':
                this.handleSoftDropTetromino();
                break;
            case 'ArrowLeft':
                this.handleMoveTetrominoLeft();
                break;
            case 'ArrowRight':
                this.handleMoveTetrominoRight();
                break;
            case ' ':
                this.handleHardDropTetromino();
                break;
        }
    }

    handleRotateTetromino() {
        if (this.state.tetromino) {
            let updatedTetromino = this.controller.rotateTetromino(
                this.state.board,
                this.state.tetromino);
        
            this.setState({tetromino: updatedTetromino});

        }
    }

    handleSoftDropTetromino() {
        if (this.state.tetromino) {
            let updatedTetromino = this.controller.softDropTetromino(
                this.state.board,
                this.state.tetromino);
        
            this.setState({tetromino: updatedTetromino});

        }
    }

    handleMoveTetrominoLeft() {
        if (this.state.tetromino) {
            let updatedTetromino = this.controller.moveTetrominoLeft(
                this.state.board,
                this.state.tetromino);
        
            this.setState({tetromino: updatedTetromino});

        }
    }

    handleMoveTetrominoRight() {
        if (this.state.tetromino) {
            let updatedTetromino = this.controller.moveTetrominoRight(
                this.state.board,
                this.state.tetromino);
        
            this.setState({tetromino: updatedTetromino});

        }
    }

    handleHardDropTetromino() {
        if (this.state.tetromino) {
            let updatedTetromino = this.controller.hardDropTetromino(
                this.state.board,
                this.state.tetromino);

            let stableBoard = this.controller.stablizeTetromino(
                this.state.board, updatedTetromino);

            this.setState({board: stableBoard, tetromino: null}, () => {
                this.updateGameState(Date.now(), true);
            });            
        }

        
    }

    gameTick() {
        let now = Date.now();
        let frameElapsed = now - this.gameLoop.lastFrameUpdateTime;

        if (frameElapsed > this.gameLoop.frameInterval) {
            this.gameLoop.lastFrameUpdateTime = now - (frameElapsed % this.gameLoop.frameInterval);

            this.updateGameState(now);
        }

        this.gameLoop.animationId = window.requestAnimationFrame(this.gameTick);
    }

    updateGameState(now, forceUpdate=false) {
        let gameUpdateInterval = 1000/FPS/this.state.gravity;
        let gameUpdateElapsed = now - this.gameLoop.lastGameUpdateTime;
        
        if (gameUpdateElapsed > gameUpdateInterval || forceUpdate) {
            this.gameLoop.lastGameUpdateTime = now;

            let workingBoard = this.state.board.map(row => row.slice());
            let workingTetromino = this.state.tetromino;
            let workingLinesCleared = this.state.linesCleared;

            if (workingTetromino) {
                // an unstable tetromino exists
                if (this.controller.canTetrominoDrop(workingBoard,workingTetromino)) {
                    workingTetromino = this.controller.dropTetromino(workingTetromino);
                } else {
                    workingBoard = this.controller.stablizeTetromino(
                        workingBoard,
                        workingTetromino);
                    workingTetromino = null;
                }
            } else {
                // Board is stable
                let [board, linesCleared] = this.controller.handleLineClears(workingBoard);
                workingBoard = board;
                workingLinesCleared += linesCleared;
                if (this.controller.hasBoardOverflowed(workingBoard)) {
                    // TODO: game over
                }
        
                workingTetromino = this.controller.spawnTetromino();
            }
            
            this.setState({
                board: workingBoard,
                tetromino: workingTetromino,
                linesCleared: workingLinesCleared,
            });
        }
    }

    render() {
        return (
            <div tabIndex="1"
                onKeyDown={(e) => this.handleKeyPress(e)}
                ref={this.focusRef}>
                    
                <TopPanel linesCleared={this.state.linesCleared}/>
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
