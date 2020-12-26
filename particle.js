import { FRICTION, PARTICLE_SPEED } from "./constants.js"
import { ctx } from "./main.js"

export class Particle{
	constructor(x, y, radius, color, velocity){
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.velocity = {x: velocity.x * PARTICLE_SPEED, y: velocity.y * PARTICLE_SPEED}
		this.alpha = 1.0
	}

	_draw(){
		ctx.save()
		ctx.globalAlpha = this.alpha
		ctx.beginPath()
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		ctx.fillStyle = this.color
		ctx.fill()
		ctx.restore()
	}

	update(){
		this._draw()
		this.x = this.x + this.velocity.x
		this.y = this.y + this.velocity.y
		this.alpha -= 0.02
		this.velocity.x *= FRICTION
		this.velocity.y *= FRICTION
	}
}