const path = window.location.pathname
const notFoundTitle = document.querySelector('.not-found')

window.addEventListener('popstate', () => {
  if(path.includes('/map') || path.includes('/time')) {
    notFoundTitle.style.display = 'none'
  } else {
    notFoundTitle.style.display = 'block'
  }
})