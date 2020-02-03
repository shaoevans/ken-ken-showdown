/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile */ \"./src/tile.js\");\n\n\nclass Game {\n    constructor(DOMGrid, player, dimensions = 5) {\n        this.dimensions = dimensions;\n        this.DOMGrid = DOMGrid;\n        this.player = player;\n        this.DOMGrid.style.setProperty('grid-template-columns', `repeat(${this.dimensions}, 1fr)`)\n        this.grid = [];\n        this.createInitialBoard();\n        this.solution = this.grid.slice();\n        this.setLastTileToBlank();\n        this.grid = this.grid.map((row, i) => {\n            return row.map((num, j) => {\n                return new _tile__WEBPACK_IMPORTED_MODULE_0__[\"default\"](i, j, num, this, this.DOMGrid)\n            })\n        })\n        this.createMathGroups();\n        this.gameOver = false;\n        this.shuffle2D();\n        this.zeroTile = [this.dimensions-1, this.dimensions-1];\n        this.bindKeys();\n    }\n\n    bindKeys() {\n        if (this.player === 1) {\n            window.addEventListener(\"keydown\", (e) => {\n                if (!this.gameOver) {\n                    const zeroTile = this.grid[this.zeroTile[0]][this.zeroTile[1]];\n                    if (e.keyCode === 65) {\n                        e.preventDefault();\n                        //left\n                        const zeroTileRight = zeroTile.getAdjRightTile();\n                        if (zeroTileRight) {\n                            this.swapTiles(zeroTile, zeroTileRight);\n                        }\n                    } else if (e.keyCode === 87) {\n                        e.preventDefault();\n                        //up\n                        const zeroTileBottom = zeroTile.getAdjBottomTile();\n                        if (zeroTileBottom) {\n                            this.swapTiles(zeroTile, zeroTileBottom);\n                        }\n                    } else if (e.keyCode === 68) {\n                        e.preventDefault();\n                        //right\n                        const zeroTileLeft = zeroTile.getAdjLeftTile();\n                        if (zeroTileLeft) {\n                            this.swapTiles(zeroTile, zeroTileLeft);\n                        }\n    \n                    } else if (e.keyCode === 83) {\n                        e.preventDefault();\n                        //down\n                        const zeroTileTop = zeroTile.getAdjTopTile();\n                        if (zeroTileTop) {\n                            this.swapTiles(zeroTile, zeroTileTop);\n                        }\n                    }\n                }\n            })\n        } else {\n            window.addEventListener(\"keydown\", (e) => {\n                if (!this.gameOver) {\n                    const zeroTile = this.grid[this.zeroTile[0]][this.zeroTile[1]];\n                    if (e.keyCode === 37) {\n                        e.preventDefault();\n    \n                        const zeroTileRight = zeroTile.getAdjRightTile();\n                        if (zeroTileRight) {\n                            this.swapTiles(zeroTile, zeroTileRight);\n                        }\n                    } else if (e.keyCode === 38) {\n                        e.preventDefault();\n                        //up\n                        const zeroTileBottom = zeroTile.getAdjBottomTile();\n                        if (zeroTileBottom) {\n                            this.swapTiles(zeroTile, zeroTileBottom);\n                        }\n                    } else if (e.keyCode === 39) {\n                        e.preventDefault();\n                        //right\n                        const zeroTileLeft = zeroTile.getAdjLeftTile();\n                        if (zeroTileLeft) {\n                            this.swapTiles(zeroTile, zeroTileLeft);\n                        }\n    \n                    } else if (e.keyCode === 40) {\n                        e.preventDefault();\n                        //down\n                        const zeroTileTop = zeroTile.getAdjTopTile();\n                        if (zeroTileTop) {\n                            this.swapTiles(zeroTile, zeroTileTop);\n                        }\n                    }\n                }\n            })\n        }\n    }\n\n    gameOver() {\n        this.gameOver = true;\n    }\n\n    swapTiles(tileA, tileB) {\n        const temp = tileA.value;\n        tileA.value = tileB.value;\n        tileB.value = temp;\n        tileA.rerenderTile();\n        tileB.rerenderTile();\n    }\n\n    createInitialBoard() {\n        let possibleNumsInitial = this.shuffle1D([...Array(this.dimensions+1).keys()].slice(1));\n        this.grid.push(possibleNumsInitial.slice());\n        for (let i = 1; i < this.dimensions; i++) {\n            let possibleNums = this.shuffle1D(possibleNumsInitial.slice());\n            let tempRow = [];\n            let currentIndex = 0;\n            while (possibleNums.length) {\n                if (possibleNums[currentIndex] === undefined) {\n                    tempRow = [];\n                    possibleNums = this.shuffle1D(possibleNumsInitial.slice());\n                    currentIndex = 0;\n                }\n                let j = tempRow.length;\n                let columnDoesNotHave = true;\n                for (let k = this.grid.length-1; k >= 0; k--) {\n                    if (this.grid[k][j] === possibleNums[currentIndex]) {\n                        currentIndex++; \n                        columnDoesNotHave = false;\n                        break;\n                    }\n                }\n                if (columnDoesNotHave) {\n                    tempRow.push(possibleNums.splice(currentIndex, 1)[0]);\n                    currentIndex = 0;\n                }\n            }\n            this.grid.push(tempRow);\n        }\n    }\n\n\n    setLastTileToBlank() {\n        const index = this.dimensions - 1\n        this.grid[index][index] = 0;\n    }\n\n    isSolved() {\n        for (let i = 0; i < this.dimensions; i++) {\n            for (let j = 0; j < this.dimensions; j++) {\n                if (this.grid[i][j].value !== this.solution[i][j]) {\n                    return false;\n                }\n            }\n        }\n        return true;\n    }\n\n    createMathGroups() {\n        for (let i = 0; i < this.dimensions; i++) {\n            for (let j = 0; j < this.dimensions; j++) {\n                let tile = this.grid[i][j];\n                const mathGroupArr = [];\n                if (!tile.mathGroup) {\n                    tile.setMathGroup();\n                    mathGroupArr.push(tile);\n                    const mathGroupDistribution = this.randomDistribution();\n                    const mathGroupLength = mathGroupDistribution[Math.floor(Math.random() * mathGroupDistribution.length)];\n                    let counter = 1;\n                    let adjTiles = tile.freeAdjacentTiles();\n                    this.shuffle1D(adjTiles);\n                    for (let k = 0; k < adjTiles.length; k++) {\n                        if (!adjTiles[k].mathGroup) {\n                            tile = adjTiles[k];\n                            break;\n                        }\n                    }\n                    while (tile && counter < mathGroupLength && !mathGroupArr.includes(tile)) {\n                        tile.setMathGroup();\n                        mathGroupArr.push(tile);\n                        counter++;\n                        adjTiles = tile.freeAdjacentTiles();\n                        this.shuffle1D(adjTiles);\n                        for (let k = 0; k < adjTiles.length; k++) {\n                            if (!adjTiles[k].mathGroup) {\n                                tile = adjTiles[k];\n                                break;\n                            }\n                        }\n                    }\n                    this.addMathGroupToDOM(mathGroupArr);\n                }\n            }\n        }\n    }\n\n    addMathGroupToDOM(mathGroupArr) {\n        const values = mathGroupArr.map(tile => tile.value);\n        const mathSymbol = this.selectRandomOperation(values);\n        const mathGroupValue = this.calculateGroupValue(values, mathSymbol);\n        mathSymbol ? mathGroupArr[0].addLabel(`${mathGroupValue}${mathSymbol}`) : mathGroupArr[0].addLabel(`${mathGroupValue}`)\n        for (let i = 0; i < mathGroupArr.length; i++) {\n            mathGroupArr[i].addBorders(mathGroupArr[i-1], mathGroupArr[i+1])\n        }\n    }\n\n    randomDistribution() {\n        if (this.dimensions === 3) {\n            return [2,2,2,2,3,3,3,3];\n        } else if (this.dimensions === 4) {\n            return [2,2,2,2,3,3,3,3,4,4];\n        } else {\n            return [2,2,2,2,2,3,3,3,3,3,4,4,4,5,5];\n        }\n    }\n\n    shuffle1D(a) {\n        for (let i = a.length - 1; i > 0; i--) {\n            const j = Math.floor(Math.random() * (i + 1));\n            [a[i], a[j]] = [a[j], a[i]];\n        }\n        return a;\n    }\n\n    // fix this shit\n\n    shuffle2D() {\n        for (let i = this.dimensions - 1; i > 0; i--) {\n            for (let j = this.dimensions - 1; j > 0; j--) {\n                const x = Math.floor(Math.random() * (i + 1));\n                const y = Math.floor(Math.random() * (j + 1));\n                if (this.grid[i][j] !== this.grid[x][y] && this.grid[i][j].value !== 0 && this.grid[x][y] !== 0) {\n                    this.swapTiles(this.grid[x][y], this.grid[i][j])\n                }\n            }\n        }\n    }\n\n    selectRandomOperation(values) {\n        let prob = Math.ceil(Math.random() * 2);\n        if (values.length === 1) {\n            return null;\n        } else if (values.length === 2 && prob === 1 && values[0] !== values[1]) {\n            prob = Math.ceil(Math.random() * 2);\n            const maxIndex = values.indexOf(Math.max(...values));\n            const largerNum = values[maxIndex];\n            const smallerNum = values[(values.length - 1) - maxIndex];\n            if (prob === 1 && (largerNum % smallerNum === 0)) {\n                return \"÷\";\n            } else {\n                return \"-\";\n            }\n        } else {\n            prob = Math.ceil(Math.random() * 2);\n            if (prob === 1) {\n                return \"×\";\n            } else {\n                return \"+\";\n            }\n        }\n    }\n\n    calculateGroupValue(values, mathSymbol) {\n        let total;\n        if (mathSymbol === null) { \n            return values[0];\n        } else if (mathSymbol === \"×\" || mathSymbol === \"+\") {\n            if (mathSymbol === \"×\") {\n                total = 1;\n                values.forEach(value => total *= value);\n            } else {\n                total = 0;\n                values.forEach(value => total += value);\n            }\n        } else {\n            let maxIndex = values.indexOf(Math.max(...values));\n            if (mathSymbol === \"-\") {\n                total = values[maxIndex] - values[(values.length - 1) - maxIndex];\n            } else {\n                total = values[maxIndex] / values[(values.length - 1) - maxIndex];\n            }\n        }\n        return total;\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n// 1. generate board with no duplicate rows or columns\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n// import Cube from \"./cube\";\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    // const cube = new Cube()\n    // window.cube = cube\n    const soloButton = document.getElementById(\"solo-button\");\n    const vsButton = document.getElementById(\"vs-button\");\n    const grid = document.getElementById(\"grid\");\n    const grid2 = document.getElementById(\"grid2\");\n    soloButton.addEventListener(\"click\", () => {\n        grid.innerHTML = \"\";\n        grid2.innerHTML = \"\";\n        const game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](grid, 1, 3);\n        const game2 = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](grid2, 2, 3);\n    })\n    vsButton.addEventListener(\"click\", () => {\n        grid.innerHTML = \"\";\n        grid2.innerHTML = \"\";\n        const game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](grid, 1, 3);\n        const game2 = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](grid2, 2, 3);\n    })\n    // const game = new Game(4);\n    window.game = game;\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/tile.js":
/*!*********************!*\
  !*** ./src/tile.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Tile {\n    constructor(i, j, value, game, DOMGrid) {\n        this.i = i;\n        this.j = j;\n        this.value = value;\n        this.game = game;\n        this.DOMGrid = DOMGrid;\n        this.mathGroup = false;\n        this.renderTile();\n    }\n\n    addLabel(labelString) {\n        this.labelString = labelString;\n        this.label.innerHTML = labelString;\n    }\n    \n    addBorders(before, after) {\n        const borderMap = {\n            \"[1,0]\": \"borderBottom\",\n            \"[0,1]\": \"borderRight\",\n            \"[-1,0]\": \"borderTop\",\n            \"[0,-1]\": \"borderLeft\"\n        }\n        this.tile.style.border = \"5px solid black\";\n        if (before) {\n            const posDiff = [before.i - this.i, before.j - this.j];\n            this.tile.style[borderMap[JSON.stringify(posDiff)]] = \"1px solid black\";\n        }\n        if (after) {\n            const posDiff = [after.i - this.i, after.j - this.j];\n            this.tile.style[borderMap[JSON.stringify(posDiff)]] = \"1px solid black\";\n        }\n     }\n\n    renderTile() {\n        this.tile = document.createElement(\"div\");\n        this.valueSpan = document.createElement(\"span\");\n        if (this.value === 0) {\n            this.setMathGroup();\n            // this.tile.innerHTML = \"\";\n            this.valueSpan.innerHTML = \"\";\n            this.tile.className += \"zero\";\n        } else {\n            // this.tile.innerHTML = this.value;\n            this.valueSpan.innerHTML = this.value;\n        }\n        this.label = document.createElement(\"span\");\n        this.label.className += \"label\";\n        this.tile.appendChild(this.label);\n        this.tile.appendChild(this.valueSpan)\n        this.tile.addEventListener(\"click\", () => this.handleClick());\n        this.DOMGrid.appendChild(this.tile);\n    }\n\n    rerenderTile() {\n        // this.value === 0 ? this.valueSpan.innerHTML = \"\" : this.valueSpan.innerHTML = this.value;\n        if (this.value === 0) {\n            this.game.zeroTile = [this.i, this.j]\n            this.tile.className += \"zero\";\n            this.valueSpan.innerHTML = \"\";\n        } else {\n            this.tile.classList.remove(\"zero\");\n            this.valueSpan.innerHTML = this.value;;\n        }\n    }\n\n    handleClick() {\n        const adjBlank = this.blankAdjacentTile();\n        if (adjBlank && this.value !== 0 && !this.game.gameOver) {\n            this.game.swapTiles(this, adjBlank);\n            if (this.game.isSolved()) {\n                this.game.gameOver();\n            }\n        }\n    }\n\n    possibleDirs() {\n        const dirs = [\n            [1,0],\n            [0,1],\n            [-1,0],\n            [0,-1]\n        ]\n        return dirs.filter(dir => {\n            const bounds = this.game.grid.length\n            return (this.i + dir[0] < bounds && this.i + dir[0] >= 0 && this.j + dir[1] < bounds && this.j + dir[1] >= 0)\n        })\n    }\n\n    adjacentTiles() {\n        return this.possibleDirs()\n            .map(dir => {\n                return [this.i + dir[0], this.j + dir[1]]\n            })\n            .map(pos => {\n                return this.game.grid[pos[0]][pos[1]]\n            })\n    }\n\n    setMathGroup() {\n        this.mathGroup = true;\n    }\n\n    blankAdjacentTile() {\n        return this.adjacentTiles().filter(tile => {\n            return tile.value === 0;\n        })[0];\n    }\n\n    freeAdjacentTiles() {\n        return this.adjacentTiles().filter(tile => {\n            return !tile.mathGroup;\n        })\n    }\n\n    getAdjLeftTile() {\n        return this.game.grid[this.i][this.j-1];\n    }\n\n    getAdjRightTile() {\n        return this.game.grid[this.i][this.j+1];\n    }\n\n    getAdjTopTile() {\n        return this.game.grid[this.i-1][this.j];\n    }\n\n    getAdjBottomTile() {\n        return this.game.grid[this.i+1][this.j];\n\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Tile);\n\n\n//# sourceURL=webpack:///./src/tile.js?");

/***/ })

/******/ });