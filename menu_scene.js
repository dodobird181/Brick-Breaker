import { CANVAS_HEIGHT, CANVAS_WIDTH, S_CLICK, S_HOVER, S_LEVEL_WIN, S_MENU } from "./constants.js";
import { LevelSelectionScene } from "./level_selection_scene.js";
import { ctx, gameScene, initilizeMenuButton, loadScene, menuScene } from "./main.js";
import { Track, playSound } from "./sound.js";
import { getTextWidth, Text } from "./utils/text.js";


export class MenuScene{
    constructor(){
        window.addEventListener("click", this.startMenu, false)
        this.gameStarted = false
        this.music = new Track(S_MENU)
        this.menuElement = document.getElementById("menuElement")
        this.levelSelectionElement = document.getElementById("levelSelectionElement")
        this.levelSelectionElement.style.display = "none"
    }

    draw(){
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        // Greyscale menu if the canvas hasn't been clicked yet.
        if (this.gameStarted == false){
            ctx.fillStyle = "rgba(220, 220, 220, 0.5)"
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
            this.menuElement.style.opacity = "0.3"
        }
        else{// Show the HTML menu at full opacity
            this.menuElement.style.opacity = "1"
        }
    }

    /**
     * Starts the MenuScene.
     */
    startMenu(event){
        if (!menuScene.gameStarted){
            playSound(S_CLICK)
            menuScene.music.play(0.2)
            menuScene.gameStarted = true

            var startButton = document.getElementById("startButton")
            var levelSelectionButton = document.getElementById("levelSelectionButton")
            var infoButton = document.getElementById("infoButton")

            // Start
            initilizeMenuButton(startButton, () => {
                loadScene(gameScene)
                var menuElement = document.getElementById("menuElement")
                menuElement.style.display = "none"
            })

            // Level Selection
            initilizeMenuButton(levelSelectionButton, () => {
                loadScene(new LevelSelectionScene())
            })

            // Info
            initilizeMenuButton(infoButton, () => {

            })
        }
    }
}
