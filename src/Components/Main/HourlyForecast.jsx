import { WeatherContext } from "../Context/WeatherContext";
import { useContext, useState, useEffect, useRef } from "react";
import dropdownIcons from '../../assets/icon-dropdown.svg'
import { WeatherCodeToIcon } from "../Helpers/WeatherCodeToIcon";
import { convertTemp } from "../Helpers/ConversionHelpers";

const HourlyForecast = () => {
  const {state} = useContext(WeatherContext);
  const dropdownRef = useRef(null);
  
  const today = state.weatherData?.daily.time[0] || '';
  
  const [selectedDay, setSelectedDay] = useState(today);
  const [isOpen, setIsOpen ] = useState(false)

  
  const handleSelectDay = (day) => {
    setSelectedDay(day);
    setIsOpen(false)
  }
  
  const handleToggleOpen = () => setIsOpen(prev => !prev);

  useEffect(() => {
    if (state.weatherData) {
      setSelectedDay(state.weatherData.daily.time[0])
    }
  }, [state.weatherData]);
  
  useEffect(() => {
    function handleClickOutside(e){
      if (!dropdownRef.current) return;
      if (dropdownRef.current.contains(e.target)) {
        return
      }
      setIsOpen(false)
      
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  if (!state.weatherData) return null
  let currTempUnit = state.temperatureUnit

  const hoursForDay = state.weatherData.hourly.time.map((timeStr, i) => ( {
    time: timeStr,
    temp: convertTemp(state.weatherData.hourly.temperature_2m[i], currTempUnit),
    weatherCode: state.weatherData.hourly.weathercode[i],
    icon: WeatherCodeToIcon(state.weatherData.hourly.weathercode[i])
  }))
  .filter(hours => hours.time.startsWith(selectedDay))

  return ( <div className="mt-5 bg-[#25253F] border border-gray-700 rounded-lg pt-5 pb-5 px-5 mb-12 lg:mb-0 lg:col-start-3 lg:col-span-1 lg:row-start-1 lg:row-span-4 lg:mt-0">
    <div className="flex justify-between items-center mb-2">
      <p className="text-lg">Hourly forecast</p>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={handleToggleOpen}
          className="bg-[#3C3B5D] border border-[#3E3E58] hover:bg-[#575682] soften px-5 py-2 rounded-md flex gap-2" >
        <h3> { new Date(selectedDay).toLocaleDateString('en-US', { weekday:'long' }) } </h3>
        <img 
          src={dropdownIcons} 
          className={ !isOpen ? `rotate-180 translate-all duration-300 ` : `translate-all duration-300 ` } />
        </button>
        {
          isOpen ? (
            <div className="bg-[#25253F] flex flex-col rounded-lg gap-1 w-44 absolute right-0 top-12 py-2 px-1 border-[#3E3E58] border shadow-md">
          {
            state.weatherData.daily.time.map(day => (
              <button
                key={day}
                onClick={() => handleSelectDay(day)}
                className={ selectedDay === day ? 'bg-[#2F2F49] rounded-lg text-sm text-left py-2 px-2' : 'hover:bg-[#2F2F49] rounded-lg text-sm text-left py-2 px-2' }
                >
                { new Date(day + "T00:00").toLocaleDateString('en-US', { weekday: 'long' }) }

              </button>
            ))
          }
        </div>
          ) : null
        }
      </div>
    </div>
    <div className="mt-5 flex flex-col gap-3 h-100 lg:h-140 overflow-auto ">
      {
        hoursForDay.map(hour => (
          <div 
            key={hour.time}
            className="bg-[#2F2F49] border border-[#3E3E58] py-3 px-3 rounded-lg flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <img src={hour.icon} className="w-8 " />
              <h3>
                {new Date(hour.time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
              </h3>
            </div>
            <h3>{hour.temp}&deg;</h3>
          </div>
        ))
      }
    </div>
  </div> );
}
 
export default HourlyForecast;
