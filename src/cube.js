class Cube {
    constructor() {
        this.cube = [
            [
                [7,6,5],
                [8,9,4],
                [1,2,3]
            ],
            [
                [16,15,14],
                [17,18,13],
                [10,11,12]
            ],
            [
                [25,24,23],
                [26,27,22],
                [19,20,21]
            ]
        ]
        this.cubeDOM = document.getElementById("cube-container");
    }

    getTop() {
        return this.cube[0].flat(2).map(number => {
            return this.cubeDOM.getElementsByClassName(`cubeclass${number}`)[0]
        });
    }

    getMiddleRow() {
        return this.cube[1].map(number => {
            return this.cubeDOM.getElementsByClassName(`cubeclass${number}`)[0]
        })
    }

    getBottom() {
        return this.cube[2].flat(2).map(number => {
            return this.cubeDOM.getElementsByClassName(`cubeclass${number}`)[0]
        })
    }

    getRight() {
        const result = []
        const top = this.cube[0];
        const mid = this.cube[1];
        const bot = this.cube[2];
        for (let i = 0; i < 3; i++) {
            result.push(top[i][2]);
            result.push(mid[i][2]);
            result.push(bot[i][2]);
        }
        return result.map(number => {
            return this.cubeDOM.getElementsByClassName(`cubeclass${number}`)[0]
        })
    }

    getLeft() {
        const result = []
        const top = this.cube[0];
        const mid = this.cube[1];
        const bot = this.cube[2];
        for (let i = 0; i < 3; i++) {
            result.push(top[i][0])
            result.push(mid[i][0])
            result.push(bot[i][0])
        }
        return result.map(number => {
            return this.cubeDOM.getElementsByClassName(`cubeclass${number}`)[0]
        })
    }

    getFront() {
        return this.cube[0][2].concat(this.cube[1][2], this.cube[2][2]).flat(2).map(number => {
            return this.cubeDOM.getElementsByClassName(`cubeclass${number}`)[0]
        })
    }

    getMiddleColumn() {

    }





    isSolved() {

    }
}

export default Cube;