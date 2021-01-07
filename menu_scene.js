import { Ball } from "./ball.js";
import { BALL_RADIUS, BALL_SPEED, CANVAS_HEIGHT, CANVAS_WIDTH, MENU_BACK_ALPHA, MENU_BRICK_RELOAD_RATIO, S_CLICK, S_MENU } from "./constants.js";
import { LevelLoader } from "./level_loader.js";
import { LevelSelectionScene } from "./level_selection_scene.js";
import { ctx, manager, findElement, hideElement, initilizeMenuButton, showElement} from "./main.js";
import { Player } from "./player.js";
import { Track, playSound } from "./sound.js";


export class MenuScene{
    constructor(){
        this.gameStarted = false
        this.music = new Track(S_MENU)
        this.menuElement = document.getElementById("menuElement")

        // Create startMenu event listener
        window.addEventListener("click", this.startMenu, false)

        // Hide unused HTML elements
        hideElement("levelSelectionElement")
        hideElement("gameMessageElement")
        hideElement("startupWhiteOverlayElement")
    }

    startMenu(event){
        if (!manager.scene.gameStarted){

            // Load bricks, balls, etc.
            manager.scene.loadBackgroundDisplay()

            // Play Sounds
            playSound(S_CLICK)
            manager.scene.music.play(0.05)
            manager.scene.gameStarted = true

            // Init Start button
            initilizeMenuButton(findElement("startButton"), () => {
                manager.scene.music.pause()
                manager.loadGameSceneAtLevel(1)
                hideElement("menuElement")
            })
            // Init Level Selection button
            initilizeMenuButton(findElement("levelSelectionButton"), () => {
                //Toggle appropriate HTML elements
                hideElement("menuElement")
                showElement("levelSelectionElement")
                // Initilize level-selection menu
                for(var i = 1; i < 16; i++){
                    const levelNum = i
                    initilizeMenuButton(document.getElementById("l" + levelNum + "Button"), () => {
                        manager.scene.music.pause()
                        manager.loadGameSceneAtLevel(levelNum)
                        hideElement("levelSelectionElement")
                    })
                }
            })
            // Init Credits button
            initilizeMenuButton(findElement("creditsButton"), () => {
                manager.loadScene(new CreditsScene())
            })
        }
    }

    /**
     * Creates and initilizes the required fields for a working
     * background display with bricks, balls, etc.
     */
    loadBackgroundDisplay(){
        this["balls"] = []
        this["bricks"] = []
        this["particles"] = []

        //Avoids typeErrors in Ball-player interactions, the player is NOT drawn.
        this["player"] = new Player()
        this.player.spawnBall = () => {}// Remove ability of player to spawn new balls. TODO: potentially remove this player snippet
        this.player.muted = true

        // Load bricks
        var levelLoader = new LevelLoader()
        levelLoader.onload = () => {
            manager.scene["reloadRatio"] = MENU_BRICK_RELOAD_RATIO * manager.scene.bricks.length
        }
        levelLoader.load("./levels/menu" + Math.floor((Math.random() * 3) + 1) + ".png")

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
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

        // Greyscale the menu if the canvas hasn't been clicked yet.
        if (this.gameStarted == false){
            ctx.fillStyle = "rgba(220, 220, 220, 0.5)"
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
            this.menuElement.style.opacity = "0.3"
        }
        
        // Otherwise show the HTML menu at full opacity and draw the background display
        else{
            this.menuElement.style.opacity = "1"
            // Reload the background display if there are not many bricks left
            if (manager.scene.bricks.length != 0){
                if (manager.scene.bricks.length < this.reloadRatio){
                    this.loadBackgroundDisplay()
                }
            }
            /**
             * Draws the rest of the background display.
             */
            ctx.globalAlpha = MENU_BACK_ALPHA
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
