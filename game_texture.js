import { TEXTURE_FILEPATH_END, TEXTURE_FILEPATH_START } from "./constants.js";
import { RangedInt } from "./utils/ranged_int.js";

/**
 * GameTexture is a wrapped GameImage featuring brick-breaker-specific
 * texture-like properties.
 */
export class GameTexture{

    /**
     * Creates a new GameTexture.
     * @param {*} textureNumber The texture number.
     * @param {*} textureScaling The scaling factor for the texture.
     * Specifies both width and height unless a heightScaling is specified.
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
}