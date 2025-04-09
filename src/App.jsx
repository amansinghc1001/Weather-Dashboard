import { useState } from 'react'
import './App.css'
import search from './assets/icons/search.svg'
import { useStateContext } from './Context'
import { BackgroundLayout, WeatherCard, MiniCard } from './Components'

function App() {
  const [input, setInput] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("search-history");
    return saved ? JSON.parse(saved) : [];
  });

  const { weather, thisLocation, values, place, setPlace, forecastData } = useStateContext()

  const submitCity = () => {
    if (!input.trim()) return;
    setPlace(input)
    setInput('')
    setIsDropdownOpen(false)

    const updatedHistory = [input, ...history.filter(city => city !== input)];
    const slicedHistory = updatedHistory.slice(0, 5);
    setHistory(slicedHistory);
    localStorage.setItem("search-history", JSON.stringify(slicedHistory));
  }

  const handleHistoryClick = (city) => {
    setPlace(city);
    setInput('');
    setIsDropdownOpen(false);
  }

  return (
    <div className='w-full min-h-screen text-white px-8 pb-10'>
      <nav className='w-full p-3 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>

        <div className='relative w-[20rem]'>
          <div className='bg-white overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
            <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
            <input
              type="text"
              placeholder='Search city'
              className='focus:outline-none w-full text-[#212121] text-lg'
              value={input}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
              onChange={e => setInput(e.target.value)}
            />
            <button
              onClick={submitCity}
              className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded'
            >
              Search
            </button>
          </div>

          {isDropdownOpen && history.length > 0 && (
            <div className='absolute top-full mt-1 w-full bg-white rounded shadow-md z-10'>
              {history.map((city, index) => (
                <button
                  key={index}
                  onClick={() => handleHistoryClick(city)}
                  className='w-full text-left px-4 py-2 hover:bg-gray-200 text-[#212121]'
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <BackgroundLayout />

      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard
          place={thisLocation}
          windspeed={weather.wind}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.heatIndex}
          iconString={weather.conditions}
          conditions={weather.conditions}
        />

        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {
            values?.slice(1, 7).map(curr => {
              return (
                <MiniCard
                  key={curr.datetime}
                  time={curr.datetime}
                  temp={curr.temp}
                  iconString={curr.conditions}
                />
              )
            })
          }
        </div>
      </main>

      
      {forecastData?.length > 0 && (
        <section className='px-[10%] mt-10'>
          <h2 className='text-2xl font-semibold mb-4 text-center'>5-Day Forecast</h2>
          <div className='flex flex-wrap justify-center gap-4'>
            {forecastData.map((day, i) => (
              <div key={i} className='bg-white text-[#212121] rounded-xl p-4 shadow-md w-28 text-center'>
                <p className='font-bold text-sm'>{day.date}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.conditions}
                  className='w-10 h-10 mx-auto my-2'
                />
                <p className='text-lg font-medium'>{day.temp}°C</p>
                <p className='text-sm'>{day.conditions}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default App
