class Node {
    constructor(grid, solution, parent = null, moves = []) {
        this.grid = grid;
        this.solution = solution;
        this.parent = parent;
        this.children = [];
        this.moves = moves;
        this.fScore = this.calculateFScore();
    }

    isSolved() {
        if (JSON.stringify(this.grid) === JSON.stringify(this.solution)) {
            return true;
        }
        return false;
    }   

    calculateFScore() {
        return this.calculateHScore() + this.moves.length;
    }

    createChildren() {
        const zeroPos = this.findZero();
        let dirs = [
            [1,0],
            [0,1],
            [-1,0],
            [0,-1]
        ]
        dirs = dirs.map(dir => {
            return [dir[0] + zeroPos[0], dir[1] + zeroPos[1]];
        })
        //all possible dirs
        dirs = dirs.filter(pos => {
            const bounds = this.grid.length;
            return (pos[0] < bounds && pos[0] >= 0 && pos[1] < bounds && pos[1] >= 0)
        })
        dirs.forEach(pos => {
            const newGrid = this.grid.map(row => row.slice());
            const temp = this.grid[pos[0]][pos[1]];
            newGrid[pos[0]][pos[1]] = 0;
            newGrid[zeroPos[0]][zeroPos[1]] = temp;
            const child = new Node(newGrid, this.solution, this, this.moves.concat([ [ [zeroPos[0], zeroPos[1]], [pos[0], pos[1]] ] ]));
            this.children.push(child);
        })
        return this.children;
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

    findZero() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid.length; j++) {
                if (this.grid[i][j] === 0) {
                    return [i, j];
                }
            }
        }
    }
}

export default Node;