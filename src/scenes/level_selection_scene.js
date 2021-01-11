import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants.js"
import { ctx, manager, initilizeMenuButton, hideElement, showElement } from "../main.js"




export class LevelSelectionScene{
    constructor(){

        //Toggle appropriate HTML elements
        hideElement("menuElement")
        showElement("levelSelectionElement")

        // Initilize level-selection buttons
        for(var i = 1; i < 16; i++){
            const levelNum = i
            initilizeMenuButton(document.getElementById("l" + levelNum + "Button"), () => {
                manager.loadGameSceneAtLevel(levelNum)
                menuScene.music.pause()
                hideElement("levelSelectionElement")
            })
        }
    }

    /**
     * Draws the canvas background for the LevelSelectionScene
     * //TODO change later to the menuGameScene bricks breaking with balls and stuff!!
     */
    draw(){
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    }
}