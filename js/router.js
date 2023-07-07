import { loadMap } from "./map.js";
import { startTimer } from "./timer.js";
 
let base = basename(window.location.pathname)
const routes = {
    '/index.html': '/pages/activity.html',
    '/': '/pages/activity.html',
    '/map': '/pages/map.html',
    '/time': '/pages/time.html'
}

window.addEventListener('click', (e) => {
    if(e.target.classList.contains('nav__link')) {
        handleRoute(e.target.pathname)
    }
    e.preventDefault()
}) 

export const handleRoute = (path) => {
    const href = `${window.location.origin}${base}${path}`
    window.history.pushState({}, "", href)
    handleLocation(path)
}

const handleLocation = async (link) => {
    let path = window.location.pathname
    const route = routes[link]
    const html = await fetch(`${base}${route}`).then((data) => data.text())
    document.querySelector('.main').innerHTML = html

    if(path.includes('/map')) {
        loadMap()
    }
    if(path.includes('/time')) {
        startTimer()
    }
}

export function basename(pathname) {
    if(pathname.length <= 1) {
        return ''
    }
    let arr = pathname.split('/')
    let base = arr.slice(0, arr.length - 1).join('')
    return `/${base}`
}

function getEndOfPathName(pathname) {
    return pathname.split('/').reverse()[0];
}

let page = getEndOfPathName(window.location.pathname)
handleLocation(`/${page}`);