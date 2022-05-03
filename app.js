const gameBoard = (() => {
    let grid = [
        Array(3).fill(undefined),
        Array(3).fill(undefined),
        Array(3).fill(undefined)
    ];
    const printGrid = () => console.log(grid);
    const addMove = (rowIndex, columnIndex, symbol) => {
        grid[rowIndex][columnIndex] = symbol;
    }

    return {printGrid, addMove};
})();