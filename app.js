const gameBoard = (() => {
    let grid = [
        Array(3).fill(""),
        Array(3).fill(""),
        Array(3).fill("")
    ];
    const getGrid = () => grid;
    const addMove = (rowIndex, colIndex, symbol) => {
        grid[rowIndex][colIndex] = symbol;
    };
    const checkWinner = (symbol) => {
        let win = false;

        if (
            grid[0][0] === symbol && grid[0][1] === symbol && grid[0][2] === symbol
            || grid[1][0] === symbol && grid[1][1] === symbol && grid[1][2] === symbol
            || grid[2][0] === symbol && grid[2][1] === symbol && grid[2][2] === symbol
            || grid[0][0] === symbol && grid[1][0] === symbol && grid[2][0] === symbol
            || grid[0][1] === symbol && grid[1][1] === symbol && grid[2][1] === symbol
            || grid[0][2] === symbol && grid[1][2] === symbol && grid[2][2] === symbol
            || grid[0][0] === symbol && grid[1][1] === symbol && grid[2][2] === symbol
            || grid[0][2] === symbol && grid[1][1] === symbol && grid[2][0] === symbol)
        {
            win = true;
        }
        return win;
    };

    const checkTie = () => {
        let tie = false;

        tie = grid.every((row) => {
            return row.every((cell) => cell !== "");   
        });

        return tie;
    };

    return {getGrid, addMove, checkWinner, checkTie};
})();

const displayController = (() => {
    const renderGrid = (grid) => {
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            for (let colIndex = 0; colIndex < 3; colIndex++) {
                const gridItem = document.querySelector(
                    `.grid-item[data-row-index="${rowIndex}"][data-col-index="${colIndex}"]`);
                gridItem.textContent = grid[rowIndex][colIndex];
            }
        }
    };
    const addGridClickEvents = () => {
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            for (let colIndex = 0; colIndex < 3; colIndex++) {
                const gridItem = document.querySelector(
                    `.grid-item[data-row-index="${rowIndex}"][data-col-index="${colIndex}"]`);
                gridItem.addEventListener("click", gridClickEvent);
            }
        }
    };
    const gridClickEvent = (e) => {
        const rowIndex = e.target.dataset.rowIndex;
        const colIndex = e.target.dataset.colIndex;
        game.playTurn(rowIndex, colIndex);
    };
    const removeGridClickEvent = (rowIndex, colIndex) => {
        const gridItem = document.querySelector(
            `.grid-item[data-row-index="${rowIndex}"][data-col-index="${colIndex}"]`);
        gridItem.removeEventListener("click", gridClickEvent);
    };

    return {renderGrid, addGridClickEvents, removeGridClickEvent};
})();

const createPlayer = (name, symbol) => {
    const playMove = (rowIndex, colIndex) => {
        gameBoard.addMove(rowIndex, colIndex, symbol);
    }

    return {name, symbol, playMove}
};

const game = (() => {
    const playerOne = createPlayer("Player One", "X");
    const playerTwo = createPlayer("Player Two", "O");
    let currentPlayer = playerOne;
    let win = false;
    let tie = false;

    displayController.addGridClickEvents();

    const playTurn = (rowIndex, colIndex) => {
        const grid = gameBoard.getGrid();

        currentPlayer.playMove(rowIndex, colIndex);
        displayController.renderGrid(grid);
        displayController.removeGridClickEvent(rowIndex, colIndex);
        win = gameBoard.checkWinner(currentPlayer.symbol);
        
        if (!win) {
            tie = gameBoard.checkTie();
        }

        if (win || tie) game.endGame();

        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        }
        else {
            currentPlayer = playerOne;
        }
    };
    const endGame = () => {
        console.log("end game");
    };

    return {playTurn, endGame};
})();