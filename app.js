const gameBoard = (() => {
    let grid = [
        Array(3).fill(undefined),
        Array(3).fill(undefined),
        Array(3).fill(undefined)
    ];
    const printGrid = () => console.log(grid);
    const addMove = (rowIndex, colIndex, symbol) => {
        grid[rowIndex][colIndex] = symbol;
        printGrid();
    }

    return {printGrid, addMove};
})();

const createPlayer = (name, symbol) => {
    const playMove = () => {
        const rowIndex = Number(prompt("Select a row to play in from 0 to 2"));
        const colIndex = Number(prompt("Select a column to play in from 0 to 2"));
        return {rowIndex, colIndex};
    }

    return {name, symbol, playMove}
};

const playerOne = createPlayer("Player One", "X");
const playerTwo = createPlayer("Player Two", "O");

const game = (() => {
    const playTurn = (player) => {
        const {rowIndex, colIndex} = player.playMove();
        console.log(rowIndex, colIndex);
        gameBoard.addMove(rowIndex, colIndex, player.symbol);
    };

    return {playTurn};
})();