import { MissingFieldError } from "./exceptions.js"

export class Track{
    constructor(trackSrc){
        this.trackSrc = trackSrc
        this.audio = null
    }

    /**
     * Plays the track.
     * @param {*} volume to play the Track at.
     * @param {*} loop the track, default == true.
     */
    play(volume=1, loop=true){
        if (this.audio == null){
            this.audio = playSound(this.trackSrc)
        }
        else{
            this.audio.play()
        }
        this.audio.volume = volume
        this.audio.loop = loop
    }

    pause(){
        if (this.audio != null){
            this.audio.pause()
        }
    }

    restart(){
        if (this.audio != null){
            this.audio.currentTime = 0
        }
    }
}

/**
 * Plays a sound.
 * @param {*} src the filepath of the sound.
 * @param {*} timeout the time to try and play again if
 * the sound couldn't be played for some reason.
 */
export function playSound(src, timeout=1){
    var sound  = new Audio()
    var docSource  = document.createElement("source")
    docSource.type = "audio/wav"
    docSource.src  = src
    sound.appendChild(docSource)
    try{
        sound.play()
    }
    catch(err){
        console.log("Could not play sound: " + src + ", trying again in " + timeout + "ms.")
        setTimeout(() => {
            playSound(src, timeout * 2)
        }, timeout)
    }
    return sound
}

/**
 * Plays the sound, or optionally does not
 * play the sound if the
 * @param {*} mutableCaller The mutable object that is playing the sound. 
 * @param {*} sound The sound to be played.
 */
export function playSoundOrMute(mutableCaller, sound){
    if (mutableCaller.muted == undefined){
        throw new MissingFieldError(mutableCaller.constructor.name, "muted")
    }
    else if (!mutableCaller.muted){
        playSound(sound)
    }
}