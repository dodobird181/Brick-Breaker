import { CANVAS_HEIGHT, CANVAS_WIDTH, KEY_A, KEY_D, KEY_LEFT, KEY_RIGHT, PLAYER_COLOR, PLAYER_HEIGHT, PLAYER_SPEED, PLAYER_START_HEIGHT, PLAYER_WIDTH } from "./constants.js"
import { balls } from "./main.js"
import { Rect } from "./rect.js"

/**
 * Player is the controllable platform that is used to deflect
 * balls towards the bricks.
 */
export class Player extends Rect{
	constructor(){
		super(
			CANVAS_WIDTH / 2,
			CANVAS_HEIGHT - PLAYER_START_HEIGHT,
			PLAYER_WIDTH,
			PLAYER_HEIGHT,
			PLAYER_COLOR
		)

		// Declare key logging variables
		this.rightKeyDown = false
		this.leftKeyDown = false

		this.velx = 0
		this.vely = 0
	}

	update(){

		// Handle ball collisions
		balls.forEach(ball => {
			console.log("We gotta ball!")
		})

		// Stops player from moving if touching either side of the screen
		if ((this.x <= 0 && this.leftKeyDown) || (this.x + this.width >= CANVAS_WIDTH && this.rightKeyDown)){
			this.velx = 0
		}

		// Update position
		this.x += this.velx
		this.y += this.vely
	}

	handleKeyDownEvent(event){
		const key = event.keyCode
		if (this._isLeftKey(key)){
			this.leftKeyDown = true
		}
		else if(this._isRightKey(key)){
			this.rightKeyDown = true
		}
		this.updateVelocity()
	}

	handleKeyUpEvent(event){
		const key = event.keyCode
		if (this._isLeftKey(key)){
			this.leftKeyDown = false
		}
		else if(this._isRightKey(key)){
			this.rightKeyDown = false
		}
		this.updateVelocity()
	}

	_isLeftKey(key){
		if (key == KEY_A || key == KEY_LEFT){
			return true
		}
		else{
			return false
		}
	}

	_isRightKey(key){
		if (key == KEY_D || key == KEY_RIGHT){
			return true
		}
		else{
			return false
		}
	}

	updateVelocity(){
		if (this.leftKeyDown && !this.rightKeyDown){
			this.velx = -PLAYER_SPEED
		}
		else if(this.rightKeyDown && !this.leftKeyDown){
			this.velx = PLAYER_SPEED
		}
		else if(!(this.leftKeyDown || this.rightKeyDown)){
			this.velx = 0
		}
	}
}
