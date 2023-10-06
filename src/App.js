import React, { useState } from 'react';
const api = {
  key: "5a1e5e4bb8d74a0c9a245407231808",
  base: "http://api.weatherapi.com/v1/"
}

function App() {
  const [query, setQuery] = useState(""); //user input (state inital value) and second update Display show data = initialstate
  const [weather, setWeather] = useState({}); //hook state

  const search = evt => {
    if (evt.key === "Enter") { //=== meaning check value and datatype
      fetch(`${api.base}current.json?key=${api.key}&q=${query}`) //&q = user input query
        .then(res => res.json()) //promise function to converted data json file fetch method add methos stored 
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(weather);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.location != "undefined") ? (weather.location.temp_c < 30) ? "app": "app warm": ('')}> 
    {/* app and app warm classname : */} {/* ('') = meaning undefined value doesn't show data */}
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)} //event access the target input's value inside of the handleChange by accessing e.target.value. 
            value={query}
            onKeyPress={search} //predefined method
          />
        </div>
        {(typeof weather.location != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.location.name}, {weather.location.region},
              {weather.location.temp_c}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {weather.current.temp_c}°c
              </div>
              <div className="weather">{weather.current.condition.text}</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;

