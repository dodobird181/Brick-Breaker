
/**
 * Timer is just "syntactic sugar" for Javascript's 
 * setInterval() function, with a reference to the
 * "interval variable" so the timer can stop itself.
 */
export class Timer{
    constructor(action, timeout = 1000){
        this.jsInterval = setInterval(action, timeout)
    }

    stop(){
        clearInterval(this.jsInterval)
    }
}