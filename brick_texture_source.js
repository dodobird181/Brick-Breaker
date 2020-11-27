import { BRICK_COURCE_FILEPATH_END, BRICK_SOURCE_FILEPATH_START } from "./constants.js"

export class BrickTextureSource{
    constructor(srcNum){
        this.srcNum = (srcNum % 20)
        this.src = this.getSrc(this.srcNum)
    }

    getSrc(srcNum){
        return BRICK_SOURCE_FILEPATH_START + srcNum + BRICK_COURCE_FILEPATH_END
    }
}