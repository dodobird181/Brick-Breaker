import { BRICK_SCALING } from "./constants.js"
import { GameObject } from "./game_object.js"
import { GameTexture } from "./game_texture.js"
import { Health } from "./health.js"
import { ctx } from "./main.js"
import { RangedInt } from "./utils/ranged_int.js"

/**
 * GameBrick is a single brick-breaker brick.
 */
export class GameBrick extends GameObject{

    /**
     * Creates a new GameBrick.
     * @param {*} x The x coordinate of the brick.
     * @param {*} y The y coordinate of the brick.
     * @param {*} textureNumber The texture number for the brick to have.
     */
    constructor(x, y, textureNumber){
        super(x, y)

        // Constrain textureNumber between 1 and 20
        let rangedTextureNumber = new RangedInt(1, 20)
        rangedTextureNumber.set(textureNumber)
        this.rangedTextureNumber = rangedTextureNumber

        // Create a new GameTexture for the brick
        this.gameTexture = new GameTexture(rangedTextureNumber.get(), 0.1, BRICK_SCALING)

        // Give the brick 2 hitpoints
        this.health = new Health(2)
    }

    update(){}

    /**
     * Draws the GameBrick on-screen.
     */
    draw(){
        ctx.drawImage(this.gameTexture.image, this.x, this.y, this.width(), this.height())
    }

    /**
     * Handles the behavior of the brick when a ball hits it.
     */
    _onBallHit(){

        // If the brick has full health, give it a "broken" texture.
        if (this.health.get() == 2){
            var newRangedTextureNumber = new RangedInt(1, 20)
            newRangedTextureNumber.set(this.rangedTextureNumber.get() + 1)
            this.rangedTextureNumber = newRangedTextureNumber
            var newGameTexture = new GameTexture(this.rangedTextureNumber.get(), BRICK_SCALING)
            setTimeout(() => {
                this.gameTexture = newGameTexture
            }, 0)
        }

        // Deincrement the brick's health
        this.health.deincrement()
    }

    /*
     * Changes the velocity of the parameterized ball in a way
     * that makes physical sense if the ball is colliding with
     * this brick.
     */
    bounceBallOffMe(ball){
        if (this.isCollidingWithBall(ball)){
            console.log("go")
            this._onBallHit()
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
        return this.gameTexture.image.width
    }

    /**
     * Get for brick height.
     */
    height(){
        return this.gameTexture.image.height
    }
}