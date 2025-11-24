import sunnyIcon from '../../assets/icon-sunny.webp'
import moonIcon from '../../assets/crescent-moon.png'
import stromIcon from '../../assets/icon-storm.webp'
import snowIcon from '../../assets/icon-snow.webp'
import showcaseImgMobile from '../../assets/bg-today-small.svg'
import showcaseImgDesktop from '../../assets/bg-today-large.svg'
import { WeatherContext } from '../Context/WeatherContext'
import { useContext } from 'react'

const ShowCaseBar = () => {
  const { state } = useContext(WeatherContext)
    let currCountry = state.weatherData?.country || 'Berlin'
    let currLocation = state?.location || 'Germany'
    let currTemp = state.weatherData?.current.temperature || '60'
    let isDay = state.weatherData?.current.is_day

  
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
      <h3 className='text-3xl font-semibold'>{ `${currLocation}, ${currCountry}` }</h3>
      <p className="text-gray-300 ">{formatted}</p>
    </div>
    <div className='flex items-center justify-around'>
      <img src={ isDay === 1 ? sunnyIcon : moonIcon } className='w-32' />
      <h3 className='text-[5rem] italic font-semibold'>{currTemp}°</h3>
    </div>
  </div> );
}
 
export default ShowCaseBar;