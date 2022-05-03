const gameBoard = (() => {
    let grid = [
        Array(3).fill(""),
        Array(3).fill(""),
        Array(3).fill("")
    ];
    const printGrid = () => console.log(grid);
    const addMove = (rowIndex, colIndex, symbol) => {
        grid[rowIndex][colIndex] = symbol;
        printGrid();
    };
    const render = () => {
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            for (let colIndex = 0; colIndex < 3; colIndex++) {
                const gridItem = document.querySelector(
                    `.grid-item[data-rowIndex="${rowIndex}"][data-colIndex="${colIndex}"]`);
                gridItem.textContent = grid[rowIndex][colIndex];
            }
        }
    };
    return {printGrid, addMove, render};
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