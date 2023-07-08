import { loadMap } from "./map.js";
import { startTimer } from "./timer.js";
const navLinks = document.querySelectorAll('.nav__link')

for(let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', (e) => {
        e.preventDefault()
        handleRoute(e.target.pathname)
    })
}

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
    const route = routes[link]
    const html = await fetch(`${base}${route}`)
        .then((data) => {
            if (!data.ok) {
                throw new Error('Error occurred!')
            }
            return data.text()
        })
        .catch(() => '<h2 class="not-found">404. Not Found</h2>')
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