/*
 * GameObject is an object in the game that
 * has, by virtue of being in the game, an x and
 * y position.
 */
export class GameObject{

    /**
     * Creates a GameObject.
     * @param {*} x The x position of this GameObject.
     * @param {*} y The y position of this GameObject.
     */
    constructor(x, y){
        this.x = x
        this.y = y
    }

    /**
     * Updates the logic of this GameObject. The update() function
     * should be called before draw().
     */
    update(){
        throw new Error("Method update() must be implemented in class " + this.constructor.name + "!")
    }

    /**
     * Draws this GameObject. The draw() function should be called
     * after update().
     */
    draw(){
        throw new Error("Method draw() must be implemented in class " + this.constructor.name + "!")
    }
}