import sunnyIcon from '../../assets/icon-sunny.webp'
import stromIcon from '../../assets/icon-storm.webp'
import snowIcon from '../../assets/icon-snow.webp'
import showcaseImgMobile from '../../assets/bg-today-small.svg'
import showcaseImgDesktop from '../../assets/bg-today-large.svg'

const ShowCaseBar = () => {
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
      <h3 className='text-3xl font-semibold'>Berlin, Germany</h3>
      <p className="text-gray-300 ">{formatted}</p>
    </div>
    <div className='flex items-center justify-around'>
      <img src={sunnyIcon} className='w-32' />
      <h3 className='text-[7rem] italic font-semibold'>68°</h3>
    </div>
  </div> );
}
 
export default ShowCaseBar;