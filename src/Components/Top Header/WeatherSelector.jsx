import { useContext, useState } from "react";
import SettingsIcons from '../../assets/icon-units.svg'
import { WeatherContext } from "../Context/WeatherContext";


const WeatherSelector = (  ) => {
  const [isOpen, setIsOpen] = useState(false)
  const { state, setCity, setWeatherData, setLoading, setError, setTempUnit, setWindUnit, setPrecipUnit } = useContext(WeatherContext)
  function toggleDropDown() {
    setIsOpen(prev => !prev)
  }

  return ( <div className="text-white relative z-50">
    <button className=" bg-[#25253F] flex items-center gap-1 text-white px-7 py-2 rounded-lg hover:cursor-pointer hover:bg-[#2F2F48] soften" onClick={() => toggleDropDown()}>
      <span><img src={SettingsIcons} alt="" /></span>
      Units</button>
    { isOpen && (
      <div className="flex flex-col items-start gap-3 absolute bg-[#25253F] px-3 py-3 w-44 -left-20 top-12 rounded-lg">
        <p className="text-sm text-gray-500">Temperature</p>
        <button className="w-full text-left">Celsius</button>
        <button className="w-full text-left">Fahrenheit</button>
        <div className="border-b border-gray-700 h-px w-full"></div>
        <p className="text-sm text-gray-500">Wind Speed</p>
        <button className="w-full text-left">km/h</button>
        <button className="w-full text-left">mph</button>
        <div className="border-b border-gray-700 h-px w-full"></div>
        <p className="text-sm text-gray-500">Precipitation</p>
        <button className="w-full text-left">Millimeters (mm)</button>
        <button className="w-full text-left">Inches (in)</button>
      </div>
    )}
  </div> );
}
export default WeatherSelector;