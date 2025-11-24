import { WeatherContext } from "../Context/WeatherContext";
import { useContext } from "react";
import { WeatherCodeToIcon } from "../Helpers/WeatherCodeToIcon";

const DailyForecast = () => {
  const { state } = useContext(WeatherContext)
  if (!state.weatherData) return null

  const { time, temperature_2m_max, temperature_2m_min, weather_code } = state.weatherData.daily
  
  

  const dailyForecastData = time.map((date, i) => ({
    day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
    max: temperature_2m_max[i],
    min: temperature_2m_min[i],
    weatherCode: weather_code[i],
    icon: WeatherCodeToIcon(weather_code[i])
  }))

  return ( <div className=" grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 text-center">
        {dailyForecastData.map((data) => (
          <div key={data.day} className="bg-[#25253F] border-gray-700 border flex flex-col items-center justify-between rounded-lg h-48 py-5 px-3 ">
            <p className="text-lg">{data.day}</p>
            <img src={data.icon} className="w-20"/>
            <div className="flex gap-7">
              <p> { `${data.max}\u00B0`} </p>
              <p> { `${data.min}\u00B0`} </p>
            </div>
          </div>)
        )}
      
    

  </div> );
}
 
export default DailyForecast;