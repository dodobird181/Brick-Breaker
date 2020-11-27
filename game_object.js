/*
 * A GameObject.
 */
export class GameObject{
    constructor(x, y){
        this.x = x
        this.y = y
    }
    draw(){
        throw new Error("Method draw() must be implemented in class " + this.constructor.name + "!")
    }
    update(){
        throw new Error("Method update() must be implemented in class " + this.constructor.name + "!")
    }
}