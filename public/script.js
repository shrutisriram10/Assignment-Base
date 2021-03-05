const endpoint = '';

const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(blob => cities.push(...data)) 

function findMatches(wordToMatch, cites){
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex)
    });
    // ^filter down into subset
}

function displayMatches(){
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span clas = 'h1> $ {this.value}</spen>`);
        const stateName = place.state.replace(regex, `<span clas = 'h1> $ {this.value}</spen>`)
        return `
        <li>
            <span class = 'name'> $ {cityName}, 4{stateName}</span>
            <span class = 'population'> $ {numberWithCommas(place.population)}</span>  
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const searchInput = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
