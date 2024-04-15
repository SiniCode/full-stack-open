import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryView from './components/CountryView'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [matchingCountries, setMatchingCountries] = useState([])
  const [capitalCoords, setCapitalCoords] = useState([60.17, 24.93])
  const [weather, setWeather] = useState({})
  
  const showCountry = ({country}) => {
    const handler = () => {
      console.log('Country selected')
      setMatchingCountries([country])
      setCapitalCoords(country.capitalInfo.latlng)
    }
    return handler
  }
  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setAllCountries(response.data))
  }, [])

  useEffect(() => {
    const lat = capitalCoords[0]
    const lng = capitalCoords[1]
    axios
      .get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m&wind_speed_unit=ms`)
      .then(response => setWeather(response.data))
  }, capitalCoords)

  const findMatchingCountries = (word) => {
    const matchingCountries = allCountries.filter(
      country => country.name.common.toLowerCase().includes(word.toLowerCase())
    )
    console.log(`found ${matchingCountries.length} countries`)
    return(matchingCountries)
  }

  const handleSearchChange = (event) => {
    const newSearchWord = event.target.value
    const matches = findMatchingCountries(newSearchWord)
    if (matches.length === 1) {
      setCapitalCoords(matches[0].capitalInfo.latlng)
    }
    setMatchingCountries(matches)
    setSearchWord(newSearchWord)
  }

  return(
    <div className='page'>
      <h1>Country Search</h1>
      <b>Find countries:</b>
      <input value={searchWord} onChange={handleSearchChange} />
      <CountryView countriesToShow={matchingCountries} weather={weather} showFunc={showCountry}/>
    </div>
  )
}


export default App