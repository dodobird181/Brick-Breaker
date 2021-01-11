import { Ball } from "../ball.js";
import { BALL_RADIUS, BALL_SPEED, CANVAS_HEIGHT, CANVAS_WIDTH, MENU_BACK_ALPHA, MENU_BRICK_RELOAD_RATIO, S_CLICK, S_LEVEL_WIN, S_MENU } from "../constants.js";
import { LevelLoader } from "../level_loader.js";
import { ctx, manager, findElement, hideElement, initilizeMenuButton, showElement} from "../main.js";
import { Track, playSound } from "../utils/sound.js";


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

        this.deadBricks = []
    }

    startMenu(event){
        if (!manager.scene.gameStarted){

            window.removeEventListener("click", manager.scene.startMenu)

            // Load bricks, balls, etc.
            manager.scene.loadBackgroundDisplay()

            // Play Sounds
            playSound(S_CLICK)
            manager.scene.music.play(0.03)
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
                        manager.scene = []
                        manager.loadGameSceneAtLevel(levelNum)
                        hideElement("levelSelectionElement")
                    })
                }
            })
            
            // Init Credits button
            initilizeMenuButton(findElement("creditsButton"), () => {
                hideElement("menuElement")
                showElement("creditsDisplay")

                // Init credits back button
                initilizeMenuButton(findElement("creditsBackButton"), () => {
                    hideElement("creditsDisplay")
                    showElement("menuElement")
                })
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

        // Add a "ghost" player to eliminate ball => player field (and function call) access errors.
        this["player"] = new class {
            constructor(){
                this.healthDisplay = new class {
                    deincrement(){}
                }
            }
            spawnBall(){}
        }

        // Load bricks
        var levelLoader = new LevelLoader()
        levelLoader.onload = () => {// Used to calculate the number of bricks needed to refresh the menu display
            manager.scene["reloadRatio"] = MENU_BRICK_RELOAD_RATIO * manager.scene.bricks.length
        }
        levelLoader.load("./levels/menu" + Math.floor((Math.random() * 4) + 1) + ".png")

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
                    playSound(S_LEVEL_WIN)
                    this.loadBackgroundDisplay()
                }
            }
            /**
             * Draws the rest of the background display.
             */
            ctx.globalAlpha = MENU_BACK_ALPHA

            // Draw particles
            this.particles.forEach((particle, index) => {
                particle.update()
                if (particle.alpha <= 0){
                    this.particles.splice(index, 1)
                }
            })

            // Remove dead bricks before drawing
            this.deadBricks.forEach(deadBrick => {
                const i = this.bricks.indexOf(deadBrick)
                if(i >= 0){
                    this.bricks.splice(i, 1)
                }
            })

            // Draw bricks
            this.bricks.forEach(brick => {
                brick.draw()
                brick.update()

            })

            // Draw balls
            this.balls.forEach((ball, index) => {
                ball.update()
                ball.draw()
                if (ball.needsRemoval){
                    setTimeout(() => {
                        this.balls.splice(index, 1)
                    }, 0)
                }
            })
            
            ctx.globalAlpha = 1
        }
    }
}
