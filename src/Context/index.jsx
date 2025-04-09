import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [place, setPlace] = useState('');
    const [thisLocation, setLocation] = useState('');
    const [forecastData, setForecastData] = useState([]); 

    const fetchWeather = async () => {
        try {
            const API_KEY = import.meta.env.VITE_API_KEY;

            
            const current = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: place,
                    appid: API_KEY,
                    units: 'metric'
                }
            });

            const { data } = current;
            setLocation(data.name);
            setWeather({
                temp: data.main.temp,
                humidity: data.main.humidity,
                wind: data.wind.speed,
                conditions: data.weather[0].main,
                icon: data.weather[0].icon,
                heatIndex: data.main.feels_like
            });

           
            const forecast = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
                params: {
                    q: place,
                    appid: API_KEY,
                    units: 'metric'
                }
            });

            
            const filtered = forecast.data.list.filter(item =>
                item.dt_txt.includes("12:00:00")
            );

           
            const formatted = filtered.map(item => ({
                date: item.dt_txt.split(' ')[0],
                temp: Math.round(item.main.temp),
                icon: item.weather[0].icon,
                conditions: item.weather[0].main
            }));

            setForecastData(formatted); 
        } catch (e) {
            console.error(e);
            alert('City not found!');
        }
    };

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
            place,
            forecastData
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
