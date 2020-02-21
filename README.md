# ken-ken-showdown


## Technologies

* Node.js
* NPM
* Babel
* Webpack


## Generating Random Puzzle States

`
``
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
                this.shuffle1D(adjTiles);
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
``
`

