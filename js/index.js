const searchForm = document.querySelector(".search-loaction");
const cityValue = document.querySelector(".search-loaction input");

const dayValue = document.querySelector(".today .forecast-header .day");
const dateValue = document.querySelector(".today .forecast-header .date");

const cityName = document.querySelector(".location");
const degreeValue = document.querySelector(".degree .num");
const weatherImg = document.querySelector(".forecast-icon img");

const humidityImg = document.querySelector("span.humidity span");
const windImg = document.querySelector("span.wind span");
const sunriseImg = document.querySelector("span.sunrise span");
const sunsetImg = document.querySelector("span.sunset span");

const forecastContainer = document.querySelector(".forecast-container");

// const cardBody = document.querySelector('.card-body');
// const timeImage = document.querySelector('.forecast-icon img');

// const cardInfo = document.querySelector('.back-card');

const spitOutCelcius = (kelvin) => {
  celcius = Math.round(kelvin - 273.15);
  return celcius;
};
const isDayTime = (icon) => {
  if (icon.includes("d")) {
    return true;
  } else {
    return false;
  }
};
updateWeatherApp = (data, citySearched) => {
  console.log(data);
  const { current, daily, hourly, minutely, lat, lon, timezone } = data;
  console.log(current, daily, hourly, minutely, lat, lon, timezone);
  const imageName = current.weather[0].icon;
  const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`;

  const { dt, temp, humidity, wind_speed, sunrise, sunset } = current;
  // console.log(dt)

  const date = new Date(dt * 1000);
  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);

  // console.log(dayName.toLocaleDateString())
  // console.log(dayName.toLocaleDateString('en-US', { weekday: 'long' }))

  dayValue.textContent = date.toLocaleDateString("en-US", { weekday: "long" });
  dateValue.textContent = date.toLocaleDateString();
  cityName.textContent = citySearched;
  degreeValue.innerHTML = `${Math.round(temp * 10) / 10}<sup>o</sup>C`;
  weatherImg.setAttribute("src", iconSrc);
  // console.log(Math.floor10(-55.51, -1))

  humidityImg.textContent = humidity + "%";
  windImg.textContent = wind_speed + " km/h";
  sunriseImg.textContent = sunriseDate.toLocaleTimeString();
  sunsetImg.textContent = sunsetDate.toLocaleTimeString();

  // var i;
  console.log(forecastContainer)

//   forecastContainer.removeChild(document.querySelector('.nottoday'))
    var list = document.getElementsByClassName("nottoday");
    for(var i = list.length - 1; 0 <= i; i--)
    if(list[i] && list[i].parentElement)
    list[i].parentElement.removeChild(list[i]);

  for (var i = 1; i < daily.length - 1; i++) {
    // console.log(daily[i])
    let currentDay = daily[i]
    let {dt, weather, temp} = currentDay
    let {min, max} = temp 

    let imageName = weather[0].icon;
    let iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`;
    let date = new Date(dt * 1000);
    forecastContainer.insertAdjacentHTML('beforeend', `
    <div class="forecast nottoday">
        <div class="forecast-header">
            <div class="day">${date.toLocaleDateString("en-US", { weekday: "long" })}</div>
        </div> 
        <div class="forecast-content">
            <div class="forecast-icon">
                <img src="${iconSrc}" alt="" width=48>
            </div>
            <div class="degree">${Math.round(max)}<sup>o</sup>C</div>
            <small>${Math.round(min)}<sup>o</sup></small>
        </div>
    </div>
    `);
    // forecastContainer.innerHTML = forecastContainer.innerHTML + `
    //     <div class="forecast nottoday">
    //         <div class="forecast-header">
    //             <div class="day">${date.toLocaleDateString("en-US", { weekday: "long" })}</div>
    //         </div> 
    //         <div class="forecast-content">
    //             <div class="forecast-icon">
    //                 <img src="${iconSrc}" alt="" width=48>
    //             </div>
    //             <div class="degree">${Math.round(max)}<sup>o</sup>C</div>
    //             <small>${Math.round(min)}<sup>o</sup></small>
    //         </div>
    //     </div>
        // `
  }

  
};

//add an event listner to the form
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const citySearched = cityValue.value.trim();
  console.log(citySearched);
  searchForm.reset();

  GeoCodeRequest(citySearched)
    .then((data) => {
      console.log(data);
      if(data.length === 0){
        alert("This country or city does not exsists")
        return
    }
      const { name, lat, lon } = data[0];
      OneCallRequest(lat, lon)
        .then((data) => {
          updateWeatherApp(data, name);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

GeoCodeRequest("Ha Long")
  .then((data) => {
    console.log(data);
    const { name, lat, lon } = data[0];
    OneCallRequest(lat, lon)
      .then((data) => {
        updateWeatherApp(data, name);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
