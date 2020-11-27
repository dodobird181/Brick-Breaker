import { BrickTextureSource } from "./brick_texture_source.js"
import { BRICK_SCALING } from "./constants.js"
import { GameObject } from "./game_object.js"
import { Health } from "./health.js"
import { ctx } from "./main.js"

export class GameBrick extends GameObject{
    constructor(x, y, bts){
        super(x, y)
        var img = new Image()
        img.src = bts.src
        this.img = img
        this.src = bts
        this.health = new Health(2, () => {})
    }

    update(){
        this.imgWidth = this.img.width*BRICK_SCALING
        this.imgHeight = this.img.height*BRICK_SCALING
    }

    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.imgWidth, this.imgHeight)
    }

    onBallHit(){
        this.health.deincrement()
        if (this.health.isDead() == false){
            var img = new Image()
            var bts = new BrickTextureSource(this.src.srcNum+1)
            img.src = bts.src
            this.img = img
            this.src = bts
        }
    }

    /*
     * Changes the velocity of the parameterized ball in a way
     * that makes physical sense if the ball is colliding with
     * this brick.
     */
    bounceBallOffMe(ball){
        if (this.isCollidingWithBall(ball)){
            this.onBallHit()
            if (ball.y > this.y && ball.y < this.y + this.imgHeight){//collision in dim y
                if (ball.x < this.x){//ball hit left side
                    ball.velx = Math.abs(ball.velx)*(-1)
                }
                else if (ball.x > this.x + this.imgWidth){//ball hit right side
                    ball.velx = Math.abs(ball.velx)
                }
            }
            else if (ball.x > this.x && ball.x < this.x + this.imgWidth)//collision in dim x
            {
                if (ball.y < this.y){//ball hit top
                    ball.vely = Math.abs(ball.vely)*(-1)
                }
                else if (ball.y > this.y + this.imgHeight){//ball hit bottom
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
        if (ball.x+r > this.x && ball.x-r < this.x + this.imgWidth){
            if (ball.y+r > this.y && ball.y-r < this.y + this.imgHeight){
                return true
            }
        }
        else{
            return false
        }
    }
}