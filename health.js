
/**
 * Health is an integer value that models the
 * hitpoints of various game objects.
 * 
 * Health has default hooks for certain types of events
 * defined in the constructor that will automatically trigger.
 */
export class Health{

    constructor(amt){
        this._amt = amt
        this.onDeath = () => {}
        this.onIncrement = () => {}
        this.onDeincrement = () => {}
    }
    
    get(){
        return this._amt
    }

    set(amt){
        this._amt = amt
        this.checkForDeath()
    }

    deincrement(){
        this._amt -= 1
        this.onDeincrement()
        this.checkForDeath()
    }

    increment(){
        this._amt += 1
        this.onIncrement()
        this.checkForDeath()
    }

    checkForDeath(){
        if (this.isDead()){
            this.onDeath()
        }
    }

    isDead(){
        if (this._amt  <= 0){
            return true
        }
        return false
    }
}