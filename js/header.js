import { addListenersToLinks, getBasePath } from './router.js'
const root = document.getElementById('root')

async function getHeader() {
  const base = getBasePath(window.location.pathname)
  const data = await fetch(`${base}/pages/header.html`)
    .then((data) => data.text()
    .catch((err) => console.error(err)))
  root.insertAdjacentHTML('afterbegin', data)
  addListenersToLinks()
}

getHeader()