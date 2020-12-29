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
        console.log("go")
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