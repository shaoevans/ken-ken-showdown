// import Cube from "./cube";
import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
    const sword = document.getElementById("sword-sound");
    sword.volume = 0.05;
    const buttonClick = document.getElementById("button-sound");
    const music = document.getElementById("music");
    const gong = document.getElementById("gong-sound");
    music.volume = 0.05;
    // sound.src = "./../assets/audio/sword-unsheathe.mp3";
    const modal = document.getElementById("myModal");
    const p1Modal = document.getElementById("player-1-win");
    const p2Modal = document.getElementById("player-2-win");


    // Get the button that opens the modal
    const btn = document.getElementById("how-to-play");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];
    const span1 = document.getElementsByClassName("close")[1];
    const span2 = document.getElementsByClassName("close")[2];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
        // modal.style.display = "block";
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";

    }

    span1.onclick = function() {
        p1Modal.style.display = "none";
    }

    span2.onclick = function() {
        p2Modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal || event.target == p2Modal || event.target == p1Modal) {
            modal.style.display = "none";
            p1Modal.style.display = "none";
            p2Modal.style.display = "none";
        }
    }
    let game;
    let game2;
    const buttons = document.getElementById("buttons");
    const practiceButton = document.getElementById("practice")
    const newButton = document.getElementById("new-game-button")
    const soloButton = document.getElementById("solo-button");
    const vsButton = document.getElementById("vs-button");
    const volumeButton = document.getElementById("volume-button")
    const domGame = document.getElementById("game")
    const domGame2 = document.getElementById("game2")
    const grid = document.getElementById("grid");
    const grid2 = document.getElementById("grid2");
    let muted = false;

    const resetMainMenu = () => {
        buttons.classList.remove("hidden");
        domGame.classList.add("hidden");
        domGame2.classList.add("hidden");
        newButton.classList.add("hidden");
    }

    const removeMainMenu = () => {
        buttons.classList.add("hidden");
        domGame.classList.remove("hidden");
        domGame2.classList.remove("hidden");
        newButton.classList.remove("hidden");
    }

    volumeButton.addEventListener("click", () => {
        const icon = document.createElement("i");
        volumeButton.innerHTML = "";
        if (!muted) {
            icon.classList.add("fas", "fa-volume-up")
            volumeButton.appendChild(icon);
            muted = true;
            sword.muted = false;
            music.muted = false;
            gong.muted = false;
            buttonClick.muted = false;
        } else {
            icon.classList.add("fas", "fa-volume-mute")
            volumeButton.appendChild(icon);
            muted = false;
            sword.muted = true;
            music.muted = true;
            gong.muted = true;
            buttonClick.muted = true;
        }
    })

    newButton.addEventListener("click", () => {
        resetMainMenu();
        music.pause();
        music.currentTime = 0;
        if (game) {
            game.cleanupGame();
        }
        if (game2) {
            game2.cleanupGame();
        }
    })

    practiceButton.addEventListener("click", () => {
        sword.play();
        music.play();
        grid.innerHTML = "";
        grid2.innerHTML = "";
        domGame.classList.remove('hidden');
        newButton.classList.remove("hidden");
        buttons.classList.add("hidden");
        game = new Game(grid, 1, 3, modal);
    })

    practiceButton.addEventListener('mouseover', () => {
        buttonClick.play();
    })

    newButton.addEventListener('mouseover', () => {
        buttonClick.play();
    })

    soloButton.addEventListener('mouseover', () => {
        buttonClick.play();
    })

    vsButton.addEventListener('mouseover', () => {
        buttonClick.play();
    })

    btn.addEventListener('mouseover', () => {
        buttonClick.play();
    })

    soloButton.addEventListener("click", () => {
        sword.play();
        music.play();

        grid.innerHTML = "";
        grid2.innerHTML = "";
        removeMainMenu();
        let games = [];
        game = new Game(grid, 1, 3, games);
        game2 = new Game(grid2, "computer", 3, games);
        games.push(game);
        games.push(game2);
    })
    vsButton.addEventListener("click", () => {
        sword.play();
        music.play();
        grid.innerHTML = "";
        grid2.innerHTML = "";
        removeMainMenu();
        game = new Game(grid, 1, 3, modal);
        game2 = new Game(grid2, 2, 3, modal);
    })
    // const game = new Game(4);
    window.game = game;
})