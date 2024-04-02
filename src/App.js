import React, {useState} from 'react';
import './App.css';
import search_icon from "./icons/search.png";
import clear_icon from "./icons/clear.png";
import cloud_icon from "./icons/cloud.png";
import drizzle_icon from "./icons/drizzle.png";
import rain_icon from "./icons/rain.png";
import snow_icon from "./icons/snow.png";

function App() {
  const [temperature, setTemperature] = useState('20°C');
  const [location, setLocation] = useState('Athens');
  const [weatherIcon, setWeatherIcon] = useState(clear_icon);

  const api = "ed5fa1c48313ee8620651f47dbcdf383";
  
  const searchLocation = async () => { 
    const inputElement = document.querySelector(".input");
    if (!inputElement || inputElement.value === "") { 
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputElement.value}&units=Metric&appid=${api}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const roundTemp = Math.floor(data.main.temp)
      setTemperature(`${roundTemp}°C`);
      setLocation(data.name);

      const w_icon = data.weather[0].icon.match(/\d+/)[0]; // extract only the number part 
      if(w_icon === "01")
        setWeatherIcon(clear_icon)
      else if(w_icon === "02")
        setWeatherIcon(cloud_icon)
      else if(w_icon === "03" || w_icon === "04")
      setWeatherIcon(drizzle_icon)
      else if(w_icon === "10")
        setWeatherIcon(rain_icon)
      else if(w_icon === "13")
        setWeatherIcon(snow_icon)
      else 
        setWeatherIcon(clear_icon)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchLocation();
    }
  };

  return (
    <div className="App">
      <div className='container'>
        <div className='input-container'>
          <input className="input" name="text" type="text" placeholder="Search the internet..." onKeyDown={handleKeyPress}/>
          <img className='search-icon' src={search_icon} alt='' onClick={() => {searchLocation()}}></img>
        </div>
        <div className='date'>Tuesday,April 2</div>
        <div className='weather'>
          <img src={weatherIcon} alt='weather-img'></img>
        </div>
        <div className='temp'>{temperature}</div>
        <div className='location-class'>{location}</div>
      </div>
    </div>
  );
}

export default App;
