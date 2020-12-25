import { Ball } from "./ball.js"
import { BALL_SPEED, CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js"
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
export var player = new Player()

// Animation game-loop function
function animate() {

    requestAnimationFrame(animate)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Loop through gameBricks
    bricks.forEach((brick, index) => {
        brick.draw()
        if (brick.health.isDead()){
            setTimeout(() => {
                gameBricks.splice(index, 1)
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

//TODO replace this with a brick generation system...
function generateBricks(){

    const brick = new Brick(0, 0, 1)
    brick.texture.myImg.image.onload = function() {
        var w = this.width * BRICK_SCALING_WIDTH
        var h = this.height * BRICK_SCALING_HEIGHT
        console.log(this.width)
        console.log(this.height)
        for(var i = 0; i < 16; i++){
            gameBricks.push(
                new Brick(i * w, 0, 3)
            )
        }
        for(var i = 0; i < 16; i++){
            gameBricks.push(
                new Brick(i * w, h, 5)
            )
        }
    }

    var brick2 = new Brick(100, 100, 1)
    gameBricks.push(brick2)

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

bricks.push()

// Add event listeners
window.addEventListener("keydown", handleKeyDownEvent, false)
window.addEventListener("keyup", handleKeyUpEvent, false)

balls.push(new Ball(canvas.width, canvas.height, -BALL_SPEED, -BALL_SPEED, 4, "grey"))
//generateBricks()
animate()