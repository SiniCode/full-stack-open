import CountryDetails from "./CountryDetails"

const CountryView = (props) => {
    const numberOfCountries = props.countriesToShow.length

    if (numberOfCountries === 0) {
        return(
            <div>
                <p><i>No matching countries</i></p>
            </div>
        )
    } else if (numberOfCountries === 1) {
        return(
            <div>
                <CountryDetails country={props.countriesToShow[0]} weather={props.weather} />
            </div>
        )
    } else if (numberOfCountries > 10) {
        return(
            <div>
                <p><i>Too many matching countries. Give a more specific filter.</i></p>
            </div>
        )
    } else {
        return(
            <div>
                <h2>Matching Countries</h2>
                <ul>
                    {props.countriesToShow.map(country =>
                    <li key={country.name.common}>
                        <b>{country.name.common}</b>
                        <button onClick={props.showFunc({country})}>Show</button>
                    </li>)}
                </ul>
            </div>
        )
    }  
}

export default CountryView