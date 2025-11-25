import showcaseImgMobile from '../../assets/bg-today-small.svg'
import showcaseImgDesktop from '../../assets/bg-today-large.svg'
import { WeatherContext } from '../Context/WeatherContext'
import { useContext } from 'react';
import { WeatherCodeToIcon } from '../Helpers/WeatherCodeToIcon';
import { WeatherCodeToComment } from '../Helpers/WeatherCodeToComment';
import { convertPrecip, convertTemp, convertWind } from '../Helpers/ConversionHelpers';

const ShowCaseBar = () => {
  const { state } = useContext(WeatherContext)

  if (!state.weatherData) return null
  
  let currCountry = state.weatherData?.country || ''
  let separator = currCountry === '' ? '' : ','
  let currLocation = state?.location || ''
  let currWeatherCode = state.weatherData?.current.weather_code ?? 0 ;
  let currIcon = WeatherCodeToIcon(currWeatherCode);
  let currComment = WeatherCodeToComment(currWeatherCode)

  let currTemp = Math.round(convertTemp(state.weatherData?.current.temperature, state.temperatureUnit))
  
  const formatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return ( <div className='relative flex flex-col items-center justify-center w-full h-72 rounded-2xl overflow-hidden mt-6 lg:mt-0 lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2' >
    <img src={showcaseImgDesktop} className='absolute inset-0 w-full h-full object-cover  hidden lg:block -z-50 '/>
    <img src={showcaseImgMobile} className='absolute inset-0  w-full h-full object-cover block lg:hidden -z-50  '/>
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