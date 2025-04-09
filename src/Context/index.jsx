import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({})
    const [values, setValues] = useState([])
    const [place, setPlace] = useState('')
    const [thisLocation, setLocation] = useState('')

    // OpenWeatherMap API configuration
    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                'https://api.openweathermap.org/data/2.5/weather', 
                {
                    params: {
                        q: place,
                        appid: import.meta.env.VITE_API_KEY,
                        units: 'metric'
                    }
                }
            );

            const { data } = response;
            setLocation(data.name);
            setWeather({
                temp: data.main.temp,
                humidity: data.main.humidity,
                wind: data.wind.speed,
                conditions: data.weather[0].main,
                icon: data.weather[0].icon,
                heatIndex: data.main.feels_like
            });
            
        } catch (e) {
            console.error(e);
            alert('City not found!');
        }
    }

    useEffect(() => {
        if (place.trim() !== '') {
            fetchWeather();
        }
    }, [place]);
    
    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            thisLocation,
            place
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
