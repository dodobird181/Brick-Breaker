
/**
 * Option represents an optional piece of data.
 */
class Option {
    
    /**
     * Constructor for Option.
     * @param {*} data The data to store inside this Option.
     */
    constructor(data){
        this._data = data
    }

    /**
     * Put some data inside this Option.
     * @param {*} data The data to be put inside this Option.
     */
    put(data){
        this._data = data
    }

    /**
     * Returns the data without checking to see if
     * it is present.
     */
    get(){
        return this._data
    }

    /**
     * Returns the optional data if present,
     * otherwise returns the alternative.
     */
    orElse(alternative){
        if (this._dataNullable(this._data)){
            return alternative
        }
        return this._data
    }

    /**
     * Returns the optiomal data is present,
     * otherwise throws an error.
     * @param {*} errorMessage 
     */
    orElseThrow(errorMessage){
        if (this._dataNullable(this._data)){
            throw errorMessage
        }
        return this._data
    }

    /**
     * Returns true if some non-nullable data is
     * stored inside this option.
     */
    isPresent(){
        return !this.isEmpty()
    }

    /**
     * Returns true if the data stored inside this option
     * is nullable.
     */
    isEmpty(){
        return this._dataNullable(this._data)
    }

    /**
     * Return true if data is a null type. 
     */
    _dataNullable(data){
        if (data == undefined || data == NaN || data == null){
            return true
        }
        return false
    }
}

/**
 * Some is a constructor for Option that takes in some data.
 */
export class Some extends Option{
    constructor(data){
        super(data)
    }
}

/**
 * None is a constructor for Option which initilizes its data to null.
 */
export class None extends Option{
    constructor(){
        super(null)
    }
}