const sourceForTemplate = document.querySelector('#myTemplate').innerHTML;
const template = Handlebars.compile(sourceForTemplate);

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
        description:'Mercury is the smallest planet in the Solar System and the closest to the Sun. ' +
            'Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun\'s planets',
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
        description:'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. ' +
            'In English, Mars carries the name of the Roman god of war and is often referred to as the "Red Planet".',
        image:'assets/detailed-planets/6.png'
    },
    {name: 'Jupiter',
        description:'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than ' +
            'two and a half times that of all the other planets in the Solar System combined, but slightly less than one-thousandth the mass of the Sun.',
        image:'assets/detailed-planets/1.png'},
    {
        name: 'Saturn',
        description:'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. ' +
            'It is a gas giant with an average radius of about nine and a half times that of Earth.',
        image:'assets/detailed-planets/5.png'
    },
    {
        name: 'Uranus',
        description:'Uranus is the seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus, who, according to Greek mythology, ' +
            'was the great-grandfather of Ares (Mars), grandfather of Zeus (Jupiter) and father of Cronus (Saturn). ',
        image:'assets/detailed-planets/2.png'
    },
    {
        name: 'Neptune',
        description:'Neptune is the eighth and farthest known Solar planet from the Sun. In the Solar System, ' +
            'it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet.',
        image:'assets/detailed-planets/7.png'
    }
]

function manageDetails() {

    let overviewBtn = document.querySelector('#overviewBtn')
    let internalBtn = document.querySelector('#internalBtn')
    let surfaceBtn = document.querySelector('#surfaceBtn')
    overviewBtn.classList.add('selected')

    let overview = document.querySelector('#overviewDesc')
    let internalStructure = document.querySelector('#internalStructureDesc')
    internalStructure.classList.add('d-none')
    let surfaceGeology = document.querySelector('#surfaceGeologyDesc')
    surfaceGeology.classList.add('d-none')

    overviewBtn.addEventListener('click', (e) => {
        internalBtn.classList.remove('selected')
        overviewBtn.classList.add('selected')
        surfaceBtn.classList.remove('selected')
        overview.classList.remove('d-none')
        internalStructure.classList.add('d-none')
        surfaceGeology.classList.add('d-none')
    })
    internalBtn.addEventListener('click', () => {
        internalBtn.classList.add('selected')
        overviewBtn.classList.remove('selected')
        surfaceBtn.classList.remove('selected')
        overview.classList.add('d-none')
        internalStructure.classList.remove('d-none')
        surfaceGeology.classList.add('d-none')
    })
    surfaceBtn.addEventListener('click', () => {
        internalBtn.classList.remove('selected')
        overviewBtn.classList.remove('selected')
        surfaceBtn.classList.add('selected')
        overview.classList.add('d-none')
        internalStructure.classList.add('d-none')
        surfaceGeology.classList.remove('d-none')
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