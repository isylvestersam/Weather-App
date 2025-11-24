import { WeatherContext } from "../Context/WeatherContext";
import { useContext } from "react";
import { calculateFeelsLike } from "../Helpers/CalculateFeelsLike";

const FeelsLike = () => {
  const { state } = useContext(WeatherContext)
  let currTemp = state.weatherData?.current.temperature
  let currHumidty = state.weatherData?.current.humidity
  let currWindSpeed = state.weatherData?.current.windspeed
  let currPrecip = state.weatherData?.current.precipitation
  let currFeelsLike = calculateFeelsLike( currTemp, currWindSpeed, currPrecip )
  let currtempUnit = state?.temperatureUnit === 'celsius' ? '"°C"' : "°F"
  let currwindSpeedUnit = state?.windUnit === 'kmh' ? 'kmh' : 'mph'
  let currPrecipUnit = state?.precipUnit === 'mm' ? 'mm' : 'in'


  const feelsLikeData = [
    { key: 'feels_like', value: `${currFeelsLike}\u00B0`, unit: '' },
    { key: 'humidity', value: `${currHumidty}%`, unit: '' },
    { key: 'windspeed', value: currWindSpeed, unit: currwindSpeedUnit },
    { key: 'precipitation', value: currPrecip, unit: currPrecipUnit }
  ]

  const formatTitle = (str) => {
    return str
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  let currTempUnit = state.temperatureUnit || '°C'
  

  return ( <div className="mt-5 grid grid-cols-2 gap-4 lg:flex lg:gap-6">
    {
      feelsLikeData.map((item) => {
        return (
          <div className="bg-[#25253F] flex  flex-col justify-between h-28 py-4 px-4 rounded-xl border border-gray-700 "
          key={item.key}>
            <h3 className="text-gray-300">{formatTitle(item.key)}</h3>
            <p className="text-4xl">{`${item.value} ${item.unit}`} </p>
          </div>
        )
      })
    }
  </div> );
}
 
export default FeelsLike;

