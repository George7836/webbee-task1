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
  const hours = formatValue(Math.floor((curr % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
  const minutes = formatValue(Math.floor((curr % (1000 * 60 * 60)) / (1000 * 60)))
  const seconds = formatValue(Math.floor((curr % (1000 * 60)) / 1000))

  if(window.location.pathname.includes('/time')) {
    document.querySelector('.timer').innerText = `${hours}:${minutes}:${seconds}`
  }
}

const isVisible = () => {
  if(document.visibilityState === 'hidden') {
    clearInterval(interv)
  } else if(document.visibilityState === 'visible') {
    startTimer()
  }
}

function formatValue(value) {
  return value >= 10 ? value : '0' + value
}

window.addEventListener('visibilitychange', isVisible)