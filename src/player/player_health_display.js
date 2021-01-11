import { CANVAS_HEIGHT, HEART_IMAGE_SRC, HEART_SELF_PADDING, HEART_SIZE, HEART_WALL_PADDING } from "../constants.js"
import { Health } from "../health.js"
import { ctx, manager } from "../main.js"

export class PlayerHealthDisplay{
    constructor(){
        this.heartImg = new Image()
        this.heartImg.src = HEART_IMAGE_SRC
        this.health = new Health(3)
    }

    draw(){
        var health = this.health.get()
        for(var i = 0; i < health; i++){
            ctx.drawImage(
                this.heartImg, i * (HEART_SIZE + HEART_SELF_PADDING) + HEART_WALL_PADDING,
                CANVAS_HEIGHT - HEART_SIZE - HEART_WALL_PADDING, 
                HEART_SIZE, 
                HEART_SIZE
            )
        }
    }

    deincrement(){
        this.health.deincrement()
        if (this.health.isDead()){
            manager.scene.player.onDeath()
        }
    }
}