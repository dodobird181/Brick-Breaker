import { CANVAS_HEIGHT } from "./constants.js";
import { ctx, canvas, particles, player } from "./main.js";
import { Particle } from "./particle.js";
import { Some } from "./utils/option.js";

/**
 * The Ball that the player uses to break bricks.
 */
export class Ball{
    constructor(x, y, velx, vely, radius, color){
        this.x = x
        this.y = y
        this.velx = velx
        this.vely = vely
        this.radius = radius
        this.color = color

        this.needsRemoval = false
    }

    update(){
        this.x += this.velx
        this.y += this.vely
        this.bounceOffWalls()
        
        // When a ball hits the ground
        if (this.y + this.radius >= CANVAS_HEIGHT){
            player.healthDisplay.deincrement()
            this.needsRemoval = true
            player.spawnBall()
        }
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
}