import showcaseImgMobile from '../../assets/bg-today-small.svg'
import showcaseImgDesktop from '../../assets/bg-today-large.svg'
import { WeatherContext } from '../Context/WeatherContext'
import { useContext } from 'react';
import { WeatherCodeToIcon } from '../Helpers/WeatherCodeToIcon';
import { WeatherCodeToComment } from '../Helpers/WeatherCodeToComment';
import { converPrecip, convertTemp, convertWind } from '../Helpers/ConversionHelpers';

const ShowCaseBar = () => {
  const { state } = useContext(WeatherContext)

  if (!state.weatherData) return null
  
  let currCountry = state.weatherData?.country || ''
  let separator = currCountry === '' ? '' : ','
  let currLocation = state?.location || ''
  // let currTemp = state.weatherData?.current.temperature || '--';
  let currWeatherCode = state.weatherData?.current.weather_code ?? 0 ;
  let currIcon = WeatherCodeToIcon(currWeatherCode);
  let currComment = WeatherCodeToComment(currWeatherCode)

  let currTemp = convertTemp(state.weatherData?.current.temperature || '--', state.temperatureUnit)
  
  console.log(currWeatherCode);
  
  const formatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return ( <div className='relative flex flex-col items-center justify-center w-full h-70 rounded-2xl overflow-hidden mt-6 ' >
    <img src={showcaseImgDesktop} className='absolute inset-0 hidden lg:block -z-50 '/>
    <img src={showcaseImgMobile} className='absolute inset-0 w-full h-full object-cover block lg:hidden -z-50 bg-contain '/>
    <div className='text-center'>
      <h3 className='text-3xl font-semibold'>{ `${currLocation}${separator} ${currCountry}` }</h3>
      <p className="text-gray-300 ">{formatted}</p>
      <p> {currComment} </p>
    </div>
    <div className='flex items-center justify-around'>
      <img src={currIcon} className='w-32' />
      <h3 className='text-[3.5rem] italic font-semibold'>{currTemp}°</h3>
    </div>
  </div> );
}
 
export default ShowCaseBar;