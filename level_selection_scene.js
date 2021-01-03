import { CANVAS_HEIGHT, CANVAS_WIDTH, LEVEL1 } from "./constants.js"
import { GameScene } from "./game_scene.js"
import { ctx, gameScene, initilizeMenuButton, loadGameScene, loadScene, menuScene } from "./main.js"




export class LevelSelectionScene{
    constructor(){

        // Show the Level Selection HTML element
        var levelSelectionElement = document.getElementById("levelSelectionElement")
        levelSelectionElement.style.display = "flex"
        var menuElement = document.getElementById("menuElement")
        menuElement.style.display = "none"

        // Initilize buttons
        for(var i = 1; i < 16; i++){
            const levelNum = i
            initilizeMenuButton(document.getElementById("l" + levelNum + "Button"), () => {
                loadGameScene(levelNum)
                menuScene.music.pause()
                this.hide()
            })
        }
    }

    hide(){
        var levelSelectionElement = document.getElementById("levelSelectionElement")
        levelSelectionElement.style.display = "none"
    }

    draw(){
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }
}