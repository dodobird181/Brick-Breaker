import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js"
import { LevelLoader } from "./level_loader.js"
import { ctx } from "./main.js"
import { Player } from "./player.js"

/**
 * The main brick-breaker game.
 */
export class GameScene{
    constructor(levelSrc){

        this.levelSrc = levelSrc
        this.loaded = false

        // Declare variables to be used in draw
        this.bricks = []
        this.balls = []
        this.particles = []
    }

    /**
     * Initilizes game objects that depend on an instance of
     * the gameScene in their constructor.
     */
    postInit(){
        this.player = new Player()
        var lLoader = new LevelLoader()
        lLoader.load(this.levelSrc)
    }

    draw(){

        // Initial hook for loading GameScene-dependent objects
        if (this.loaded == false){
            this.loaded = true
            this.postInit()
        }

        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        // Draw particles
        this.particles.forEach((particle, index) => {
            particle.update()
            if (particle.alpha <= 0){
                this.particles.splice(index, 1)
            }
        })

        // Draw bricks
        this.bricks.forEach((brick, index) => {
            brick.draw()
            brick.update()
            if (brick.health.isDead()){
                setTimeout(() => {
                    this.bricks.splice(index, 1)
                }, 0)
            }
        })

        // Draw balls
        this.balls.forEach((ball, index) => {
            ball.update()
            ball.draw()
            if (ball.needsRemoval){
                setTimeout(() => {
                    this.balls.splice(index, 1)
                }, 0)
            }
        })

        this.player.update()
        this.player.draw()
    }
}