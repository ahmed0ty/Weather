const mykey = '0c37649cd78a4b0ea11122025242406'
const baseurl = ' http://api.weatherapi.com/v1/forecast.json'
let searchlocation = document.querySelector('#findlocation')
searchlocation.addEventListener('change',function()
{
    getwather(searchlocation.value)
})

//  http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7

async function getwather(country)
{
   try {
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=0c37649cd78a4b0ea11122025242406&q=${country}&days=3`)
   let finalresponse = await response.json()
   displayweatherdata(finalresponse)
   console.log(finalresponse.forecast.forecastday)
   } catch (error) {
    
   }
}

function displayweatherdata(data)
{
    let dataArray= data.forecast.forecastday
    
    
        // document.querySelector('#location').innerHTML = data.location.name
    
    let watherbox = ''
    for(var i=0; i<dataArray.length;i++)
        {
            const date= new Date(dataArray[i].date)
            const  weekday = date.toLocaleDateString('en-us', {weekday : 'long'})
            const  monthday = date.toLocaleDateString('en-us', {month: 'long', day: 'numeric'})
            watherbox+= `<div class="col-md-4">
                    <div class="border border-2  dd ">
                        <footer class="d-flex justify-content-between align-items-center px-3 py-1 footer-center">
                            <p class="mt-2">${weekday}</p>
                            <p class="mt-2">${monthday}</p>
                        </footer>
                        <div class="">
                            <p class=" accordion-collapse p-4" id="location">${data.location.name}</p>
                            <h1 class="degree">${dataArray[i].day.maxtemp_c} ْ  C</h1>
                            <h4>${dataArray[i].day.mintemp_c} ْ</h4>
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
                
                `

        }
        document.querySelector('.row').innerHTML = watherbox

}

function mycurrentlocation(position)
{
    let latitude = position.coords.latitude
    let longtude = position.coords.longitude
    let myposition = `${latitude},${longtude}`
    getwather(myposition)
    console.log(latitude,longtude)
}


navigator.geolocation.getCurrentPosition(mycurrentlocation)


