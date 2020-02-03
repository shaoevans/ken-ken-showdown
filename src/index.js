// import Cube from "./cube";
import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
    // const cube = new Cube()
    // window.cube = cube
    const soloButton = document.getElementById("solo-button");
    const vsButton = document.getElementById("vs-button");
    const grid = document.getElementById("grid");
    const grid2 = document.getElementById("grid2");
    soloButton.addEventListener("click", () => {
        grid.innerHTML = "";
        grid2.innerHTML = "";
        const game = new Game(grid, 1, 3);
        const game2 = new Game(grid2, 2, 3);
    })
    vsButton.addEventListener("click", () => {
        grid.innerHTML = "";
        grid2.innerHTML = "";
        const game = new Game(grid, 1, 3);
        const game2 = new Game(grid2, 2, 3);
    })
    // const game = new Game(4);
    window.game = game;
})