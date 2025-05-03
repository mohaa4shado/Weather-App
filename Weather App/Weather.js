const API_KEY = "7ce8ba000cc547d886e140557252404";

document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.getElementById("searchBox");
    const goButton = document.querySelector(".btn-success");

    goButton.addEventListener("click", () => {
        const location = searchBox.value.trim();
        if (location) {
            getWeather(location);
        }
    });
});

async function getWeather(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`);
        const data = await response.json();

        updateWeatherCards(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

function updateWeatherCards(data) {
    const forecast = data.forecast.forecastday;

    const weatherContainer = document.getElementById("weatherContainer");
    weatherContainer.innerHTML = `
        <h1 class="display-4">Weather App</h1>
        <p class="lead">Get the latest weather updates for your location......</p>

        <div class="d-flex flex-column align-items-center mb-4">
            <div class="row g-2 align-items-center">
                <div class="col-auto">
                    <input type="text" id="searchBox" class="form-control" placeholder="Enter your location">
                </div>
                <div class="col-auto">
                    <button class="btn btn-success">Go</button>
                </div>
            </div>
        </div>

        <div class="row">
            ${forecast.map((day, index) => `
                <div class="col-md-4">
                    <div class="weather-card text-center">
                        <h5>${index === 0 ? "Today" : index === 1 ? "Tomorrow" : "Day After"}</h5>
                        <p class="city-name">${data.location.name}</p>
                        <img src="https:${day.day.condition.icon}" alt="weather" />
                        <h4>${day.day.avgtemp_c}°C</h4>
                        <p>${day.day.condition.text}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Re-bind search box and button again after DOM update
    document.querySelector(".btn-success").addEventListener("click", () => {
        const location = document.getElementById("searchBox").value.trim();
        if (location) {
            getWeather(location);
        }
    });
}
