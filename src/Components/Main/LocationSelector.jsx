import searchIcon from '../../assets/icon-search.svg'
import { useState, useContext, useEffect } from 'react'
import { WeatherContext } from '../Context/WeatherContext'


const LocationSelector = ({ }) => {
  const [inputValue, setInputValue] = useState('')
  const { state, setCity, setWeatherData, setLoading, setError, setTempUnit } = useContext(WeatherContext)
  function handleInputChange(e) {
    setInputValue(e.target.value)
    setError(null)
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!inputValue) return;

    setLoading();

    const data = await fetchWeather(inputValue)
    if (data) {
      setCity(data.location)
      setWeatherData(data)
    }
    else {
      setError('Location not found')
    }
  }

  useEffect(() => {
    if (!navigator.geolocation) return setError('Geolocation not supported')

    setLoading()
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const data = await fetchWeatherByCoords(coords.latitude, coords.longitude)
        if (data) {
          setCity(data.location)
          setWeatherData(data)
        } else {
          setError('Could not fetch weather for your location')
        }
      },
      () => setError('Location Access Denied')
    )
  }, [])

   async function fetchWeatherByCoords(lat, lon) {
  try {
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation,weathercode` +
      `&current_weather=true` +
      `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
      `&timezone=auto`
    )

    if (!weatherRes.ok) throw new Error('Failed to fetch weather')

    const data = await weatherRes.json()
    const currentHour = data.current_weather.time.slice(0, 13)
    const currentIndex = data.hourly.time.findIndex(
      t => t.slice(0, 13) === currentHour
    )

    return { 
      location: 'Your Location',
      country: '',
      current: {
        ...data.current_weather,
        humidity: currentIndex !== -1 ? data.hourly.relativehumidity_2m[currentIndex] : null,
        precipitation: currentIndex !== -1 ? data.hourly.precipitation[currentIndex] : null
      },
      daily: data.daily,
      hourly: data.hourly
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

  async function fetchWeather(city) {
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
      )
      const geoData = await geoRes.json()
      if (!geoData.results || geoData.results.length === 0 ) throw new Error('Location not Found')
        
      const { latitude, longitude, name, country } = geoData.results[0]
      
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      `&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation,weathercode` +
      `&current_weather=true` +
      `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
      `&timezone=auto`
      ) 
      
      if (!weatherRes.ok) {
        const errorData = await weatherRes.json()
        throw new Error(errorData || 'Failed to fetch weather')
      }

      const data  = await weatherRes.json();

      const currentHour = data.current_weather.time.slice(0, 13)
      const currentIndex = data.hourly.time.findIndex(
        t => t.slice(0, 13) === currentHour)
      

      return { 
        location: name,
        country,
        current: {
          ...data.current_weather,
          humidity: currentIndex !== 1
            ? data.hourly.relativehumidity_2m[currentIndex]
            : null,
          precipitation: currentIndex !== 1
            ? data.hourly.precipitation[currentIndex]
            : null
        },
        daily: data.daily,
        hourly: data.hourly
      }

    } catch (err) {
      console.log(err);
      return null
    }
  }


  return ( <form className="text-white flex flex-col gap-3 lg:flex-row w-full  lg:justify-center "
  onSubmit={handleSearch}
  >
    <div className='bg-[#25253F]  flex gap-1 px-4 rounded-lg lg:w-[60%]'>
      <img src={searchIcon} alt="" />
      <input 
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for a place..." className="placeholder:text-gray-500 bg-[#25253F] px-3 py-3 rounded-lg focus:outline-none w-full"
        
        />
    </div>
    <button 
      className="bg-[#4657D9] py-3 rounded-lg hover:bg-[#2C1B9D] soften lg:px-7"
      type='submit'
      >Search</button>
  </form> );
}
 
export default LocationSelector;