import { BRICK_WIDTH, BRICK_HEIGHT, PARTICLE_RADIUS, BALL_SPEED, PARTICLES_PER_BRICK, BRICK_BORDER_WIDTH, S_BRICK } from "./constants.js"
import { Health } from "./health.js"
import { ctx, manager } from "./main.js"
import { Particle } from "./particle.js"
import { Rect } from "./rect.js"
import { playSoundOrMute } from "./utils/sound.js"

export class Brick extends Rect{
    constructor(x, y, rgbCol){
        super(x, y, BRICK_WIDTH, BRICK_HEIGHT, rgbCol.toString())
        this.health = new Health(1)
        rgbCol.darken(120)
        this.borderColor = rgbCol.toString()
        this.muted = false
    }

    update(){
        // Collide with balls
        manager.scene.balls.forEach(ball => {
            if (this.colliding(ball) && this.health.isDead() == false){
                this.health.deincrement()
                this.bounceBallOffMe(ball)
                this._spawnParticles(ball)
                playSoundOrMute(ball, S_BRICK)
            }
        })
        if (this.health.isDead()){
            manager.scene.deadBricks.push(this)
        }
    }

    draw(){
        // Draw brick
        super.draw()
        // Draw border outline
        ctx.strokeStyle = this.borderColor
        ctx.lineWidth = BRICK_BORDER_WIDTH
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }

    /**
     * Spawns particles the color of this brick at the position of "ball".
     */
    _spawnParticles(ball){
        for(var i = 0; i < PARTICLES_PER_BRICK; i++){
            manager.scene.particles.push(new Particle(
                ball.x, 
                ball.y, 
                PARTICLE_RADIUS * Math.random(),
                this.color,
                {
                    x: ((ball.velx / BALL_SPEED) * Math.random()) + Math.random() - 0.5,
                    y: ((ball.vely / BALL_SPEED) * Math.random()) + Math.random() - 0.5
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
            }
            else if (ball.x > this.x + this.width){//ball hit right side
                ball.velx = Math.abs(ball.velx)
            }
        }
        else if (ball.x > this.x && ball.x < this.x + this.width)//collision in dim x
        {
            if (ball.y < this.y){//ball hit top
                ball.vely = Math.abs(ball.vely)*(-1)
            }
            else if (ball.y > this.y + this.height){//ball hit bottom
                ball.vely = Math.abs(ball.vely)
            }
        }
    }
}