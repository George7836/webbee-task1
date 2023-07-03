import { loadMap } from "./map.js";
import { setValuesInDOM } from "./timer.js";

const routes = {
    '/webbee-task1/index.html': '/pages/activity.html',
    '/webbee-task1/': '/pages/activity.html',
    '/webbee-task1/map': '/pages/map.html',
    '/webbee-task1/time': '/pages/time.html'
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

    if(window.location.pathname.includes('/map')) {
        loadMap()
    }
    if(window.location.pathname.includes('/time')) {
        let values = JSON.parse(sessionStorage.getItem('timer'))
        setValuesInDOM(values.h, values.m, values.s)
    }
}

window.onpopstate = handleLocation;
window.route = handleRoute;

handleLocation();