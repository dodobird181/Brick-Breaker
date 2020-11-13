import {canvas, ctx} from "./main.js"

export class Ball
{
    constructor(x, y, radius, color, velocity)
    {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw()
    {
        ctx.beginPath()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }

    update()
    {
    	this.collideWithWalls()
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }

    collideWithWalls()
    {
    	if (this.x - this.radius < 0){
    		this.velocity = {
    			x: Math.abs(this.velocity.x),
    			y: this.velocity.y
    		}
    	}
    	else if (this.x + this.radius > canvas.width){
    		this.velocity = {
    			x: Math.abs(this.velocity.x) * (-1),
    			y: this.velocity.y
    		}
    	}
    	else if (this.y - this.radius < 0){
    		this.velocity = {
    			x: this.velocity.x,
    			y: Math.abs(this.velocity.y)
    		}
    	}
    	else if (this.y + this.radius > canvas.height){
    		this.velocity = {
    			x: this.velocity.x,
    			y: Math.abs(this.velocity.y) * (-1)
    		}
    	}
    }

    //Returns true if colliding 
    isColliding()
    {
        //if collision with walls
        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width){
            return true
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height){
            return true
        }

        //if collision with a rectangle
        var coll = false
        rectangles.forEach((rect) => {
            if (rect.checkCollision(this) == true){
                coll = true
            }
        })
        return coll
    }
}