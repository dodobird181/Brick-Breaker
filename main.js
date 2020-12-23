import {CANVAS_WIDTH, CANVAS_HEIGHT, BRICK_SCALING, KEY_A, KEY_LEFT, KEY_D, KEY_RIGHT, BALL_SPEED} from "./constants.js"
import { GameBrick } from "./game_brick.js"
import { GameBall } from "./game_ball.js"
import { Player } from "./player.js"

// Export Global Variables
export const canvas = document.querySelector('canvas')
export const ctx = canvas.getContext('2d')

// Set canvas dimensions
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

// Declare variables to be used in the game-loop
export var gameBricks = []
export var gameBalls = []
export var player = new Player()

// Animation game-loop function
function animate(){
    requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Loop through gameBricks
    gameBricks.forEach((brick, index) => {
        brick.update()
        brick.draw()
        if (brick.health.isDead()){
            setTimeout(() => {
                gameBricks.splice(index, 1)
            }, 0)
        }
    })

    // Loop through gameBalls
    gameBalls.forEach((ball, index) => {
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

//TODO replace this with a brick generation system...
function generateBricks(){

    const b = new GameBrick(0, 0, 1)
    b.gameTexture.image.onload = function(){
        const width = b.gameTexture.image.width
        const height = b.gameTexture.image.height
        for (var i = 0; i < 10; i++){
            for (var j = 0; j < 1; j++){
                gameBricks.push(new GameBrick(i*width*0.1, j*0.3, 1))
            }
        }
    }
    

    /*
    const brick = new GameBrick(0, 0, 1)
    brick.getImage().onload = function(){
        let offX = 0
        let offY = 100
        var textureNum = 0
        for(var i = 0; i < 5; i++){
            for (var j = 0; j < 5; j++){
                const width = brick.gameTexture.gameImage.width.get()
                const height = brick.gameTexture.gameImage.height.get()
                console.log("Width: " + width + ", height: " + height)
                gameBricks.push(
                    new GameBrick(
                    j*brick.getImage.width*BRICK_SCALING + offX, 
                    i*brick.getImage.height*BRICK_SCALING + offY, 
                    1 + 2*textureNum
                    )
                )
                textureNum += 1
            }
        }
    }*/
}

// Add event listeners
window.addEventListener("keydown", handleKeyDownEvent, false)
window.addEventListener("keyup", handleKeyUpEvent, false)

gameBalls.push(new GameBall(canvas.width, canvas.height, -BALL_SPEED, -BALL_SPEED, 4, "white"))
generateBricks()
animate()