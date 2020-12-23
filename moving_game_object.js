import { GameObject } from "./game_object.js";

/**
 * MovingGameObject is a GameObject that has,
 * by virtue of having the potential to be in motion,
 * x and y velocities.
 */
export class MovingGameObject extends GameObject{

    /**
     * Creates a new MovingGameObject.
     * @param {*} x The x position of this GameObject.
     * @param {*} y The y position of this GameObject.
     * @param {*} velx The initial x veloticy of the GameObject.
     * @param {*} vely Te initial y velociy of the GameObject.
     */
    constructor(x, y, velx, vely){
        super(x, y)
        this.velx = velx
        this.vely = vely
    }

    /**
     * Updates the position of this MovingGameObject
     * based on its velocity. Functions that override
     * update() should call super.update().
     */
    update(){
        this.x += this.velx
        this.y += this.vely
    }
}