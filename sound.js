



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

export function playSound(src){
    var sound  = new Audio()
    var docSource  = document.createElement("source")
    docSource.type = "audio/wav"
    docSource.src  = src
    sound.appendChild(docSource)
    sound.play()
    return sound
}