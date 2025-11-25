import { useContext, useEffect, useRef, useState } from "react";
import SettingsIcons from '../../assets/icon-units.svg'
import { WeatherContext } from "../Context/WeatherContext";
import checkMarkIcon from '../../assets/icon-checkmark.svg'


const WeatherSelector = (  ) => {
  const [isOpen, setIsOpen] = useState(false)
  const { state, setCity, setWeatherData, setLoading, setError, setTempUnit, setWindUnit, setPrecipUnit } = useContext(WeatherContext)
  const baseClasses = `flex flex-row justify-between w-full text-left py-2 px-2 rounded-lg hover:bg-[#2F2F59] `
  const dropDownRef = useRef(null)
  let currTempUnit = state.temperatureUnit;
  let currWindUnit = state.windUnit
  let currPrecipUnit = state.precipUnit 

  function toggleDropDown() {
    setIsOpen(prev => !prev)
  }
  
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      } 
    }
    document.addEventListener('mousedown', handleClickOutside );
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, []);
  
  return ( <div className="text-white relative z-50">
    <button className=" bg-[#25253F] flex items-center gap-1 text-white px-7 py-2 rounded-lg hover:cursor-pointer hover:bg-[#2F2F48] soften" onClick={() => toggleDropDown()}>
      <span className={ isOpen ? 'rotate-180 transition-all duration-300 ' : ' rotate-0 transition-all duration-300 ' } ><img src={SettingsIcons}  /></span>
      Units</button>
    { isOpen && (
      <div ref={dropDownRef} className="flex flex-col border border-gray-600 items-start gap-3 absolute bg-[#25253F] px-3 py-3 w-56 right-0 top-12 rounded-lg">
        <p className="text-sm text-gray-400">Temperature</p>

          <button className={ currTempUnit === 'celsius' 
          ? `${baseClasses} bg-[#2F2F49]`
          : baseClasses } onClick={() => {
            setTempUnit('celsius')
            setIsOpen(false)
            }} >
            <p>{'Celsius'} (°C) </p>
            {currTempUnit === 'celsius'
              ? ( <img src={checkMarkIcon} className="w-4" /> )
              : null}
          </button>
          
        <button className={ `${baseClasses} ${ currTempUnit === 'fahrenheit' ? 'bg-[#2F2F49]' : '' } ` } onClick={() => {
            setTempUnit('fahrenheit')
            setIsOpen(false)
            }}>
          <p> {'Fahrenheit'} (°F) </p>
          {currTempUnit === 'fahrenheit'
              ? ( <img src={checkMarkIcon} className="w-4" /> )
              : null}
        </button>
        <div className="border-b border-gray-700 h-px w-full"></div>
        <p className="text-sm text-gray-400">Wind Speed</p>
        <button className={ `${baseClasses} ${ currWindUnit === 'kmh' ? 'bg-[#2F2F49]' : '' } ` } onClick={() => {
            setWindUnit('kmh')
            setIsOpen(false)
            }} >
          <p>km/h</p>
          {currWindUnit === 'kmh'
            ? ( <img src={checkMarkIcon} className="w-4" /> )
            : null}
        </button>
        <button className={ `${baseClasses} ${ currWindUnit === 'mph' ? 'bg-[#2F2F49]' : '' } ` } onClick={() => {
            setWindUnit('mph')
            setIsOpen(false)
            }}>
          <p>mph</p>
          {currWindUnit === 'mph'
            ? ( <img src={checkMarkIcon} className="w-4" /> )
            : null}
        </button>
        <div className="border-b border-gray-700 h-px w-full"></div>
        <p className="text-sm text-gray-400">Precipitation</p>
        <button className={ `${baseClasses} ${ currPrecipUnit === 'mm' ? 'bg-[#2F2F49]' : '' } ` } onClick={() => {
            setPrecipUnit('mm')
            setIsOpen(false)
            }}>
          <p>Millimeters (mm)</p>
          {currPrecipUnit === 'mm'
            ? ( <img src={checkMarkIcon} className="w-4" /> )
            : null}
        </button>
        <button className={ `${baseClasses} ${ currPrecipUnit === 'in' ? 'bg-[#2F2F49]' : '' } ` } onClick={() => {
            setPrecipUnit('in')
            setIsOpen(false)
            }}>
          <p>Inches (in)</p>
          {currPrecipUnit === 'in'
            ? ( <img src={checkMarkIcon} className="w-4" /> )
            : null}
        </button>
      </div>
    )}
  </div> );
}
export default WeatherSelector;