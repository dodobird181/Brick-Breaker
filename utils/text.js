import { ctx } from "../main.js"

export class Text{
    constructor(x, y, message, size, color="black", font="Georgia"){
        this.font = size + "px " + font
        this.x = x
        this.y = y
        this.message = message
        this.color = color
    }

    draw(){
        ctx.font = this.font
        ctx.fillStyle = this.color
        ctx.fillText(this.message, this.x, this.y)
    }

    setBold(){
        this.font = "bold " + this.font
    }

    setItalic(){
        this.font = "italic " + this.font
    }
}

/**
 * Returns the width of the text that the canvas
 * would render if it was asked to execute 
 * fillText(textMessage) with ctx.font = textFont.
 * @param {*} textMessage
 * @param {*} textFont 
 */
export function getTextWidth(textMessage, textFont){
    ctx.font = textFont
    return ctx.measureText(textMessage)
}