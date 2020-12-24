import { None, Some } from "./option.js"

/**
 * An integer that is only defined inside a certain
 * range of integers. For example: [5, 26], inclusive.
 */
export class RangedInt{

    /**
     * Creates a ranged integer.
     * @param {*} low The lowest value the integer can take (inclusive).
     * @param {*} hi The highest value the integer can take (inclusive).
     */
    constructor(low, hi){
        this._low = low
        this._hi = hi
        this._val = new None()
    }

    /**
     * Gets the value of this ranged int, unless there is no
     * value. In which case we throw an error.
     */
    get(){
        var m = "Error: Cannot access value of RangedInt before it has been initilized!"
        return this._val.orElseThrow(m)
    }

    /**
     * Sets the value of this ranged int. The value given will 
     * be mapped inside the range if it is not already.
     * @param {*} val The value to map onto the RangedInt.
     */
    set(val){
        this._val = this._getValInRange(val)
    }

    /**
     * Increment the ranged int (will NEVER go past the max value!).
     */
    incr(){
        this._val = this._getValInRange(this._val + 1)
    }

    /**
     * Deincrement the ranged int (will NEVER go past the min value!).
     */
    decr(){
        this._val = this._getValInRange(this._val - 1)
    }

    /**
     * Returns an integer value in the range of [low, hi].
     * @param {*} val The value to inclusively map inside [low, hi].
     */
    _getValInRange(val){
        if (val > this._hi){
            return new Some(this._hi)
        }
        else if (val < this.low){
            return new Some(this._low)
        }
        return new Some(val)
    }
}

export class SomeRangedInt extends RangedInt {
    constructor(val, low, hi) {
        super(low, hi)
        this.set(val)
    }
}