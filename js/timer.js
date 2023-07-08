let hours
let minutes
let seconds
let time = {
  hours: 0,
  minutes: 0, 
  seconds: 0 
}
const start = Date.now()
let interv 

export function startTimer() {
  interv = setInterval(() => {
    if(document.querySelector('.page-container') === null) {
      clearInterval(interv)
    }
    const currentTime = Date.now() - start
    addTime(currentTime)
  }, 1000)
}

startTimer()

function addTime(curr) {
  time.hours = Math.floor((curr % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  time.minutes = Math.floor((curr % (1000 * 60 * 60)) / (1000 * 60))
  time.seconds = Math.floor((curr % (1000 * 60)) / 1000)
  if(window.location.pathname.includes('/time')) {
    setValuesInDOM(time.hours, time.minutes, time.seconds)
  }
}

const isVisible = () => {
  if(document.visibilityState === 'hidden') {
    clearInterval(interv)
  } else if(document.visibilityState === 'visible') {
    startTimer()
  }
}

function setValuesInDOM(h, m, s) {
  hours = document.querySelector('.hours')
  minutes = document.querySelector('.minutes')
  seconds = document.querySelector('.seconds')

  hours.innerText = h >= 10 ? h : '0' + h
  minutes.innerText = m >= 10 ? m : '0' + m
  seconds.innerText = s >= 10 ? s : '0' + s
}

window.addEventListener('visibilitychange', isVisible)