const Weather = ({ capital, weather }) => {
    const weatherCodes = {
        '0': 'Clear sky',
        '1': 'Mainly clear',
        '2': 'Partly cloudy',
        '3': 'Overcast',
        '45': 'Fog',
        '48': 'Depositing rime fog',
        '51': 'Light drizzle',
        '53': 'Moderate drizzle',
        '55': 'Dense drizzle',
        '56': 'Light freezing drizzle',
        '57': 'Dense freezing drizzle',
        '61': 'Slight rain',
        '63': 'Moderate rain',
        '65': 'Heavy rain',
        '66': 'Light freezing rain',
        '67': 'Heavy freezing rain',
        '71': 'Slight snow fall',
        '73': 'Moderate snow fall',
        '75': 'Heavy snow fall',
        '77': 'Snow grains',
        '80': 'Slight rain showers',
        '81': 'Moderate rain showers',
        '82': 'Violent rain showers',
        '85': 'Slight snow showers',
        '86': 'Heavy snow showers',
        '95': 'Slight or moderate thunderstorm',
        '96': 'Thunderstorm with slight hail',
        '99': 'Thunderstorm with heavy hail'
    }

    return (
        <div>
            <h3>Weather in {capital}</h3>
            <p>Temperature: {weather.current.temperature_2m} celsius</p>
            <p>Weather description: {weatherCodes[weather.current.weather_code]}</p>
            <p>Wind: {weather.current.wind_speed_10m} m/s</p>
            <a href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
        </div>
    )
}

const CountryDetails = ({ country, weather }) => {
    const languageKeys = Object.keys(country.languages)
    return (
        <div>
            <h2>{country.name.common} {country.flag}</h2>
            <p><b>Capital:</b> {country.capital}</p>
            <p><b>Area:</b> {country.area}</p>
            <p><b>Languages:</b></p>
            <ul>
                {languageKeys.map(
                    lkey => <li key={lkey}>{country.languages[lkey]}</li>)}
            </ul>
            <img src={country.flags.png} />
            <Weather capital={country.capital} weather={weather} />
        </div>
    )
}

export default CountryDetails