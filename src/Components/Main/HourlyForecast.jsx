import { WeatherContext } from "../Context/WeatherContext";
import { useContext, useState } from "react";
import dropdownIcons from '../../assets/icon-dropdown.svg'
import { WeatherCodeToIcon } from "../Math Helpers/WeatherCodeToIcon";

const HourlyForecast = () => {
  const {state} = useContext(WeatherContext);
  if (!state.weatherData) return null
  console.log(state);

  const today = state.weatherData.daily.time[0];
  const [selectedDay, setSelectedDay] = useState(today);

  const hoursForDay = state.weatherData.hourly.time.map((timeStr, i) => ( {
    time: timeStr,
    temp: state.weatherData.hourly.temperature_2m[i],
    weatherCode: state.weatherData.hourly.weathercode[i],
    icon: WeatherCodeToIcon(state.weatherData.hourly.weathercode[i])
  }))
  .filter(hours => hours.time.startsWith(selectedDay))

  return ( <div className="mt-5 bg-[#25253F] rounded-lg pt-8 pb-5 px-4 ">
    <div className="flex justify-between">
      <p className="text-lg">Hourly forecast</p>
      <div className="relative">
        <button className="bg-[#3C3B5D] hover:bg-[#575682] soften px-5 py-2 rounded-md flex gap-2" >
        <h3>Monday</h3>
        <img src={dropdownIcons} alt="" />
        </button>
        <div className="bg-[#25253F] flex flex-col rounded-lg gap-1 w-44 absolute right-0 top-12 py-3 px-1 border-gray-700 border shadow-md">
          {
            state.weatherData.daily.time.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className="hover:bg-[#2F2F49] rounded-lg text-sm text-left py-2 px-2"
                >
                { new Date(day).toLocaleDateString('en-US', { weekday: 'long' }) }
              </button>
            ))
          }
        </div>
      </div>
    </div>
  </div> );
}
 
export default HourlyForecast;