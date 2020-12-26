import { Ball } from "./ball.js"
import { Brick } from "./brick.js"
import { RGBCol } from "./colors.js"
import { BALL_SPEED, BRICK_HEIGHT, BRICK_WIDTH, CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js"
import { Player } from "./player.js"
import { RangedInt } from "./utils/ranged_int.js"


// Export Global Variables
export const canvas = document.querySelector('canvas')
export const ctx = canvas.getContext('2d')

// Set canvas dimensions
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

// Declare variables to be used in the game-loop
export var bricks = []
export var balls = []
export var player = new Player()

// Animation game-loop function
function animate() {

    requestAnimationFrame(animate)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Loop through gameBricks
    bricks.forEach((brick, index) => {
        brick.draw()
        brick.update()
        if (brick.health.isDead()){
            setTimeout(() => {
                bricks.splice(index, 1)
            }, 0)
        }
    })

    // Loop through gameBalls
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

balls.push(new Ball(canvas.width, canvas.height, BALL_SPEED, BALL_SPEED, 5, "grey"))

for(var i = 0; i < 10; i++){
    bricks.push(new Brick(i * BRICK_WIDTH + BRICK_WIDTH,  BRICK_HEIGHT*2, new RGBCol(255, 0, 0)))
}
for(var i = 0; i < 8; i++){
    bricks.push(new Brick(i * BRICK_WIDTH + BRICK_WIDTH*2,  BRICK_HEIGHT*3, new RGBCol(0, 255, 0)))
}
for(var i = 0; i < 6; i++){
    bricks.push(new Brick(i * BRICK_WIDTH + BRICK_WIDTH*3,  BRICK_HEIGHT*4, new RGBCol(0, 0, 255)))
}

animate()