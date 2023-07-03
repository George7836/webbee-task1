let hours
let minutes
let seconds
let interval
let updatedS, updatedM, updatedH

function setTimer() {
  if(sessionStorage.getItem('timer') === null) {
    sessionStorage.setItem('timer', JSON.stringify({ h: 0, m: 0, s: 0 }))
  } 
  
  let values = JSON.parse(sessionStorage.getItem('timer'))

  updatedS = Number(values.s), 
  updatedM = Number(values.m), 
  updatedH = Number(values.h);
}

setTimer()

function startInterval() {
  clearInterval(interval)
  interval = setInterval(() => {
    run()
  }, 1000)
}

startInterval()

const run = () => {
  if(updatedM === 59){
    updatedH++;
    updatedM = 0;
  }
  if(updatedS === 59){
    updatedM++;
    updatedS = 0;
  } else {
    updatedS++;
  }

  sessionStorage.setItem('timer', JSON.stringify({h: updatedH, m: updatedM, s: updatedS}))
  
  if(window.location.pathname === '/time') {
    setValuesInDOM(updatedH, updatedM, updatedS)
  }
}

const stop = () => {
  clearInterval(interval)
}

export function setValuesInDOM(h, m, s) {
  hours = document.querySelector('.hours')
  minutes = document.querySelector('.minutes')
  seconds = document.querySelector('.seconds')

  hours.innerText = h >= 10 ? h : '0' + h
  minutes.innerText = m >= 10 ? m : '0' + m
  seconds.innerText = s >= 10 ? s : '0' + s
}

const isVisible = () => {
  if(document.visibilityState === 'hidden') {
    stop()
  } else if(document.visibilityState === 'visible') {
    startInterval()
  }
}

window.addEventListener('visibilitychange', isVisible)