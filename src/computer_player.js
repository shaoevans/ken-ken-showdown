
import Node from "./node";

class ComputerPlayer {
    constructor(game, solution) {
        this.game = game;
        this.grid = this.game.grid
        this.solution = solution;
        this.node = new Node(this.grid.slice(), this.solution);
        this.exploredNodes = [];
        this.queue = [];
        this.findSolution();
        this.setMoveTimer();
    }

    seenBefore(node) {
        this.exploredNodes.forEach(seenNode => {
            if (JSON.stringify(node.grid) === JSON.stringify(seenNode.grid)) {
                return true;
            }
        })
        return false;
    }

    findSolution() {
        
    }

    
    calculateFScore(grid) {
        return this.calculateHScore(grid) + this.level;
    }

    calculateHScore(grid) {
        hScore = 0;
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                if (grid[i][j] !== this.solution[i][j]) {
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

export default ComputerPlayer;

