const mykey = '0c37649cd78a4b0ea11122025242406';
const baseurl = 'https://api.weatherapi.com/v1/forecast.json';
let searchLocation = document.querySelector('#findlocation');

searchLocation.addEventListener('change', function() {
    getWeather(searchLocation.value);
});

async function getWeather(location) {
    try {
        let response = await fetch(`${baseurl}?key=${mykey}&q=${location}&days=3`);
        let finalResponse = await response.json();
        displayWeatherData(finalResponse);
        console.log(finalResponse.forecast.forecastday);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeatherData(data) {
    let dataArray = data.forecast.forecastday;
    let weatherBox = '';

    for (let i = 0; i < dataArray.length; i++) {
        const date = new Date(dataArray[i].date);
        const weekday = date.toLocaleDateString('en-us', { weekday: 'long' });
        const monthday = date.toLocaleDateString('en-us', { month: 'long', day: 'numeric' });

        weatherBox += `
            <div class="col-md-4">
                <div class="border border-2 dd">
                    <footer class="d-flex justify-content-between align-items-center px-3 py-1 footer-center">
                        <p class="mt-2">${weekday}</p>
                        <p class="mt-2">${monthday}</p>
                    </footer>
                    <div class="">
                        <p class="accordion-collapse p-4" id="location">${data.location.name}</p>
                        <h1 class="degree">${dataArray[i].day.maxtemp_c} °C</h1>
                        <h4>${dataArray[i].day.mintemp_c} °</h4>
                        <img src="https:${dataArray[i].day.condition.icon}">
                        <p class="sunny ps-3">${dataArray[i].day.condition.text}</p>
                        <div class="d-flex justify-content-center align-items-center images p-2">
                            <img src="./images/icon-umberella.png" alt="">${dataArray[i].day.daily_chance_of_rain}%
                            <img src="./images/icon-wind.png" alt="">${dataArray[i].day.maxwind_kph} km/h
                            <img src="./images/icon-compass.png" alt="">East
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    document.querySelector('.row').innerHTML = weatherBox;
}

function myCurrentLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let myPosition = `${latitude},${longitude}`;
    getWeather(myPosition);
    console.log(latitude, longitude);
}

navigator.geolocation.getCurrentPosition(myCurrentLocation);
