import { loadMap } from "./map.js";
import { setValuesInDOM } from "./timer.js";
 
let base = basename(window.location.pathname)

const routes = {
    '/index.html': '/pages/activity.html',
    '/': '/pages/activity.html',
    '/map': '/pages/map.html',
    '/time': '/pages/time.html'
}

window.addEventListener('click', (e) => {
    if(e.target.tagName === 'A') {
        handleRoute(e)
    }
    e.preventDefault()
}) 

const handleRoute = (e) => {
    const href = `${window.location.origin}${base}${e.target.pathname}`
    window.history.pushState({}, "", href)
    handleLocation(e.target.pathname)
}

const handleLocation = async (link = '/') => {
    let path = window.location.pathname
    const route = routes[link]
    const html = await fetch(`${base}${route}`).then((data) => data.text())
    document.querySelector('.main').innerHTML = html

    if(path.includes('/map')) {
        loadMap()
    }
    if(path.includes('/time')) {
        let values = JSON.parse(sessionStorage.getItem('timer'))
        setValuesInDOM(values.h, values.m, values.s)
    }
}

function basename(pathname) {
    if(pathname.length <= 1) {
        return ''
    }
    let arr = pathname.split('/')
    let base = arr.slice(0, arr.length - 1).join('')
    return `/${base}`
}

window.onpopstate = handleLocation;
window.route = handleRoute;

handleLocation();