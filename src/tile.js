class Tile {
    constructor(i, j, value, game, DOMGrid) {
        this.i = i;
        this.j = j;
        this.value = value;
        this.game = game;
        this.DOMGrid = DOMGrid;
        this.mathGroup = false;
        this.renderTile();
    }

    addLabel(labelString) {
        this.labelString = labelString;
        this.label.innerHTML = labelString;
    }
    
    addBorders(before, after) {
        const borderMap = {
            "[1,0]": "borderBottom",
            "[0,1]": "borderRight",
            "[-1,0]": "borderTop",
            "[0,-1]": "borderLeft"
        }
        this.tile.style.border = "5px solid black";
        if (before) {
            const posDiff = [before.i - this.i, before.j - this.j];
            this.tile.style[borderMap[JSON.stringify(posDiff)]] = "1px solid black";
        }
        if (after) {
            const posDiff = [after.i - this.i, after.j - this.j];
            this.tile.style[borderMap[JSON.stringify(posDiff)]] = "1px solid black";
        }
     }

    renderTile() {
        this.tile = document.createElement("div");
        this.valueSpan = document.createElement("span");
        if (this.value === 0) {
            this.setMathGroup();
            // this.tile.innerHTML = "";
            this.valueSpan.innerHTML = "";
            this.tile.className += "zero";
        } else {
            // this.tile.innerHTML = this.value;
            this.valueSpan.innerHTML = this.value;
        }
        this.label = document.createElement("span");
        this.label.className += "label";
        this.tile.appendChild(this.label);
        this.tile.appendChild(this.valueSpan)
        this.tile.addEventListener("click", () => this.handleClick());
        this.DOMGrid.appendChild(this.tile);
    }

    rerenderTile() {
        // this.value === 0 ? this.valueSpan.innerHTML = "" : this.valueSpan.innerHTML = this.value;
        if (this.value === 0) {
            this.game.zeroTile = [this.i, this.j]
            this.tile.className += "zero";
            this.valueSpan.innerHTML = "";
        } else {
            this.tile.classList.remove("zero");
            this.valueSpan.innerHTML = this.value;;
        }
    }

    handleClick() {
        const adjBlank = this.blankAdjacentTile();
        if (adjBlank && this.value !== 0 && !this.game.gameOver) {
            this.game.swapTiles(this, adjBlank, true);
        }
    }

    possibleDirs() {
        const dirs = [
            [1,0],
            [0,1],
            [-1,0],
            [0,-1]
        ]
        return dirs.filter(dir => {
            const bounds = this.game.grid.length
            return (this.i + dir[0] < bounds && this.i + dir[0] >= 0 && this.j + dir[1] < bounds && this.j + dir[1] >= 0)
        })
    }

    adjacentTiles() {
        return this.possibleDirs()
            .map(dir => {
                return [this.i + dir[0], this.j + dir[1]]
            })
            .map(pos => {
                return this.game.grid[pos[0]][pos[1]]
            })
    }

    setMathGroup() {
        this.mathGroup = true;
    }

    blankAdjacentTile() {
        return this.adjacentTiles().filter(tile => {
            return tile.value === 0;
        })[0];
    }

    freeAdjacentTiles() {
        return this.adjacentTiles().filter(tile => {
            return !tile.mathGroup;
        })
    }

    getAdjLeftTile() {
        return this.game.grid[this.i][this.j-1];
    }

    getAdjRightTile() {
        return this.game.grid[this.i][this.j+1];
    }

    getAdjTopTile() {
        return this.game.grid[this.i-1][this.j];
    }

    getAdjBottomTile() {
        return this.game.grid[this.i+1][this.j];

    }

}

export default Tile;
