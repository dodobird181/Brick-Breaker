import { GameObject } from "./game_object.js";

export class MovingGameObject extends GameObject{
    constructor(x, y, velx, vely){
        super(x, y)
        this.velx = velx
        this.vely = vely
    }

    update(){
        this.x += this.velx
        this.y += this.vely
    }

    draw(){
        throw new Error("The method draw needs to be overriden in class " + this.constructor.name + "!")
    }
}