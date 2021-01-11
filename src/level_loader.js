import { Brick } from "./brick.js"
import { RGBCol } from "./utils/colors.js"
import { BRICK_BORDER_WIDTH, BRICK_HEIGHT, BRICK_WIDTH } from "./constants.js"
import { ctx, manager } from "./main.js"

/**
 * A level loader that loads level data from .png files 
 * into Brick-Breaker levels.
 */
export class LevelLoader{
    constructor(){
        this.onload = () => {}
    }

    /**
     * Load a .png level into the main bricks array.
     * @param {*} src the filepath of the .png level to be loaded.
     */
    load(src){

        // Load image
        var img = new Image()
        img.src = src

        var colorMap = []
        var levelMap = []

        var postFn = this.onload
        img.onload = function(){

            // Parse image data into a "level map" and "color map"
            ctx.drawImage(img, 0, 0)
            var imgData = ctx.getImageData(0, 0, img.width, img.height)
            for(var i = 0; i < imgData.data.length; i += 4){
                const r = imgData.data[i]
                const g = imgData.data[i + 1]
                const b = imgData.data[i + 2]
                colorMap.push([r, g, b])
                if (r == 0 && g == 0 && b == 0){
                    levelMap.push(0)
                }
                else{
                    levelMap.push(1)
                }
            }

            var colorArr = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
            var levelArr = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]

            // Convert color & level "maps" into 2D arrays (from their original 1D forms)
            var index = 0
            for(var i = 0; i < 23; i++){
                for(var j = 0; j < 12; j++){
                    colorArr[i][j] = colorMap[index]
                    levelArr[i][j] = levelMap[index]
                    index += 1
                }
            }

            // Add colored Bricks to main "bricks" array
            const bWidth = BRICK_WIDTH + BRICK_BORDER_WIDTH
            const bHeight = BRICK_HEIGHT + BRICK_BORDER_WIDTH

            for(var i = 0; i < 23; i++){
                for(var j = 0; j < 12; j++){
                    if (levelArr[i][j] == 1){
                        manager.scene.bricks.push(new Brick(
                            j * bWidth + 1,
                            i * bHeight + 1,
                            new RGBCol(
                                colorArr[i][j][0],
                                colorArr[i][j][1],
                                colorArr[i][j][2],
                                255
                            )
                        ))
                    }
                }
            }
            postFn()
        }
    }
}