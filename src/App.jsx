import { useState } from 'react'
import './index.css'
import logo from './assets/logo.svg'
import WeatherSelector from './Components/Top Header/WeatherSelector';
import LocationSelector from './Components/Main/LocationSelector';
import ShowCaseBar from './Components/Main/ShowCaseBar';
import FeelsLike from './Components/Main/FeelsLike';
import DailyForecast from './Components/Main/DailyForecast';
import HourlyForecast from './Components/Main/HourlyForecast';

function App() {
  function handleSelector( value, setValue ){
    setValue(value)
  }
  return (
    <>
      <div className='container pt-12 px-4 mx-auto flex flex-col justify-center text-white lg:pb-16'>
        <header>
          <div className='flex justify-between'>
            <img src={logo} />
            <WeatherSelector />
          </div>
        </header>
        <h3 className='text-white mx-auto font-semibold text-5xl text-center my-6 heading-text '>How's the sky looking today?</h3>
        <LocationSelector />
        <div className='flex flex-col lg:grid lg:grid-cols-3 lg:auto-rows-auto lg:gap-6 lg:mt-12'>
          <ShowCaseBar />
          <FeelsLike />
          <DailyForecast />
          <HourlyForecast />
        </div>
      </div>
    </>
  )
}

export default App
