import { Ball } from "./ball.js"
import { ctx } from "./main.js"
import { InvalidClassInstance } from "./utils/exceptions.js"

export class Rect {
    constructor (x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    /**
     * Returns true if colliding.
     * @param {*} object to check collision against.
     */
    colliding(object) {
        if (object instanceof Rect) {
            if (this.x <= object.width && object.x <= this.width){
                if (this.y <= object.height && object.y <= this.height){
                    return true
                }
            }
        }
        else if (object instanceof Ball) {
            const r = object.radius
            if (object.x + r > this.x && object.x - r < this.x + this.width){
                if (object.y + r > this.y && object.y - r < this.y + this.height){
                    return true
                }
            }
        }
        else {
            throw new InvalidClassInstance()
        }
        return false
    }
}