const sourceForTemplate = document.querySelector('#myTemplate').innerHTML;
const template = Handlebars.compile(sourceForTemplate);
console.log('hello')

let planetsDetails = [
    {
        name: 'Earth',
        description:'Earth is the third planet from the Sun and the only astronomical object known to harbor and support life. About 29.2% of Earth\'s ' +
            'surface is land consisting of continents and islands. The remaining 70.8% is covered with water, mostly by oceans, seas, gulfs, and other salt-water bodies, ' +
            'but also by lakes, rivers, and other freshwater, which together constitute the hydrosphere.',
        image:'assets/detailed-planets/3.png'
    },
    {
        name: 'Mercury',
        description:'Earth is the third planet from the Sun and the only astronomical object known to harbor and support life. About 29.2% of Earth\'s ' +
            'surface is land consisting of continents and islands. The remaining 70.8% is covered with water, mostly by oceans, seas, gulfs, and other salt-water bodies, ' +
            'but also by lakes, rivers, and other freshwater, which together constitute the hydrosphere.',
        image:'assets/detailed-planets/4.png'
    },
    {
        name: 'Venus',
        description:"Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. " +
            "As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be, on rare occasions, " +
            "visible to the naked eye in broad daylight.",
        image:'assets/detailed-planets/8.png'
    },
    {
        name: 'Mars',
        description:'Earth is the third planet from the Sun and the only astronomical object known to harbor and support life. About 29.2% of Earth\'s ' +
            'surface is land consisting of continents and islands. The remaining 70.8% is covered with water, mostly by oceans, seas, gulfs, and other salt-water bodies, ' +
            'but also by lakes, rivers, and other freshwater, which together constitute the hydrosphere.',
        image:'assets/detailed-planets/6.png'
    },
    {name: 'Jupiter',
        description:'Earth is the third planet from the Sun and the only astronomical object known to harbor and support life. About 29.2% of Earth\'s ' +
            'surface is land consisting of continents and islands. The remaining 70.8% is covered with water, mostly by oceans, seas, gulfs, and other salt-water bodies, ' +
            'but also by lakes, rivers, and other freshwater, which together constitute the hydrosphere.',
        image:'assets/detailed-planets/1.png'},
    {
        name: 'Saturn',
        description:'Earth is the third planet from the Sun and the only astronomical object known to harbor and support life. About 29.2% of Earth\'s ' +
            'surface is land consisting of continents and islands. The remaining 70.8% is covered with water, mostly by oceans, seas, gulfs, and other salt-water bodies, ' +
            'but also by lakes, rivers, and other freshwater, which together constitute the hydrosphere.',
        image:'assets/detailed-planets/5.png'
    },
    {
        name: 'Uranus',
        description:'Earth is the third planet from the Sun and the only astronomical object known to harbor and support life. About 29.2% of Earth\'s ' +
            'surface is land consisting of continents and islands. The remaining 70.8% is covered with water, mostly by oceans, seas, gulfs, and other salt-water bodies, ' +
            'but also by lakes, rivers, and other freshwater, which together constitute the hydrosphere.',
        image:'assets/detailed-planets/2.png'
    },
    {
        name: 'Neptune',
        description:'Earth is the third planet from the Sun and the only astronomical object known to harbor and support life. About 29.2% of Earth\'s ' +
            'surface is land consisting of continents and islands. The remaining 70.8% is covered with water, mostly by oceans, seas, gulfs, and other salt-water bodies, ' +
            'but also by lakes, rivers, and other freshwater, which together constitute the hydrosphere.',
        image:'assets/detailed-planets/7.png'
    }
]

function manageDetails() {
    let overview = document.getElementById('overviewDesc')
    overview.style.display = 'block'
    let internalStructure = document.querySelector('.internalStructureDesc')
    internalStructure.style.display = 'none'
    let surfaceGeology = document.querySelector('.surfaceGeologyDesc')
    surfaceGeology.style.display = 'none'
    document.querySelector('#overviewBtn').addEventListener('click', (e) => {
        document.getElementById('overviewDesc').style.display = 'block'
        internalStructure.style.display = 'none'
        surfaceGeology.style.display = 'none'
    })
    document.querySelector('#internalBtn').addEventListener('click', () => {
        overview.style.display = 'none'
        internalStructure.style.display = 'block'
        surfaceGeology.style.display = 'none'
    })
    document.querySelector('#surfaceBtn').addEventListener('click', () => {
        overview.style.display = 'none'
        internalStructure.style.display = 'none'
        surfaceGeology.style.display = 'block'
    })
}

function fetchPlanet(planet){
    fetch("https://api.le-systeme-solaire.net/rest/bodies/"+planet).then(data => data.json()).then((response) => {
        planetsDetails.forEach(planet => {
            if(planet.name == response.englishName) {
                response.image = planet.image
                response.description = planet.description
            }
        })

        response.sideralRotation /= 24
        response.sideralRotation = truncateNumbers(response.sideralRotation)
        response.meanRadius = truncateNumbers(response.meanRadius)
        response.sideralOrbit = truncateNumbers(response.sideralOrbit)
        response.avgTemp = convertKelvinsToCelsius(response.avgTemp)
        response.avgTemp = truncateNumbers(response.avgTemp)

        let htmlFromTemplate = template(response)
        document.querySelector('section').innerHTML = htmlFromTemplate
        manageDetails()
    })
}

function truncateNumbers(number) {
    number *= 100
    number = Math.trunc(number)
    number /= 100
    return number
}

function convertKelvinsToCelsius(kelvin){
    let celsius = kelvin - 273.15
    return celsius
}

fetchPlanet('earth')

document.getElementById('menu').addEventListener('click', e => {
    e.stopPropagation()
    let planet = e.target.text
    fetchPlanet(planet)
})