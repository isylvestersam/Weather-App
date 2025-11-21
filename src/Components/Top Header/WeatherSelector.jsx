

const WeatherSelector = ({ setSelectedCity, selectedCity, windSpeedUnit, setWindSpeedUnit, precipitationUnit, setPrecipitationUnit, handleSelector }) => {
  return ( <div className=" bg-[#25253F] ">
    <select value={selectedCity} onChange={(e) => handleSelector( setSelectedCity, e.target.value ) } id="">
      <option value="">Temperature</option>
      <option value="celsius">Celsius</option>
      <option value="fahrenheit">Fahrenheit</option>
    </select>
    <div className="border h-px flex w-full "></div>
    <select value={windSpeedUnit} onChange={(e) => handleSelector( setWindSpeedUnit, e.target.value )} id="">
      <option value="">Wind Speed</option>
      <option value="km/h">km/h</option>
      <option value="mph">mph</option>
    </select>
    <div className="border h-px flex w-full "></div>
    <select value={windSpeedUnit} onChange={(e) => handleSelector(setPrecipitationUnit, e.target.value )} id="">
      <option value="">Wind Speed</option>
      <option value="km/h">km/h</option>
      <option value="mph">mph</option>
    </select>

  </div> );
}
 
export default WeatherSelector;