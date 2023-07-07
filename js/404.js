const path = window.location.pathname
const notFoundTitle = document.querySelector('.not-found')
const mainDiv = document.querySelector('.main')

function displayNotFound() {
  if(mainDiv.innerHTML = '') {
    notFoundTitle.style.display = 'block'
  } else {
    notFoundTitle.style.display = 'none'
  }
}

const checkPage = () => {
  displayNotFound()
  let oldPathname = document.location.pathname
  const body = document.querySelector("body")
  const observer = new MutationObserver(function() {
      if(oldPathname !== document.location.pathname) {
          oldPathname = document.location.pathname
          displayNotFound()
      }
  })
  observer.observe(body, { childList: true, subtree: true })
}

checkPage()