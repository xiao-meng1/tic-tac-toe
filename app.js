const gameBoard = (() => {
    let _grid;

    const createGrid = () => {
        _grid = [
            Array(3).fill(""),
            Array(3).fill(""),
            Array(3).fill("")
        ];
    };
    const getGrid = () => _grid;
    const addMove = (rowIndex, colIndex, symbol) => {
        _grid[rowIndex][colIndex] = symbol;
    };
    const checkWinner = (symbol) => {
        let win = false;

        if (
            _grid[0][0] === symbol && _grid[0][1] === symbol && _grid[0][2] === symbol
            || _grid[1][0] === symbol && _grid[1][1] === symbol && _grid[1][2] === symbol
            || _grid[2][0] === symbol && _grid[2][1] === symbol && _grid[2][2] === symbol
            || _grid[0][0] === symbol && _grid[1][0] === symbol && _grid[2][0] === symbol
            || _grid[0][1] === symbol && _grid[1][1] === symbol && _grid[2][1] === symbol
            || _grid[0][2] === symbol && _grid[1][2] === symbol && _grid[2][2] === symbol
            || _grid[0][0] === symbol && _grid[1][1] === symbol && _grid[2][2] === symbol
            || _grid[0][2] === symbol && _grid[1][1] === symbol && _grid[2][0] === symbol)
        {
            win = true;
        }
        return win;
    };
    const checkTie = () => {
        let tie = false;

        tie = _grid.every((row) => {
            return row.every((cell) => cell !== "");   
        });

        return tie;
    };

    return {createGrid, getGrid, addMove, checkWinner, checkTie};
})();

const displayController = (() => {
    const _gridItemsNodeList = document.querySelectorAll(".grid-item");
    const _gameOverContainer = document.querySelector(".game-over-container");
    const _playAgainButton = document.createElement("button");
    const _playerOne = document.querySelector(".player-one");
    const _playerTwo = document.querySelector(".player-two");

    const renderGrid = () => {
        const grid = gameBoard.getGrid();

        _gridItemsNodeList.forEach((gridItem) => {
            const rowIndex = gridItem.dataset.rowIndex;
            const colIndex = gridItem.dataset.colIndex;
            gridItem.textContent = grid[rowIndex][colIndex];
        });
    };
    const addGridEvents = () => {
        _gridItemsNodeList.forEach((gridItem) => {
            gridItem.addEventListener("click", _gridEvent);
        });
    };
    const _gridEvent = (e) => {
        const rowIndex = e.target.dataset.rowIndex;
        const colIndex = e.target.dataset.colIndex;
        game.playTurn(rowIndex, colIndex);
    };
    const removeGridEvent = (rowIndex, colIndex) => {
        const gridItem = document.querySelector(
            `.grid-item[data-row-index="${rowIndex}"][data-col-index="${colIndex}"]`);
        gridItem.removeEventListener("click", _gridEvent);
    };
    const removeAllGridEvents = () => {
        _gridItemsNodeList.forEach((gridItem) => {
            gridItem.removeEventListener("click", _gridEvent);
        });
    };
    const addGameOver = (winnerName, result) => {
        _gameOverContainer.textContent = (result === "win") ? 
            `Game Over! The Winner is ${winnerName}` : "Game Over! Tie Game";
        _playAgainButton.textContent = "Play Again";

        _playAgainButton.addEventListener("click", () => {
            while (_gameOverContainer.firstChild) {
                _gameOverContainer.removeChild(_gameOverContainer.firstChild);
            }

            game.startGame();
        });
        _gameOverContainer.appendChild(_playAgainButton);
    }
    const toggleCurrentPlayer = (currentPlayerName) => {
        if (currentPlayerName === "Player One") {
            _playerOne.classList.add("current-player");
            _playerTwo.classList.remove("current-player");
        } else {
            _playerTwo.classList.add("current-player");
            _playerOne.classList.remove("current-player");
        }
    };

    return {renderGrid, addGridEvents, removeGridEvent, removeAllGridEvents, 
        addGameOver, toggleCurrentPlayer};
})();

const createPlayer = (name, symbol) => {
    const playMove = (rowIndex, colIndex) => {
        gameBoard.addMove(rowIndex, colIndex, symbol);
    }

    return {name, symbol, playMove}
};

const game = (() => {
    let _playerOne;
    let _playerTwo;
    let _currentPlayer;
    let _win;
    let _tie;
    let _result;

    const startGame = () => {
        _playerOne = createPlayer("Player One", "X");
        _playerTwo = createPlayer("Player Two", "O");
        _currentPlayer = _playerOne;
        _win = false;
        _tie = false;
        _result = "";

        gameBoard.createGrid();
        displayController.renderGrid();
        displayController.addGridEvents();
        displayController.toggleCurrentPlayer(_currentPlayer.name);
    };
    const playTurn = (rowIndex, colIndex) => {
        _currentPlayer.playMove(rowIndex, colIndex);
        displayController.renderGrid();
        displayController.removeGridEvent(rowIndex, colIndex);
        _win = gameBoard.checkWinner(_currentPlayer.symbol);
        
        if (_win) {
            displayController.removeAllGridEvents();
            _result = "win";
            game.endGame();
            return;
        }
        else {
            _tie = gameBoard.checkTie();
            if (_tie) {
                _result = "tie";
                game.endGame();
                return;
            }
        }

        if (_currentPlayer === _playerOne) {
            _currentPlayer = _playerTwo;
            displayController.toggleCurrentPlayer(_currentPlayer.name);
        }
        else {
            _currentPlayer = _playerOne;
            displayController.toggleCurrentPlayer(_currentPlayer.name);
        }
    };
    const endGame = () => {
        displayController.addGameOver(_currentPlayer.name, _result);
    };

    return {playTurn, startGame, endGame};
})();

game.startGame();