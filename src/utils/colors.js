import { RangedInt } from "./ranged_int.js"

export class RGBCol{
    constructor(r, g, b, a=1.0){
        this.r = new RangedInt(r, 0, 255)
        this.g = new RangedInt(g, 0, 255)
        this.b = new RangedInt(b, 0, 255)
        this.a = a
    }

    toString(){
        return "rgb(" + this.r.get() + ", " + this.g.get() + ", " + this.b.get() + ", " + this.a +")"
    }

    darken(amt){
        this.r.set(this.r.get() - amt)
        this.g.set(this.g.get() - amt)
        this.b.set(this.b.get() - amt)
    }

    lighten(amt){
        this.darken(-amt)
    }
}