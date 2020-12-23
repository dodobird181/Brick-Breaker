import { CANVAS_HEIGHT, CANVAS_WIDTH, KEY_A, KEY_D, KEY_LEFT, KEY_RIGHT, PLAYER_SCALING, PLAYER_SPEED, PLAYER_START_HEIGHT, PLAYER_TEXTURE_NUM } from "./constants.js"
import { GameBrick } from "./game_brick.js"
import { GameTexture } from "./game_texture.js"
import { ctx } from "./main.js"
import { MovingGameObject } from "./moving_game_object.js"

/**
 * Player is the controllable platform that is used to deflect
 * balls towards the bricks.
 */
export class Player extends GameBrick
{
	/**
	 * Creates a new Player.
	 */
	constructor(){
		super(CANVAS_WIDTH/2, CANVAS_HEIGHT - PLAYER_START_HEIGHT, PLAYER_TEXTURE_NUM)

		// Override the brick's gameTexture
		this.gameTexture = new GameTexture(PLAYER_TEXTURE_NUM, PLAYER_SCALING)

		// Declare key logging variables
		this.rightKeyDown = false
		this.leftKeyDown = false

		// Declare position
		this.pos = new MovingGameObject(this.x, this.y, 0, 0)
	}

	_onBallHit(){

	}

	/**
	 * Updates the position of this Player.
	 */
	update(){
		this.x += this.pos.velx
		this.y += this.pos.vely
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
