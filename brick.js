import { RGBCol } from "./colors.js"
import { BRICK_WIDTH, BRICK_HEIGHT, PARTICLE_RADIUS, BALL_SPEED } from "./constants.js"
import { Health } from "./health.js"
import { balls, ctx, particles } from "./main.js"
import { Particle } from "./particle.js"
import { Rect } from "./rect.js"

export class Brick extends Rect{

    constructor(x, y, rgbCol){
        super(x, y, BRICK_WIDTH, BRICK_HEIGHT, rgbCol.toString())
        this.health = new Health(2)
        this.alpha = 1.0
        rgbCol.darken(120)
        this.borderColor = rgbCol.toString()
    }

    update(){

        // Collide with balls
        balls.forEach(ball => {
            if (this.colliding(ball)){
                this.bounceBallOffMe(ball)
            }
        })
    }

    draw(){

        ctx.globalAlpha = this.alpha

        // Draw brick
        super.draw()

        // Draw border outline
        ctx.strokeStyle = this.borderColor
        ctx.al
        ctx.lineWidth = 2
        ctx.strokeRect(this.x, this.y, this.width, this.height)

        ctx.globalAlpha = 1.0
    }

    /**
     * Handles the behavior of the brick when a ball hits it.
     */
    _onBallHit(ball){

        // If the brick has full health, give it a "broken" texture.
        if (this.health.get() == 2){
            this.alpha = 0.3
        }

        // Deincrement the brick's health
        setTimeout(() => {
            this.health.deincrement()
        }, 1)

        // Spawn particles
        for(var i = 0; i < 5; i++){
            particles.push(new Particle(
                ball.x, 
                ball.y, 
                PARTICLE_RADIUS * Math.random(),
                this.color,
                {
                    x: ball.velx / BALL_SPEED * Math.random(),
                    y: ball.vely / BALL_SPEED * Math.random()
                }
            ))
        }
    }

    /*
     * Changes the velocity of the parameterized ball in a way
     * that makes physical sense if the ball is colliding with
     * this brick.
     */
    bounceBallOffMe(ball){
        if (ball.y > this.y && ball.y < this.y + this.height){//collision in dim y
            if (ball.x < this.x){//ball hit left side
                ball.velx = Math.abs(ball.velx)*(-1)
                this._onBallHit(ball)
            }
            else if (ball.x > this.x + this.width){//ball hit right side
                ball.velx = Math.abs(ball.velx)
                this._onBallHit(ball)
            }
        }
        else if (ball.x > this.x && ball.x < this.x + this.width)//collision in dim x
        {
            if (ball.y < this.y){//ball hit top
                ball.vely = Math.abs(ball.vely)*(-1)
                this._onBallHit(ball)
            }
            else if (ball.y > this.y + this.height){//ball hit bottom
                ball.vely = Math.abs(ball.vely)
                this._onBallHit(ball)
            }
        }
    }
}