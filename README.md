# ken-ken-showdown

[Link to Live Page](https://shaoevans.github.io/ken-ken-showdown/)


## Technologies

* Node.js
* NPM
* Babel
* Webpack


## Generating Random Puzzle States


```
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
```

```
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
```

## A* Algorithm to Solve Puzzle

```
findSolution() {
    const queue = [this.node];
    const visited = {};
    visited[JSON.stringify(this.node.grid)] = true;
    while (queue.length) {
        const node = queue.shift();
        visited[JSON.stringify(node.grid)] = true;
        if (node.isSolved()) {
            return node;
        }
        node.createChildren().forEach(child => {
            this.insertIntoPriorityQueue(queue, child, visited);
        })
    }
    return null;
}

insertIntoPriorityQueue(queue, node, visited) {
    if (!visited[JSON.stringify(node.grid)]) {
        if (!queue.length) {
            queue.push(node);
        } else {
            let inserted = false;
            for (let i = 0; i < queue.length; i++) {
                if (node.fScore < queue[i].fScore) {
                    inserted = true;
                    queue.splice(i, 0, node);
                    break;
                }
            }
            if (!inserted) {
                queue.push(node);
            }
        }
    }
}

calculateFScore() {
    return this.calculateHScore() + this.moves.length;
}

calculateHScore() {
    let hScore = 0;
    for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid.length; j++) {
            if (this.grid[i][j] !== this.solution[i][j]) {
                hScore++;
            }
        }
    }
    return hScore
}
```


