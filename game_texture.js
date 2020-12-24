import { TEXTURE_FILEPATH_END, TEXTURE_FILEPATH_START } from "./constants.js";
import { ctx } from "./main.js";
import { RangedInt } from "./utils/ranged_int.js";

/**
 * GameTexture is a wrapped GameImage featuring brick-breaker-specific
 * texture-like properties.
 */
export class GameTexture{

    /**
     * Creates a new GameTexture with width & height scaling equal to 'textureScaling',
     * unless textureHeight is specified, in which case width is scaled by to textureScaling
     * and height is scaled by heightScaling.
     * 
     * @param {*} textureNumber The texture number.
     * @param {*} textureScaling The scaling factor for the texture.
     * @param {*} heightScaling The height-specific scaling factor for the texture.
     */
    constructor(textureNumber, textureScaling, heightScaling=textureScaling){

        //constrain textureNumber to be inside the range of acceptable game-textures
        var textureNumberRange = new RangedInt(1, 61)
        textureNumberRange.set(textureNumber)

        //create a filepath with the constrained texture number
        var filepath = TEXTURE_FILEPATH_START + textureNumberRange.get() + TEXTURE_FILEPATH_END
        
        //create a new image with the filepath
        var image = new Image()
        image.src = filepath
        image.onload = function(){
            this.width = this.width * textureScaling
            this.height = this.height * heightScaling
        }
        this.image = image
    }

    /**
     * Draw this texture at the coordinates provided.
     * @param {*} x The x coordinate to draw this texture at.
     * @param {*} y The y coordinate to draw this texture at.
     */
    draw(x, y){
        ctx.drawImage(this.image, x, y, this.width, this.height)
    }
}