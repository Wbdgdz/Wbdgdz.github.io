async function fetchWeatherData(city) {
    const apiKey = 'eccf8200898239c01b81626293da9f1d';
    const cities = {
        'Niort': { lat: 46.3167, lon: -0.4667 },
        'Rio': { lat: -22.9068, lon: -43.1729 },
        'Reykjavik': { lat: 64.1355, lon: -21.8954 }
    };
    const { lat, lon } = cities[city];
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
}

function updateWeatherInfo(city, data) {
    const cityDiv = document.getElementById(city);
    cityDiv.querySelector('p').textContent = `${data.main.temp}°, ${data.weather[0].description}`;
    cityDiv.querySelector('img').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

async function afficheVille() {
    let nomVilleChoisie = document.getElementById("nomVilleChoisie").value;
    let villes = document.getElementsByClassName("city");

    for (let i = 0; i < villes.length; i++) {
        if (villes[i].id === nomVilleChoisie) {
            villes[i].style.display = "block";
            const weatherData = await fetchWeatherData(nomVilleChoisie);
            updateWeatherInfo(nomVilleChoisie, weatherData);
        } else {
            villes[i].style.display = "none";
        }
    }
}

window.onload = afficheVille;
