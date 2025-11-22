import searchIcon from '../../assets/icon-search.svg'
import { useState } from 'react'


const LocationSelector = ({ }) => {
  const [location, setLocation] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  function handleInputChange(e) {
    setLocation(e.target.value)
  }

  async function handleSearch(e) {
    e.preventDefault();
    const data = await fetchWeather(location)
    if (data) {
      setWeatherData(data)
    }
    else {
      alert ('Location not found')
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
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,precipitation&timezone=auto`
      )
      if (!weatherRes.ok) {
        const errorData = await weatherRes.json()
        console.error('API ERROR:', errorData)
        throw new Error(errorData || 'Failed to fetch weather')
      }

      const data  = await weatherRes.json()
      console.log( data );
      
      return { 
        location: name,
        country,
        current: data.current,
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
        value={location}
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