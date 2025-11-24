import { WeatherContext } from "../Context/WeatherContext";
import { useContext, useState } from "react";
import dropdownIcons from '../../assets/icon-dropdown.svg'
import { WeatherCodeToIcon } from "../Math Helpers/WeatherCodeToIcon";

const HourlyForecast = () => {
  const {state} = useContext(WeatherContext);
  if (!state.WeatherContext) return null
  console.log(state);

  const today = state.weatherData.daily.time[0];
  const [selectedDay, setSelectedDay] = useState(today);

  const hoursForDay = state.weatherData.hourly.time.map((timeStr, i) => ( {
    time: timeStr,
    temp: state.weatherData.hourly.temperature_2m[i],
    weatherCode: state.weatherData.hourly.weatherCode[i],
    icon: WeatherCodeToIcon(state.weatherData.hourly.weatherCode[i])
  }))
  .fiter(hours => hours.time.startsWith(selectedDay))

  return ( <div className="mt-5 bg-[#25253F] rounded-lg pt-8 pb-5 px-4 ">
    <div className="flex justify-between">
      <p className="text-lg">Hourly forecast</p>
      <button className="bg-[#3C3B5D] hover:bg-[#575682] soften px-5 py-2 rounded-md flex gap-2" >
        <h3>Monday</h3>
        <img src={dropdownIcons} alt="" />
      </button>
    </div>
  </div> );
}
 
export default HourlyForecast;