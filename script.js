const api = {
    key: '974a0c6b1862902cf6163ead0aa44de8',
    base: "https://api.openweathermap.org/data/2.5/"
}

let input = document.querySelector('input');

function getDate (d) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}



input.addEventListener('keyup', (e) => {
    if(e.keyCode == 13) {
        fetch(`${api.base}weather?q=${e.target.value}&units=metric&appid=${api.key}`)
        .then(res => {
            return res.json()
        })
        .then(result)
        .catch(err => alert('Wrong city name!'))
        input.value = '';
        }
    });

function result(res) {

    // city and country data
    let city = document.querySelector('#name');
    city.innerHTML = `${res.name}, ${res.sys.country}`;

    // Current date
    let now = new Date();
    let date = document.querySelector('#date');
    date.innerHTML = getDate(now);

    // temperature data
    let temp = document.querySelector('#temp');
    temp.innerHTML = `${Math.round(res.main.temp)}<span>°c</span>`;

    // weather data
    let weather = document.querySelector('#weather');
    weather.innerHTML = res.weather[0].main;

    // High - low data
    let range = document.querySelector('#high-low');
    range.innerHTML = `${Math.round(res.main.temp_min)}°c / ${Math.round(res.main.temp_max)}°c`
}




    