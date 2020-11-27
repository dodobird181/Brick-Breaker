import { BrickTextureSource } from "./brick_texture_source.js"
import { CANVAS_HEIGHT, CANVAS_WIDTH, KEY_A, KEY_D, KEY_LEFT, KEY_RIGHT, PLAYER_SCALING, PLAYER_SPEED, PLAYER_START_HEIGHT } from "./constants.js"
import { GameBrick } from "./game_brick.js"
import { ctx } from "./main.js"
import { MovingGameObject } from "./moving_game_object.js"
import { PlayerTextureSource } from "./player_texture_source.js"

export class Player extends GameBrick
{
	constructor(){
		super(CANVAS_WIDTH/2, PLAYER_START_HEIGHT, new PlayerTextureSource(56))
		this.pos = new MovingGameObject(CANVAS_WIDTH/2, CANVAS_HEIGHT - PLAYER_START_HEIGHT, 0, 0)
		this.rightKeyDown = false
		this.leftKeyDown = false
	}

	update(){
        this.imgWidth = this.img.width*PLAYER_SCALING
		this.imgHeight = this.img.height*PLAYER_SCALING
		this.pos.update()

		// Update superclass pos from movingobject pos
		// so that superclass collision detection functions
		this.x = this.pos.x
		this.y = this.pos.y
	}
	
	draw(){
		ctx.drawImage(this.img, this.pos.x, this.pos.y, this.imgWidth, this.imgHeight)
	}

	onBallHit(){
		
	}

	handleKeyDownEvent(event){
		const key = event.keyCode
		if (this.isLeftKey(key)){
			this.leftKeyDown = true
		}
		else if(this.isRightKey(key)){
			this.rightKeyDown = true
		}
		this.updateVelocity()
	}

	handleKeyUpEvent(event){
		const key = event.keyCode
		if (this.isLeftKey(key)){
			this.leftKeyDown = false
		}
		else if(this.isRightKey(key)){
			this.rightKeyDown = false
		}
		this.updateVelocity()
	}

	isLeftKey(key){
		if (key == KEY_A || key == KEY_LEFT){
			return true
		}
		else{
			return false
		}
	}

	isRightKey(key){
		if (key == KEY_D || key == KEY_RIGHT){
			return true
		}
		else{
			return false
		}
	}

	updateVelocity(){
		if (this.leftKeyDown && !this.rightKeyDown){
			this.pos.velx = -PLAYER_SPEED
		}
		else if(this.rightKeyDown && !this.leftKeyDown){
			this.pos.velx = PLAYER_SPEED
		}
		else if(!(this.leftKeyDown || this.rightKeyDown)){
			this.pos.velx = 0
		}
	}
}
