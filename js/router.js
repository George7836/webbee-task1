import { main } from "./map.js";
import { setValuesInDOM } from "./timer.js";

const routes = {
    '/index.html': '/pages/activity.html',
    '/': '/pages/activity.html',
    '/map': '/pages/map.html',
    '/time': '/pages/time.html'
}

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/index.html';

const router = async () => {
	const path = parseLocation();
	const route = routes[path]
	const html = await fetch(route).then((data) => data.text())
	document.querySelector('.main').innerHTML = html

    if(window.location.hash === '#/map') {
        main()
    }
    if(window.location.hash === '#/time') {
        let values = JSON.parse(sessionStorage.getItem('timer'))
        setValuesInDOM(values.h, values.m, values.s)
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);