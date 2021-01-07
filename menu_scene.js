import { Ball } from "./ball.js";
import { BALL_RADIUS, BALL_SPEED, CANVAS_HEIGHT, CANVAS_WIDTH, S_CLICK, S_HOVER, S_LEVEL_WIN, S_MENU } from "./constants.js";
import { LevelLoader } from "./level_loader.js";
import { LevelSelectionScene } from "./level_selection_scene.js";
import { ctx, gameScene, hideElement, initilizeMenuButton, loadScene, menuScene, setGameScene } from "./main.js";
import { Player } from "./player.js";
import { Track, playSound } from "./sound.js";
import { getTextWidth, Text } from "./utils/text.js";


export class MenuScene{
    constructor(){

        this.gameStarted = false
        this.music = new Track(S_MENU)
        this.menuElement = document.getElementById("menuElement")

        // Create startMenu event
        window.addEventListener("click", this.startMenu, false)

        // Hide unused HTML elements
        hideElement("levelSelectionElement")
        hideElement("gameMessageElement")
        hideElement("startupWhiteOverlayElement")

        // Loads a new anonymouse implementation of "GameScene"
        // that displays some bricks and bounsing balls.
        setGameScene(newMenuGameScene())
    }

    draw(){
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        // Greyscale menu if the canvas hasn't been clicked yet.
        if (this.gameStarted == false){
            ctx.fillStyle = "rgba(220, 220, 220, 0.5)"
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
            this.menuElement.style.opacity = "0.3"
        }
        else{// Show the HTML menu at full opacity
            this.menuElement.style.opacity = "1"
            gameScene.draw()
        }

        // Reloads the menuGameScene if most of the bricks have been broken.
        if ()
    }

    /**
     * Starts the MenuScene.
     */
    startMenu(event){
        if (!menuScene.gameStarted){
            playSound(S_CLICK)
            menuScene.music.play(0.05)
            menuScene.gameStarted = true

            var startButton = document.getElementById("startButton")
            var levelSelectionButton = document.getElementById("levelSelectionButton")
            var creditsButton = document.getElementById("creditsButton")

            // Start
            initilizeMenuButton(startButton, () => {
                loadScene(gameScene)
                hideElement("menuElement")
            })

            // Level Selection
            initilizeMenuButton(levelSelectionButton, () => {
                loadScene(new LevelSelectionScene())
            })

            // Credits
            initilizeMenuButton(creditsButton, () => {
                loadScene(new CreditsScene())
            })
        }
    }
}

/**
 * Returns an anonymouse GameScene-esque class that
 * displays some balls bouncing around against bricks for the menu.
 */
function newMenuGameScene(){
    return new class P{
        constructor(){
            this.balls = []
            this.bricks = []
            this.particles = []
            this.bricksDestroyed = false

            //Avoids typeErrors in Ball-player interactions, the player is NOT drawn.
            this.player = new Player()
            this.player.spawnBall = () => {}// Remove ability of player to spawn new balls.
            this.player.muted = true

            // Load the level
            var levelLoader = new LevelLoader()
            levelLoader.load("./levels/menu.png")

            // Spawn some balls
            const NUM_BALLS = 3
            const SPEED_LIMITING_FACTOR = 0.75
            for(var i = 0; i < NUM_BALLS; i++){
                const THETA_RAND = Math.random() * Math.PI * 2
                const bounceVelX = BALL_SPEED * Math.cos(THETA_RAND) * SPEED_LIMITING_FACTOR
                const bounceVelY = BALL_SPEED * Math.sin(THETA_RAND) * SPEED_LIMITING_FACTOR
                var ball = new Ball(
                    CANVAS_WIDTH/2, CANVAS_HEIGHT/2,
                    bounceVelX, bounceVelY, 
                    BALL_RADIUS, "white"
                )
                ball.muted = true
                this.balls.push(ball)
            }
        }

        draw(){
            ctx.globalAlpha = 0.35

            // Draw bricks
            this.bricks.forEach((brick, index) => {
                brick.draw()
                brick.update()
                if (brick.health.isDead()){
                    setTimeout(() => {
                        this.bricks.splice(index, 1)
                    }, 0)
                }
            })

            // Draw balls
            this.balls.forEach((ball) => {
                ball.update()
                ball.draw()
            })

            // Draw particles
            this.particles.forEach((particle, index) => {
                particle.update()
                if (particle.alpha <= 0){
                    this.particles.splice(index, 1)
                }
            })
            ctx.globalAlpha = 1
        }
    }
}
