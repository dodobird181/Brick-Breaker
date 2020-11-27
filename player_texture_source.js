import { BrickTextureSource } from "./brick_texture_source.js"
import { BRICK_COURCE_FILEPATH_END, BRICK_SOURCE_FILEPATH_START } from "./constants.js"

export class PlayerTextureSource extends BrickTextureSource{
    constructor(srcNum){
        super(srcNum)
        // Override srcNum mod from superclass
        this.srcNum = (srcNum)
        this.src = this.getSrc(this.srcNum)
    }
}