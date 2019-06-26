import React, { useState, useEffect } from 'react'
import axios from 'axios'

// contains { secret: <secret API key for apixu> } which is not in public version control
import secretData from './secret.json';
// console.log("salainen data tieto: ", secretData.secret);

const Weather = (api) => {
    if (typeof api.currentWeather.current !== 'undefined' && typeof api.currentWeather.current.condition !== 'undefined') {  // ugly hack to not fail on undefined-error
        return (
            <>
                <h3>Weather in {api.currentWeather.location.name}</h3>
                <div>
                    <b>temperature </b> {api.currentWeather.current.temp_c}
                </div>
                <img alt="sääkuva" src={'http:' + api.currentWeather.current.condition.icon} />
                <div>
                    <b>wind: </b> {api.currentWeather.wind_kph} kph direction {api.currentWeather.current.wind_dir}
                </div>
            </>
        )
    } else {
        return (<></>)
    }
}

const CountryDetail = ({ api, country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>languages</h3>
            <ul>
                {
                    country.languages.map(language => (
                        <li key={language.name}>{language.name}</li>
                    ))
                }
            </ul>
            <img alt="maan lippu" src={country.flag} width="50%" height="50%" />
            <Weather api={api} country={country} currentWeather={api.currentWeather} />
        </div>
    )
}

const Country = ({ api, country }) => {
    return (
        <div>
            {country.name} <CountryNappi country={country} api={api} />
        </div>
    )
}

const CountryNappi = ({ country, api }) => {
    return (
        <>
            <button name="countryNappi" value={country.name} onClick={api.country_click}>show</button>
        </>
    )
}

const CountryList = ({ api }) => {
    return (
        <>
            {
                api.filtered_countries.map(country => (
                    <Country key={country.name} country={country} api={api} />
                ))
            }
        </>
    )
}

const CountryFilter = ({ api }) => (
    <div>
        find countries <input autoFocus={true} name="hakua" onChange={api.haku_muutos} value={api.search} type="search" />
    </div>
)

const App = () => {
    const [countries, setCountries] = useState([])
    const [hakuehto, setHakuehto] = useState('')
    const [filtered, setFiltered] = useState([])
    const [currentWeather, setCurrentWeather] = useState({})
    useEffect(() => {
        console.log('get countries effectissä')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('get countries promise fulfilled')
                setCountries(response.data)
            })
    }, [])
    const currentWeatherHook = (city) => {
        console.log('@currentWeatherHook', city)
        axios
            .get('http://api.apixu.com/v1/current.json?key=2da881e229004a7a8f2124349192506&q=' + city)
            .then(response => {
                console.log('good weather promise fulfilled', response.data)
                setCurrentWeather(response.data)
            })
    }

    const api = {
        countries: countries,
        search: hakuehto,
        filtered_countries: filtered,
        haku_muutos: ({ target: { value } }) => {
            setHakuehto(value)
            let filtered = countries.filter(country => (country.name.includes(value)))
            if (filtered.length === 1) {
                api.setWeather(api.filtered_countries[0].capital)
            }
            setFiltered(filtered)
        },
        country_click: ({ target: { value } }) => {
            setHakuehto(value)
            let filtered = countries.filter(country => (country.name.includes(value)))
            if (filtered.length === 1) {
                api.setWeather(api.filtered_countries[0].capital)
            }
            setFiltered(filtered)
        },
        apixu_secret: secretData.secret,
        currentWeather: currentWeather,
        setWeather: (city) => {
            currentWeatherHook(city)
        }
    }

    if (api.filtered_countries.length === 0) {
        return (
            <CountryFilter api={api} />
        )
    } else if (api.filtered_countries.length === 1) {
        return (
            <div>
                <CountryFilter api={api} />
                <CountryDetail api={api} country={api.filtered_countries[0]} />
            </div>
        )
    } else if (api.filtered_countries.length <= 10) {
        return (
            <div>
                <CountryFilter api={api} />
                <CountryList api={api} />
            </div>
        )
    } else {
        return (
            <div>
                <CountryFilter api={api} />
                <div>Too many matches, specify better filter</div>
            </div>
        )
    }
}

export default App
