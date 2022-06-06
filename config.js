function settingsApiOne(country) {
    const options = {
        method: 'GET',
        url: 'https://covidapi6.p.rapidapi.com/country-stats/' + country,
        headers: {
            'x-rapidapi-key': 'ed6eb3c0a1msh14f58479f68c8f3p1ac9f0jsn55456b3a42cb',
            'x-rapidapi-host': 'covidapi6.p.rapidapi.com'
        }
    };
    getApiOne(options, country);
}

function settingsApiTwo(country) {
    const options2 = {
        method: 'GET',
        url: 'https://coronavirus-map.p.rapidapi.com/v1/spots/week',
        params: { region: country },
        headers: {
            'x-rapidapi-key': 'ed6eb3c0a1msh14f58479f68c8f3p1ac9f0jsn55456b3a42cb',
            'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com'
        }
    };
    getApiTwo(options2, country);
}