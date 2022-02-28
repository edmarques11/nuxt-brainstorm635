class Clock {
    constructor(roundsTime = '05:00', hourOfStartRound) {
        let [minutes, seconds] = roundsTime.split(':')
        minutes = Number(minutes)
        seconds = Number(seconds)

        hourOfStartRound = hourOfStartRound || new Date()
        const currentTime = new Date()

        const timeSecondsDifference = Math.trunc((currentTime - hourOfStartRound) / 1000)

        const timeSeconds = (minutes * 60 + seconds) -
            (timeSecondsDifference > 0 ? timeSecondsDifference : 0)

        this.__timeSeconds = timeSeconds
        this.__time = roundsTime
        this.__interval = () => { }
        this.__timeCleaned = false
    }

    __decrementTime() {
        const oneSecond = 1000

        let minutes = Math.trunc(this.__timeSeconds / 60)
        let seconds = this.__timeSeconds - (minutes * 60)

        this.__interval = setInterval(() => {
            if (seconds == 0 && minutes > 0) {
                minutes--
                seconds = 59
            } else if (seconds > 0) {
                seconds--
            } else {
                this.stopTimer()
            }

            this.__time =
                (minutes < 10 ? '0' + minutes : minutes) +
                ' : ' +
                (seconds < 10 ? '0' + seconds : seconds)
        }, oneSecond);
    }

    getTime() {
        return this.__time
    }

    startTimer() {
        this.__decrementTime()
    }

    stopTimer() {
        this.__timeCleaned = true
        clearInterval(this.__interval)
    }

    timeEncerred() {
        return this.__timeCleaned
    }
}

export default function (context, inject) {
    inject('clock', Clock)
}
