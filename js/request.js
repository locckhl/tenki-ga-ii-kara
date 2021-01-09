const OwKey = '41c409f0f57ee096c31e13c349e6c5ce';
const Geocodingkey = 'AIzaSyC-I17LCOW0yNsN6UYQCo6aGiEuGvnGm1c';

// const baseURL = 'http://api.lopenweathermap.org/data/2.5/weather?q=Lagos&appid=cbe3dd267a18f6c89943b3eff94f1ed7';

// fetch(baseURL)
//     .then((data) => { console.log('response', data.json()) })
//     .catch((error) => {
//         console.log(error);
//     });

const requestCity = async (city) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&appid=${OwKey}`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);

    //promise data
    const data = await response.json();
    return data;

}

const OneCallRequest = async (lat, lon ) => {
    const baseURL = 'https://api.openweathermap.org/data/2.5/onecall'
    const query = `?lat=${lat}&lon=${lon}&units=metric&appid=${OwKey}`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);

    //promise data
    const data = await response.json();
    return data;
}

const GeoCodeRequest = async (cityname) => {
    const baseURL = 'http://api.openweathermap.org/geo/1.0/direct'
    const query = `?q=${cityname}&appid=${OwKey}`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);

    //promise data
    const data = await response.json();
    return data;
}
