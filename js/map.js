let map;

export async function loadMap() {
    deletePreloader()
    await ymaps3.ready;

    map = new ymaps3.YMap(document.querySelector('.map__field'), {
        location: {
            center: [55.205247, 25.077816],
            zoom: 10
        }
    });

    map.addChild(new ymaps3.YMapDefaultSchemeLayer());
}

function deletePreloader() {
    let interval = setTimeout(() => {
        if(ymaps3.ready) {
            let preloader = document.querySelector('.preloader')
            preloader.style.display = 'none'
            clearInterval(interval)
        }
    }, 50)
}