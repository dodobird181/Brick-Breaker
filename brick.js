import { BRICK_SCALING_HEIGHT, BRICK_SCALING_WIDTH } from "./constants.js"
import { GameObject } from "./game_object.js"
import { Health } from "./health.js"
import { Texture } from "./texture.js"
import { RangedInt } from "./utils/ranged_int.js"

// The range of acceptable brick texture numbers.
const TEXTURE_RANGE = [1, 20]

/**
 * A brick-breaker brick.
 */
export class Brick{

    /**
     * Creates a new GameBrick.
     * @param {*} x
     * @param {*} y
     * @param {*} num the brick texture number.
     */
    constructor(x, y, num){
        super(x, y)

        // Create the brick's texture.
        var textNum = new RangedInt(num, TEXTURE_RANGE[0], TEXTURE_RANGE[1])
        var texture = new Texture(textNum.get(), BRICK_SCALING_WIDTH, BRICK_SCALING_HEIGHT)

        // Give the brick 2 hitpoints.
        this.health = new Health(2)

        this.texture = texture
        this.textNum = textNum
    }

    update(){}

    draw(){
        this.texture.draw(this.x, this.y)
    }

    /**
     * Handles the behavior of the brick when a ball hits it.
     */
    _onBallHit(){

        // If the brick has full health, give it a "broken" texture.
        if (this.health.get() == 2){
            this.textNum.increment()
            this.texture = new Texture(this.textNum.get(), BRICK_SCALING_WIDTH, BRICK_SCALING_HEIGHT)
        }

        // Deincrement the brick's health
        setTimeout(() => {
            this.health.deincrement()
        }, 1)
    }

    /*
     * Changes the velocity of the parameterized ball in a way
     * that makes physical sense if the ball is colliding with
     * this brick.
     */
    bounceBallOffMe(ball){
        if (this.isCollidingWithBall(ball)){
            setTimeout(() => {
                this._onBallHit()
            }, 1)
            if (ball.y > this.y && ball.y < this.y + this.height()){//collision in dim y
                if (ball.x < this.x){//ball hit left side
                    ball.velx = Math.abs(ball.velx)*(-1)
                }
                else if (ball.x > this.x + this.width()){//ball hit right side
                    ball.velx = Math.abs(ball.velx)
                }
            }
            else if (ball.x > this.x && ball.x < this.x + this.width())//collision in dim x
            {
                if (ball.y < this.y){//ball hit top
                    ball.vely = Math.abs(ball.vely)*(-1)
                }
                else if (ball.y > this.y + this.height()){//ball hit bottom
                    ball.vely = Math.abs(ball.vely)
                }
            }
        }
    }

    /*
     * Return true if any overlap exists between the brick and
     * the parameterized ball.
     */
    isCollidingWithBall(ball){
        const r = ball.radius
        if (ball.x+r > this.x && ball.x-r < this.x + this.width()){
            if (ball.y+r > this.y && ball.y-r < this.y + this.height()){
                return true
            }
        }
        else{
            return false
        }
    }

    /**
     * Get for brick width.
     */
    width(){
        return this.texture.myImg.image.width
    }

    /**
     * Get for brick height.
     */
    height(){
        return this.texture.myImg.image.height
    }
}