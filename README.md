# ken-ken-showdown

[Link to Live Page](https://shaoevans.github.io/ken-ken-showdown/)


## Technologies

* Node.js
* NPM
* Babel
* Webpack


## Generating Random Puzzle States

To generate new random puzzles every time a user plays, I used a couple of strategies. There were many nuances that I did not plan for when creating this game. For example, you have your four basic math operations. However, two of these (subtraction and division) can only be used in scenarios where there are two squares, because division and subtraction no longer make sense when you have multiple numbers, and only when the math operation results in a whole number. 

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


Furthermore, the number of "math groups" when generating a puzzle is always random (e.g. 2 groups of 3 tiles, 3 groups of 2 tiles). This lead me to believe that the best way to generate these random puzzle states would be through the use of distributions. To approach this, I simply created arrays holding numbers in frequencies representing a distribution, and then randomly sampled from that array. Once these two tasks were taken care of, next was the actual generation of math groups themselves. After generating a random matrix representing the solution and scrambling that matrix, I then procured a simple algorithm:

1. Iterate through each item of the matrix
2. If item does not already belong to a math group, grab a number from the distribution representing the length of the math group and start creating a math group by randomly selecting neighbors in a DFS fashion.
3. Upon reaching the end of the matrix, every tile should belong to a math group.

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


## A* Algorithm to Solve Puzzle

To build a self-solving computer player, I first created a `computer player` class and a `node` class. The tree structure of my nodes would be a quarternary tree, since nodes at most can have 4 children representing each direction a tile can be moved. Each tile was evaluated for its f score, which is just a combination of the nodes h-score and g-score. The h-score was calculated via a simple iteration, checking how many tiles distance away the node is from the solved solution matrix. The g-score was also simple to calculate--simply the distance from the start node traveled to get to the current node, or how many moves have been made.

```
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
 A* relies on a priority queue in which nodes with the minimum f-score get evaluated first. As we traverse the quarternary tree and generate each children, each child is inserted into a priority queue based on its f-score. So while our queue is not empty, we simply shift off the first element, check if it is solved, otherwise evaluate its children. Note that only children representing a board state that was never seen before are inserted into the priority queue, which is what the visited object is for.
 

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

```


