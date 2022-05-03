const gameBoard = (() => {
    let grid = [
        Array(3).fill(undefined),
        Array(3).fill(undefined),
        Array(3).fill(undefined)
    ];
    const printGrid = () => console.log(grid);
    const addMove = (rowIndex, columnIndex, symbol) => {
        grid[rowIndex][columnIndex] = symbol;
        printGrid();
    }

    return {printGrid, addMove};
})();

const createPlayer = (name, symbol) => {
    const playMove = (rowIndex, columnIndex) => {
        gameBoard.addMove(rowIndex, columnIndex, symbol);
    }

    return {name, symbol, playMove}
}

const playerOne = createPlayer("Player One", "X");
const playerTwo = createPlayer("Player Two", "O");