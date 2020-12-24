import { ctx } from "./main.js"

export class MyImage {

    constructor (path, scaleWidth = 1, scaleHeight = 1) {

        var image = new Image()
        image.src = path
        image.onload = function() {
            this.width = this.width * scaleWidth
            this.height = this.height * scaleHeight
        }
        this.image = image
    }

    draw(x, y) {
        if (this.image.complete) {
            ctx.drawImage(this.image, x, y, this.image.width, this.image.height)
        }
    }

    scaleBy(scaleWidth, scaleHeight) {
        if (this.image.complete) {
            this.image.width *= scaleWidth
            this.image.height *= scaleHeight
        }
    }

    setSize(width, height) {
        if (this.image.complete) {
            this.image.width = width
            this.image.height = height
        }
    }
}