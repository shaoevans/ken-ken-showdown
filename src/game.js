import Tile from "./tile";

class Game {
    constructor(DOMGrid, player, dimensions = 5) {
        this.dimensions = dimensions;
        this.DOMGrid = DOMGrid;
        this.player = player;
        this.DOMGrid.style.setProperty('grid-template-columns', `repeat(${this.dimensions}, 1fr)`)
        this.grid = [];
        this.createInitialBoard();
        this.solution = this.grid.slice();
        this.setLastTileToBlank();
        this.grid = this.grid.map((row, i) => {
            return row.map((num, j) => {
                return new Tile(i, j, num, this, this.DOMGrid)
            })
        })
        this.createMathGroups();
        this.gameOver = false;
        this.shuffle2D();
        this.zeroTile = [this.dimensions-1, this.dimensions-1];
        this.bindKeys();
    }

    bindKeys() {
        if (this.player === 1) {
            window.addEventListener("keydown", (e) => {
                if (!this.gameOver) {
                    const zeroTile = this.grid[this.zeroTile[0]][this.zeroTile[1]];
                    if (e.keyCode === 65) {
                        e.preventDefault();
                        //left
                        const zeroTileRight = zeroTile.getAdjRightTile();
                        if (zeroTileRight) {
                            this.swapTiles(zeroTile, zeroTileRight);
                        }
                    } else if (e.keyCode === 87) {
                        e.preventDefault();
                        //up
                        const zeroTileBottom = zeroTile.getAdjBottomTile();
                        if (zeroTileBottom) {
                            this.swapTiles(zeroTile, zeroTileBottom);
                        }
                    } else if (e.keyCode === 68) {
                        e.preventDefault();
                        //right
                        const zeroTileLeft = zeroTile.getAdjLeftTile();
                        if (zeroTileLeft) {
                            this.swapTiles(zeroTile, zeroTileLeft);
                        }
    
                    } else if (e.keyCode === 83) {
                        e.preventDefault();
                        //down
                        const zeroTileTop = zeroTile.getAdjTopTile();
                        if (zeroTileTop) {
                            this.swapTiles(zeroTile, zeroTileTop);
                        }
                    }
                }
            })
        } else {
            window.addEventListener("keydown", (e) => {
                if (!this.gameOver) {
                    const zeroTile = this.grid[this.zeroTile[0]][this.zeroTile[1]];
                    if (e.keyCode === 37) {
                        e.preventDefault();
    
                        const zeroTileRight = zeroTile.getAdjRightTile();
                        if (zeroTileRight) {
                            this.swapTiles(zeroTile, zeroTileRight);
                        }
                    } else if (e.keyCode === 38) {
                        e.preventDefault();
                        //up
                        const zeroTileBottom = zeroTile.getAdjBottomTile();
                        if (zeroTileBottom) {
                            this.swapTiles(zeroTile, zeroTileBottom);
                        }
                    } else if (e.keyCode === 39) {
                        e.preventDefault();
                        //right
                        const zeroTileLeft = zeroTile.getAdjLeftTile();
                        if (zeroTileLeft) {
                            this.swapTiles(zeroTile, zeroTileLeft);
                        }
    
                    } else if (e.keyCode === 40) {
                        e.preventDefault();
                        //down
                        const zeroTileTop = zeroTile.getAdjTopTile();
                        if (zeroTileTop) {
                            this.swapTiles(zeroTile, zeroTileTop);
                        }
                    }
                }
            })
        }
    }

    gameOver() {
        this.gameOver = true;
    }

    swapTiles(tileA, tileB) {
        const temp = tileA.value;
        tileA.value = tileB.value;
        tileB.value = temp;
        tileA.rerenderTile();
        tileB.rerenderTile();
    }

    createInitialBoard() {
        let possibleNumsInitial = this.shuffle1D([...Array(this.dimensions+1).keys()].slice(1));
        this.grid.push(possibleNumsInitial.slice());
        for (let i = 1; i < this.dimensions; i++) {
            let possibleNums = this.shuffle1D(possibleNumsInitial.slice());
            let tempRow = [];
            let currentIndex = 0;
            while (possibleNums.length) {
                if (possibleNums[currentIndex] === undefined) {
                    tempRow = [];
                    possibleNums = this.shuffle1D(possibleNumsInitial.slice());
                    currentIndex = 0;
                }
                let j = tempRow.length;
                let columnDoesNotHave = true;
                for (let k = this.grid.length-1; k >= 0; k--) {
                    if (this.grid[k][j] === possibleNums[currentIndex]) {
                        currentIndex++; 
                        columnDoesNotHave = false;
                        break;
                    }
                }
                if (columnDoesNotHave) {
                    tempRow.push(possibleNums.splice(currentIndex, 1)[0]);
                    currentIndex = 0;
                }
            }
            this.grid.push(tempRow);
        }
    }


