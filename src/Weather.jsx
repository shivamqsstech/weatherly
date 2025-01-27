import React, { useCallback, useEffect, useState } from 'react';
import './weather.css'
import searc_icon from './assets/search.png'
import rain from './assets/rain.png'
import humidity_img from './assets/humidity.png'
import wind from './assets/wind.png'
import axios from "axios";

const Weather = () => {
    const [city , setCity] = useState("Delhi");
    const [cityValue ,setCityValue]= useState();
    // const [weather, setWeather] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(50);
    const [windSpeed, setWindSpeed] =useState(2.10);

    const handleInputChange = (e)=>{
        setCityValue(e.target.value);
    }

    const handleSearchClick = () => {
        if (cityValue) {
            setCity(cityValue);
        } else {
            alert("Please enter a valid city name");
        }
    };




    const fetchWeather = useCallback(async() =>{
        const apiKey = process.env.REACT_APP_API_KEY
        console.log("API Key:",apiKey);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        console.log("Request URL:", url);

        try{
            const response = await axios.get(url);
            console.log(response)
            // setWeather(response.data);
            const Temperature = response.data.main.temp -273.15;
            setTemperature(Temperature.toFixed(2));
            setHumidity(response.data.main.humidity);
            setWindSpeed(response.data.wind.speed);
        }
        catch(error){
            console.log("Error fetching weather data:", error);

        }
    },[city]);

    useEffect(()=>{
        fetchWeather()
    }, [fetchWeather]);

    // fetchWeather();




    

  return ( 

    <div className='card'>

        <div className='search'>
            <input type="text" placeholder='enter the city name' onChange={handleInputChange} spellCheck='true' />

            <button onClick={handleSearchClick}><img src={searc_icon} alt="" /></button>

        </div>


        <div className='weather'>

            <img src={rain} alt=""  className='weather-icon'/>
            <h1 className='temp'>{temperature}  °C</h1>
            <h2 className='city'>{city}</h2>

            <div className='details'>

                <div className='col  '>
                    <img src={humidity_img} alt="" />
                    <div className='humidty-column'>
                         <p>Humidity: </p>
                        <p>{humidity} %</p>
                        
                    </div>

                </div>

                <div className='col'>
                    <img src={wind} alt="" />
                    <div className='col-windspeed'>
                        <p>{windSpeed}m/s</p>
                        <p> wind speed</p>

                    </div>

                </div>

            </div>

        </div>


    </div>
   

  )
}

export default Weather;
