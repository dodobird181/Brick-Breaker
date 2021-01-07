import { GameScene } from "./game_scene.js"
import { RangedInt } from "./utils/ranged_int.js"

/**
 * SceneManager is a wrapped-variable built to hold game "scenes",
 * which abstracts away some important game-specific actions that are usually
 * performed on such "scenes".
 */
export class SceneManager{
    /**
     * @param {*} pScene is the initial scene to be displayed.
     */
    constructor(pScene){
        this.scene = pScene
    }

    /**
     * Draws the scene stored inside the scene manager.
     */
    draw(){
        this.scene.draw()
    }

    /**
     * 
     * @param {*} levelNum is the GameScene level we wish to load,
     * (eg. "3" loads level 3 of the game).
     */
    loadGameSceneAtLevel(levelNum){
        var rangedLevelNum = new RangedInt(levelNum, 1, 15)
        this.scene = new GameScene("./levels/" + rangedLevelNum.get() + ".png")
    }

    /**
     * Loads a non-GameScene scene, (eg. a MenuScene, or LevelSelectionScene).
     * @param {*} pScene is the scene to load.
     */
    loadScene(pScene){
        this.scene = pScene
    }

    //pause, play functions that stop "draw" calls
}