    setLastTileToBlank() {
        const index = this.dimensions - 1
        this.grid[index][index] = 0;
    }

    isSolved() {
        for (let i = 0; i < this.dimensions; i++) {
            for (let j = 0; j < this.dimensions; j++) {
                if (this.grid[i][j].value !== this.solution[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    createMathGroups() {
        for (let i = 0; i < this.dimensions; i++) {
            for (let j = 0; j < this.dimensions; j++) {
                let tile = this.grid[i][j];
                const mathGroupArr = [];
                if (!tile.mathGroup) {
                    tile.setMathGroup();
                    mathGroupArr.push(tile);
                    const mathGroupDistribution = this.randomDistribution();
                    const mathGroupLength = mathGroupDistribution[Math.floor(Math.random() * mathGroupDistribution.length)];
                    let counter = 1;
                    let adjTiles = tile.freeAdjacentTiles();
                    this.(adjTiles);
                    for (let k = 0; k < adjTiles.length; k++) {
                        if (!adjTiles[k].mathGroup) {
                            tile = adjTiles[k];
                            break;
                        }
                    }
                    while (tile && counter < mathGroupLength && !mathGroupArr.includes(tile)) {
                        tile.setMathGroup();
                        mathGroupArr.push(tile);
                        counter++;
                        adjTiles = tile.freeAdjacentTiles();
                        this.shuffle1D(adjTiles);
                        for (let k = 0; k < adjTiles.length; k++) {
                            if (!adjTiles[k].mathGroup) {
                                tile = adjTiles[k];
                                break;
                            }
                        }
                    }
                    this.addMathGroupToDOM(mathGroupArr);
                }
            }
        }
    }

    addMathGroupToDOM(mathGroupArr) {
        const values = mathGroupArr.map(tile => tile.value);
        const mathSymbol = this.selectRandomOperation(values);
        const mathGroupValue = this.calculateGroupValue(values, mathSymbol);
        mathSymbol ? mathGroupArr[0].addLabel(`${mathGroupValue}${mathSymbol}`) : mathGroupArr[0].addLabel(`${mathGroupValue}`)
        for (let i = 0; i < mathGroupArr.length; i++) {
            mathGroupArr[i].addBorders(mathGroupArr[i-1], mathGroupArr[i+1])
        }
    }

    randomDistribution() {
        if (this.dimensions === 3) {
            return [2,2,2,2,3,3,3,3];
        } else if (this.dimensions === 4) {
            return [2,2,2,2,3,3,3,3,4,4];
        } else {
            return [2,2,2,2,2,3,3,3,3,3,4,4,4,5,5];
        }
    }

    shuffle1D(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // fix this shit

    shuffle2D() {
        for (let i = this.dimensions - 1; i > 0; i--) {
            for (let j = this.dimensions - 1; j > 0; j--) {
                const x = Math.floor(Math.random() * (i + 1));
                const y = Math.floor(Math.random() * (j + 1));
                if (this.grid[i][j] !== this.grid[x][y] && this.grid[i][j].value !== 0 && this.grid[x][y] !== 0) {
                    this.swapTiles(this.grid[x][y], this.grid[i][j])
                }
            }
        }
    }

    selectRandomOperation(values) {
        let prob = Math.ceil(Math.random() * 2);
        if (values.length === 1) {
            return null;
        } else if (values.length === 2 && prob === 1 && values[0] !== values[1]) {
            prob = Math.ceil(Math.random() * 2);
            const maxIndex = values.indexOf(Math.max(...values));
            const largerNum = values[maxIndex];
            const smallerNum = values[(values.length - 1) - maxIndex];
            if (prob === 1 && (largerNum % smallerNum === 0)) {
                return "÷";
            } else {
                return "-";
            }
        } else {
            prob = Math.ceil(Math.random() * 2);
            if (prob === 1) {
                return "×";
            } else {
                return "+";
            }
        }
    }

    calculateGroupValue(values, mathSymbol) {
        let total;
        if (mathSymbol === null) { 
            return values[0];
        } else if (mathSymbol === "×" || mathSymbol === "+") {
            if (mathSymbol === "×") {
                total = 1;
                values.forEach(value => total *= value);
            } else {
                total = 0;
                values.forEach(value => total += value);
            }
        } else {
            let maxIndex = values.indexOf(Math.max(...values));
            if (mathSymbol === "-") {
                total = values[maxIndex] - values[(values.length - 1) - maxIndex];
            } else {
                total = values[maxIndex] / values[(values.length - 1) - maxIndex];
            }
        }
        return total;
    }
}

export default Game;
// 1. generate board with no duplicate rows or columns