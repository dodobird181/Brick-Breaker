import { CANVAS_HEIGHT, HEART_IMAGE_SRC, HEART_SELF_PADDING, HEART_SIZE, HEART_WALL_PADDING } from "./constants.js"
import { ctx } from "./main.js"


/**
 * Health is an integer value that models the
 * hitpoints of various game objects.
 * 
 * Health has default hooks for certain types of events
 * defined in the constructor that will automatically trigger.
 */
export class Health{

    constructor(amt){
        this._amt = amt
        this.onDeath = () => {}
        this.onIncrement = () => {}
        this.onDeincrement = () => {}
    }
    
    get(){
        return this._amt
    }

    set(amt){
        this._amt = amt
        this.checkForDeath()
    }

    deincrement(){
        this._amt -= 1
        this.onDeincrement()
        this.checkForDeath()
    }

    increment(){
        this._amt += 1
        this.onIncrement()
        this.checkForDeath()
    }

    checkForDeath(){
        if (this._amt  <= 0){
            this.onDeath()
        }
    }

    isDead(){
        if (this._amt  <= 0){
            return true
        }
        else{
            return false
        }
    }
}

export class PlayerHealthDisplay{
    constructor(){
        this.heartImg = new Image()
        this.heartImg.src = HEART_IMAGE_SRC
        this.heartImg.onload = function(){

        }
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
    }
}