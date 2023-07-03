import { loadMap } from "./map.js";
import { setValuesInDOM } from "./timer.js";

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
    window.history.pushState({}, "", e.target.href)
    handleLocation()
}

const handleLocation = async () => {
    const path = window.location.pathname
    const route = routes[path]
    const html = await fetch(route).then((data) => data.text())
    document.querySelector('.main').innerHTML = html

    if(window.location.pathname === '/map') {
        loadMap()
    }
    if(window.location.pathname === '/time') {
        let values = JSON.parse(sessionStorage.getItem('timer'))
        setValuesInDOM(values.h, values.m, values.s)
    }
}

window.onpopstate = handleLocation;
window.route = handleRoute;

handleLocation();