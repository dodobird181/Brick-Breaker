import { CANVAS_HEIGHT, CANVAS_WIDTH, SECONDS_PER_LEVEL, TIMER_DISPLAY_PADDING, TIMER_FONT, TIMER_FONT_SIZE } from "../constants.js";
import { manager } from "../main.js";
import { getTextWidth, Text } from "../utils/text.js";
import { Timer } from "../utils/timer.js";

/**
 * PlayerTimerDisplay is the in-game text that displays
 * how much time a player has left to beat a level.
 */
export class PlayerTimerDisplay{
    constructor(){

        // Generate initial timer text
        this.secondsLeft = SECONDS_PER_LEVEL
        this.message = "Time Left: " + this.secondsLeft
        this.genText()

        // Setup timer
        this.timer = new Timer(() => {
            this.secondsLeft -= 1
            this.genText()
            if (this.secondsLeft <= 0){
                this.timer.stop()
                manager.scene.player.onDeath()
            }
        })
    }

    /**
     * Creates a new Text object to be displayed.
     */
    genText(){
        var width = getTextWidth(this.message, TIMER_FONT_SIZE + "px " + TIMER_FONT).width
        this.text = new Text(
            CANVAS_WIDTH - width - TIMER_DISPLAY_PADDING,
            CANVAS_HEIGHT - TIMER_FONT_SIZE / 2 - TIMER_DISPLAY_PADDING,
            "Time Left: " + this.secondsLeft,
            15,
            "white",
            TIMER_FONT
        )
    }

    draw(){
        this.text.draw()
    }
}