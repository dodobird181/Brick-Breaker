import { Ball } from "./ball.js"
import { BALL_SPEED, BRICK_BORDER_WIDTH, BRICK_HEIGHT, BRICK_WIDTH, CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js"
import { LevelLoader } from "./level_loader.js"
import { Player } from "./player.js"


// Export Global Variables
export const canvas = document.querySelector('canvas')
export const ctx = canvas.getContext('2d')

// Set canvas dimensions
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

// Declare variables to be used in the game-loop
export var bricks = []
export var balls = []
export var particles = []
export var player = new Player()

// Animation game-loop function
function animate() {

    requestAnimationFrame(animate)
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Loop through particles
    particles.forEach((particle, index) => {
        particle.update()
        if (particle.alpha <= 0){
            particles.splice(index, 1)
        }
    })

    // Loop through bricks
    bricks.forEach((brick, index) => {
        brick.draw()
        brick.update()
        if (brick.health.isDead()){
            setTimeout(() => {
                bricks.splice(index, 1)
            }, 0)
        }
    })

    // Loop through balls
    balls.forEach((ball) => {
        ball.update()
        ball.draw()
    })

    player.update()
    player.draw()
}

// Called whenever a key is pressed down
function handleKeyDownEvent(event){
    player.handleKeyDownEvent(event)
}

// Called whenever a key is released
function handleKeyUpEvent(event){
    player.handleKeyUpEvent(event)
}

// Add event listeners
window.addEventListener("keydown", handleKeyDownEvent, false)
window.addEventListener("keyup", handleKeyUpEvent, false)

balls.push(new Ball(canvas.width, canvas.height, BALL_SPEED, BALL_SPEED, 5, "white"))

animate()

var lLoader = new LevelLoader(bricks)
lLoader.load("./levels/2.png")