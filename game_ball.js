import { ctx, canvas, gameBricks } from "./main.js";
import { MovingGameObject } from "./moving_game_object.js";

export class GameBall extends MovingGameObject{
    constructor(x, y, velx, vely, radius, color){
        super(x, y, velx, vely)
        this.radius = radius
        this.color = color
    }

    update(){
        super.update()
        this.bounceOffWalls()
        this.bounceOffBricks()
    }

    draw(){
        ctx.beginPath()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    /*
     * Changes the velocity of this ball in a way that makes
     * physical sense if the ball is colliding with the perimiter
     * of the canvas.
     */
    bounceOffWalls(){
    	if (this.x - this.radius < 0){
            this.velx = Math.abs(this.velx)
    	}
    	else if (this.x + this.radius > canvas.width){
            this.velx = Math.abs(this.velx)*(-1)
    	}
    	else if (this.y - this.radius < 0){
            this.vely = Math.abs(this.vely)
    	}
    	else if (this.y + this.radius > canvas.height){
            this.vely = Math.abs(this.vely)*(-1)
    	}
    }

    /*
     * Calls the bounceBallOffMe function on this
     * ball for every GameBrick.
     */
    bounceOffBricks(){
        gameBricks.forEach((brick) => {
            brick.bounceBallOffMe(this)
        })
    }
}