async function windowActions() {
    console.log('Window loaded');
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json')
    const json = await data.json();
    const form = document.querySelector('.userform');
    const search = document.querySelector('#name');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('submit fired', search.value);
        const display = data.filter((record) => record.city.toUpperCase() === search.value.toUpperCase)
        // ^display is the filtered dataset

    });

    search.addEventListener('input', (event) => {
        console.log('input', event.target.value);
    });
}

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



window.onload = windowActions;

// ++++++++++++++++++++++
        // HOW TO WRITE POST REQUEST

        // const request = await fetch('/api', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({data: search.value})
        // });
        // const data = await request.json(); 
// ++++++++++++++++++++++



// const endpoint = '';

// const cities = [];

// fetch(endpoint)
//     .then(blob => blob.json())
//     .then(blob => cities.push(...data)) 

// function findMatches(wordToMatch, cites){
//     return cities.filter(place => {
//         const regex = new RegExp(wordToMatch, 'gi');
//         return place.city.match(regex) || place.state.match(regex)
//     });
//     // ^filter down into subset
// }

// function displayMatches(){
//     const matchArray = findMatches(this.value, cities);
//     const html = matchArray.map(place => {
//         const regex = new RegExp(this.value, 'gi');
//         const cityName = place.city.replace(regex, `<span clas = 'h1> $ {this.value}</spen>`);
//         const stateName = place.state.replace(regex, `<span clas = 'h1> $ {this.value}</spen>`)
//         return `
//         <li>
//             <span class = 'name'> $ {cityName}, 4{stateName}</span>
//             <span class = 'population'> $ {numberWithCommas(place.population)}</span>  
//         </li>
//         `;
//     }).join('');
//     suggestions.innerHTML = html;
// }

// const searchInput = document.querySelector('.search');
// const searchInput = document.querySelector('.suggestions');

// searchInput.addEventListener('change', displayMatches);
// searchInput.addEventListener('keyup', displayMatches);



async function windowActions() {
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json')
    const json = await data.json();


    function findMatches(wordToMatch, json) {
        return json.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi');
            return place.zip.match(regex) || place.name.match(regex) || place.category.match(regex)
        });
    }
    
    function displayMatches(event) {
        const matchArray = findMatches(event.target.value, json);
        const html = matchArray.map(place => {
            const regex = RegExp(event.target.value, 'g');
            const restName = place.name.replace(regex, `<span class="hl">${event.target.value}</span>`);
            const restZip = place.zip.replace(regex, `<span class="hl">${event.target.value}</span>`);
            return `
                <li>
                    <span class="name">${restName}</span></br>
                    <span class="category">${place.category}</span></br>
                    <span class="address">${place.address_line_1} </span></br>
                    <span class="address">${place.state} </span>
                    <span class="address">${place.zip} </span>
                </li>
            `;
        }).join('');
        suggestions.innerHTML = html;
    }

    const suggestions = document.querySelector('.suggestions')
    const searchInput = document.querySelector('.search')

    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', (evt) => {displayMatches(evt)});

}

window.onload = windowActions;

