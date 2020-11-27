export class Health{

    constructor(amt, onDeath){
        this._amt = amt
        this.onDeath = onDeath
    }

    deincrement(){
        this._amt -= 1
        this.checkForDeath()
    }

    increment(){
        this._amt += 1
        this.checkForDeath()
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