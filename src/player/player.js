import { Ball } from "../ball.js"
import { BALL_ANGLE_LIMITER, BALL_ANGLE_THRESHOLD_DIV, BALL_DIFF_THRESHOLD, BALL_RADIUS, BALL_SPEED, CANVAS_HEIGHT, CANVAS_WIDTH, KEY_A, KEY_D, KEY_LEFT, KEY_RIGHT, PLAYER_COLOR, PLAYER_HEIGHT, PLAYER_SPEED, PLAYER_START_HEIGHT, PLAYER_WIDTH, S_PLAYER } from "../constants.js"
import { findElement, hideElement, initilizeMenuButton, manager, showElement } from "../main.js"
import { MenuScene } from "../scenes/menu_scene.js"
import { PlayerHealthDisplay } from "./player_health_display.js"
import { PlayerTimerDisplay } from "./player_timer_display.js"
import { Rect } from "../rect.js"
import { playSound } from "../utils/sound.js"
import { None, Some } from "../utils/option.js"

/**
 * Player is the controllable platform that is used to deflect
 * balls towards the bricks.
 */
export class Player extends Rect{
	constructor(){
		super(
			(CANVAS_WIDTH / 2) - (PLAYER_WIDTH / 2) + 2,// +2 is to hide the multi-brick-destruction glitch from players (until I fix it :)
			CANVAS_HEIGHT - PLAYER_START_HEIGHT,
			PLAYER_WIDTH,
			PLAYER_HEIGHT,
			PLAYER_COLOR
		)

		this.muted = false

		// Declare key logging variables
		this.rightKeyDown = false
		this.leftKeyDown = false

		this.velx = 0
		this.vely = 0

		// Setup player's health
		this.healthDisplay = new PlayerHealthDisplay()
		this.playerTimerDisplay = new PlayerTimerDisplay()

		// Ball slot for stationary balls on the player's platform
		this.ballSlot = new None()

		this.spawnBall()
	}

	update(){

		this.healthDisplay.draw()
		this.playerTimerDisplay.draw()

		var centerX = this.x + PLAYER_WIDTH / 2
		var centerY = this.y + PLAYER_HEIGHT / 2

		// Handle ball collisions
		manager.scene.balls.forEach(ball => {
			if (this.colliding(ball)){
				// Create a (centered) difference threshold that needs to be overcome
				// for the ball to bounce off at an angle.
				var diffX = ball.x - centerX
				if (Math.abs(diffX) < BALL_DIFF_THRESHOLD){
					diffX = diffX / BALL_ANGLE_THRESHOLD_DIV
				}
				const diffY = ball.y - centerY
				var thetaTo = Math.atan2(diffY, diffX)
				// Limit the angle of sideways bounces
				if (thetaTo > -BALL_ANGLE_LIMITER){
					thetaTo = -BALL_ANGLE_LIMITER
				}
				else if (thetaTo < -Math.PI + BALL_ANGLE_LIMITER){
					thetaTo = -Math.PI + BALL_ANGLE_LIMITER
				}
				const bounceVelX = BALL_SPEED * Math.cos(thetaTo)
				const bounceVelY = BALL_SPEED * Math.sin(thetaTo)
				ball.velx = bounceVelX
				ball.vely = bounceVelY
				if (!this.muted){
					playSound(S_PLAYER)
				}
			}
		})

		// Stops player from moving if touching either side of the screen
		if ((this.x <= 0 && this.leftKeyDown) || (this.x + this.width >= CANVAS_WIDTH && this.rightKeyDown)){
			this.velx = 0
		}

		// Update position
		this.x += this.velx
		this.y += this.vely

		// Update ball slot's position
		if (this.ballSlot.isPresent()){
			var ball = this.ballSlot.get()
			ball.x += this.velx
			ball.y += this.vely
		}

		// Hook for triggering player win.
		if (manager.scene.bricks.length == 0){
			this.onWin()
		}
	}

	/**
	 * Triggers when the player dies
	 * (either by loss of life or timeout).
	 */
	onDeath(){
		manager.pause()
		showElement("levelDoneActionButton")//hidden when player wins on level 15
		findElement("gameMessageElementText").innerHTML = "Game over!"
		findElement("levelDoneActionButton").style.display = "inline-block"
		showElement("gameMessageElement")

		// Remove GameScene event listeners
		window.removeEventListener("keydown", manager.scene.handleKeyDownEvent)
		window.removeEventListener("keyup", manager.scene.handleKeyUpEvent)

		// Name buttons
		findElement("backButton").innerHTML = "Menu"
		findElement("levelDoneActionButton").innerHTML = "Retry?"

		// Init "Main Menu" button
		initilizeMenuButton(findElement("backButton"), () => {
			hideElement("gameMessageElement")
			manager.scene.music.pause()
			manager.loadScene(new MenuScene())
			showElement("menuElement")
			manager.resume()
		})

		// Init "Retry" button
		initilizeMenuButton(findElement("levelDoneActionButton"), () => {
			hideElement("gameMessageElement")
			manager.scene.music.pause()
			manager.loadGameSceneAtLevel(manager.lastLevelLoaded)
			manager.resume()
		})
	}

	/**
	 * Triggers when the player beats a level.
	 */
	onWin(){
		manager.pause()
		findElement("gameMessageElementText").innerHTML = "You win!"

		// Remove GameScene event listeners
		window.removeEventListener("keydown", manager.scene.handleKeyDownEvent)
		window.removeEventListener("keyup", manager.scene.handleKeyUpEvent)

		// Name buttons
		findElement("backButton").innerHTML = "Menu"
		findElement("levelDoneActionButton").innerHTML = "Next!"

		if (manager.lastLevelLoaded == 15){
			hideElement("levelDoneActionButton")
		}
		else{
			findElement("levelDoneActionButton").style.display = "inline-block"
		}

		// Init "Main Menu" button
		initilizeMenuButton(findElement("backButton"), () => {
			hideElement("gameMessageElement")
			manager.scene.music.pause()
			manager.loadScene(new MenuScene())
			showElement("menuElement")
			manager.resume()
		})

		// Init "Next level?" button
		initilizeMenuButton(findElement("levelDoneActionButton"), () => {
			hideElement("gameMessageElement")
			manager.scene.music.pause()
			manager.loadGameSceneAtLevel(manager.lastLevelLoaded + 1)
			manager.resume()
		})

		showElement("gameMessageElement")
	}

	/* 
	 * Spawns a stationary ball inside the player's ballSlot
	 * to be launched by the player.
	 */
	spawnBall(){
		const ball = new Ball(
			this.x + PLAYER_WIDTH / 2, 
			this.y - 10, 
			0, 
			0, 
			BALL_RADIUS, 
			"white"
		)
		this.ballSlot = new Some(ball)
		manager.scene.balls.push(ball)
	}

	/**
	 * Launches a ball from the Player's ballSlot
	 * (if one exists)
	 */
	launchBall(){
		const ball = this.ballSlot.get()
		ball.vely = BALL_SPEED
		ball.velx = 0
		this.ballSlot = new None()
	}

	handleKeyDownEvent(event){
		const key = event.keyCode
		if (this._isLeftKey(key)){
			this.leftKeyDown = true
		}
		else if(this._isRightKey(key)){
			this.rightKeyDown = true
		}

		// Launch the ball in the ballSlot
		else if(key == 32){
			if (this.ballSlot.isPresent()){
				this.launchBall()
			}
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
