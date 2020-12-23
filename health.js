


export class Health{

    constructor(amt){
        this._amt = amt
        this.onDeath = () => {}
        this.onIncrement = () => {}
        this.onDeincrement = () => {}
    }

    deincrement(){
        this._amt -= 1
        this.checkForDeath()
        this.onDeincrement()
    }

    increment(){
        this._amt += 1
        this.checkForDeath()
        this.onIncrement()
    }

    get(){
        return this._amt
        this.checkForDeath()
    }

    set(amt){
        this._amt = amt
        this.checkForDeath()
    }

    checkForDeath(){
        if (this._amt  <= 0){
            this.onDeath()
        }
    }

    isDead(){
        if (this._amt  <= 0){
            return true
        }
        else{
            return false
        }
    }
}