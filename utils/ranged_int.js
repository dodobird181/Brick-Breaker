/**
 * An integer that is only defined inclusively
 * inside a certain range.
 */
export class RangedInt{
    constructor(val, low, hi){
        this._low = low
        this._hi = hi
        this._val = this._getValInRange(val)
    }

    get(){
        return this._val
    }

    set(val){
        this._val = this._getValInRange(val)
    }

    increment(){
        this.set(this.get() + 1)
    }

    decrement(){
        this.set(this.get() + 1)
    }

    _getValInRange(val){
        if (val > this._hi){
            return this._hi
        }
        else if (val < this._low){
            return this._low
        }
        else{
            return val
        }
    }
}