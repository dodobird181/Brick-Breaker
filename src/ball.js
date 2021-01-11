import { CANVAS_HEIGHT, S_LOSE_LIFE, S_SIDE } from "./constants.js";
import { ctx, canvas, manager } from "./main.js";
import { playSoundOrMute } from "./utils/sound.js";

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
        this.muted = false
    }

    update(){
        this.x += this.velx
        this.y += this.vely
        this.bounceOffWalls()
        
        // When a ball hits the ground
        if (this.y + this.radius >= CANVAS_HEIGHT && this.needsRemoval == false){
            manager.scene.player.healthDisplay.deincrement()
            this.needsRemoval = true
            manager.scene.player.spawnBall()
            playSoundOrMute(this, S_LOSE_LIFE)
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
            playSoundOrMute(this, S_SIDE)
    	}
    	else if (this.x + this.radius > canvas.width){
            this.velx = Math.abs(this.velx)*(-1)
            playSoundOrMute(this, S_SIDE)
    	}
    	else if (this.y - this.radius < 0){
            this.vely = Math.abs(this.vely)
            playSoundOrMute(this, S_SIDE)
    	}
    	else if (this.y + this.radius > canvas.height){
            this.vely = Math.abs(this.vely)*(-1)
            playSoundOrMute(this, S_SIDE)
    	}
    }
}