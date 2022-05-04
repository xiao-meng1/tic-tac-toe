const gameBoard = (() => {
    let grid = [
        Array(3).fill(""),
        Array(3).fill(""),
        Array(3).fill("")
    ];
    const getGrid = () => grid;
    const addMove = (rowIndex, colIndex, symbol) => {
        grid[rowIndex][colIndex] = symbol;
        console.log(grid);
    };

    return {getGrid, addMove};
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
    const addClickEvents = () => {
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

    return {renderGrid, addClickEvents};
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
    
    const playTurn = (rowIndex, colIndex) => {
        currentPlayer.playMove(rowIndex, colIndex);
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        }
        else {
            currentPlayer = playerOne;
        }
    };

    return {playTurn};
})();