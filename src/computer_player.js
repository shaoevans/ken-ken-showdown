
import Node from "./node";

class ComputerPlayer {
    constructor(game, solution) {
        this.game = game;
        this.grid = this.game.numberRepresentationOfGrid();
        this.solution = solution;
        this.node = new Node(this.grid.slice(), this.solution);
        // this.exploredNodes = [];
        // this.findSolution();
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
        // start algorithm with current node in priority queue
        // shift node, removing it from queue
        // evaluate all the nodes children:
        //  if node === solution, return node
        //  else, grab all children of node and insert children into priority queue
        //      do this by iterating over all items of priority queue, find where f score is better, and then splice into
    }

    solvePuzzle() {
        const solutionNode = this.findSolution();
        const solutions = [];
        let current = solutionNode;
        while (current.parent !== null) {
            solutions.unshift(current.moves[current.moves.length-1])
            // change this so that solutions push last move
            current = current.parent;
        }
        let counter = 0;
        const interval = setInterval(() => {
            const solutionSet = solutions[counter];
            if (solutionSet) {
                const tile1 = this.game.getTile(solutionSet[0]);
                const tile2 = this.game.getTile(solutionSet[1]);
                this.game.swapTiles(tile1, tile2, true);
                counter++;
            } else {
                clearInterval(interval);
            }
        }, 500)
    }

}   

export default ComputerPlayer;

