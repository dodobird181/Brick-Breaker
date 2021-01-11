import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants.js"
import { LevelLoader } from "../level_loader.js"
import { ctx, manager } from "../main.js"
import { Player } from "../player/player.js"
import { Track } from "../utils/sound.js"

/**
 * The main brick-breaker game.
 */
export class GameScene{
    constructor(levelSrc, srcNum=1){

        this.levelSrc = levelSrc
        this.loaded = false

        // Declare variables to be used in draw
        this.bricks = []
        this.balls = []
        this.particles = []

        // Play music
        var trackNum = (srcNum % 4) + 1
        this.music = new Track("./sounds/game" + trackNum + ".ogg")
        this.music.play(0.03)

        // Ghost drawPlayer function to be replaced when the real Player is loaded
        this.drawPlayer = () => {}

        // Stores dead brick objects to be removed before the next draw call
        this.deadBricks = []
    }

    /**
     * Initilizes game objects that depend on an instance of
     * the gameScene in their constructor.
     */
    postInit(){
        var lLoader = new LevelLoader()
        lLoader.onload = () => {
            // Create the player after the level has loaded
            manager.scene.player = new Player()
            // Add hooks for drawing the player after the level has loaded
            manager.scene.drawPlayer = () => {
                manager.scene.player.update()
                manager.scene.player.draw()
            }
        }
        lLoader.load(this.levelSrc)

        window.addEventListener("keydown", this.handleKeyDownEvent, false)
        window.addEventListener("keyup", this.handleKeyUpEvent, false)
    }
    handleKeyDownEvent(event){
        manager.scene.player.handleKeyDownEvent(event)
    }
    handleKeyUpEvent(event){
        manager.scene.player.handleKeyUpEvent(event)
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

        // Remove dead bricks before drawing
        this.deadBricks.forEach(deadBrick => {
            const i = this.bricks.indexOf(deadBrick)
            if(i >= 0){
                this.bricks.splice(i, 1)
            }
        })

        // Draw bricks
        this.bricks.forEach(brick => {
            brick.draw()
            brick.update()

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
        this.drawPlayer()
    }
}