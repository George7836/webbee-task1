import { loadMap } from "./map.js";
import { startTimer } from "./timer.js";

export function addListenersToLinks() {
    const navLinks = document.querySelectorAll('.nav__link')
    for(let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', (e) => {
            handleRoute(e.target.pathname)
            e.preventDefault()
        })
    }
}
addListenersToLinks()

let base = getBasePath(window.location.pathname)
const routes = {
    '/index.html': '/pages/activity.html',
    '/': '/pages/activity.html',
    '/map': '/pages/map.html',
    '/time': '/pages/time.html'
}

export const handleRoute = (path) => {
    const href = `${window.location.origin}${base}${path}`
    window.history.pushState({}, "", href)
    handleLocation(path)
}

const handleLocation = async (link) => {
    let path = window.location.pathname
    const route = routes[link] || '/pages/not-found.html'
    const html = await fetch(`${base}${route}`)
        .then((data) => data.text())
    document.querySelector('.main').innerHTML = html

    if(path.includes('/map')) {
        loadMap()
    }
    if(path.includes('/time')) {
        startTimer()
    }
}

export function getBasePath(pathname) {
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

handleLocation(`/${getEndOfPathName(window.location.pathname)}`)