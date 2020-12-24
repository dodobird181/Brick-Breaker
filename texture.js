import { TEXTURE_FILEPATH_END, TEXTURE_FILEPATH_START } from "./constants.js";
import { MyImage } from "./image.js";
import { SomeRangedInt } from "./utils/ranged_int.js";

//The range of acceptable brick-breaker texture numbers.
const TEXTURE_RANGE = [1, 61]

/**
 * A texture for displaying images in brick-breaker.
 */
export class Texture {

    /**
     * Creates a texture.
     * @param {*} num the brick-breaker texture number.
     * @param {*} scaleWidth scaling for the texture's width.
     * @param {*} scaleHeight scaling for the texture's height.
     */
    constructor(num, scaleWidth = 1, scaleHeight = 1) {
        textNum = SomeRangedInt(num, TEXTURE_RANGE[0], TEXTURE_RANGE[1])
        textPath = TEXTURE_FILEPATH_START + textNum.get() + TEXTURE_FILEPATH_END
        this.myImg = new MyImage(textPath, scaleWidth, scaleHeight)
    }

    /**
     * Draws the texture.
     * @param {*} x
     * @param {*} y
     */
    draw(x, y){
        this.myImg.draw(x, y)
    }
}