import {Ball} from "./ball.js"

export const canvas = document.querySelector('canvas')
canvas.width = 384
canvas.height = 448
export const ctx = canvas.getContext('2d')

let animationID

let ball = new Ball(100, 100, 50, 'green', {x: 3, y: 3})

function gameLoop(){
    animationID = requestAnimationFrame(gameLoop)
    ctx.fillStyle = '#034f84'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ball.update()
}

gameLoop()