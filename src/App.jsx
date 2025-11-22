import { useState } from 'react'
import './index.css'
import logo from './assets/logo.svg'
import WeatherSelector from './Components/Top Header/WeatherSelector';
import LocationSelector from './Components/Main/LocationSelector';
import ShowCaseBar from './Components/Main/ShowCaseBar';
import FeelsLike from './Components/Main/FeelsLike';

const SET_LOCATION = 'set-location';
const SET_WEATHER = 'set-weather'
const SET_LOADING = 'set-loading'
const SET_ERROR = 'set-error'
const SET_TEMP_UNIT = 'set-temp-unit';
const SET_PRECIP_UNIT = 'set-precip-unit'

function weatherReducer(state, action){
  switch (action.type){
    case SET_LOCATION:
      return { ...state, location: action.payload };
    case SET_WEATHER:
      return { ...state, weatherData: action.payload, loading: false };
    case SET_LOADING:
      return { ...state, loading: true }
    case SET_ERROR :
      return { ...state, error: action.payload, loading: false }
    case SET_TEMP_UNIT:
      return { ...state, windUnit: action.payload }
    case SET_PRECIP_UNIT:
      return { ...state, precipUnit: action.payload }
    default:
    return state
  }
}

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [windSpeedUnit, setWindSpeedUnit] = useState('')
  const [precipitationUnit, setPrecipitationUnit] = useState('')
  const initialState ={
    location: '',
    weatherData: null,
    loading: false,
    error: null,
    temperatureUnit: 'celsius',
    windUnit: 'kmh',
    precipUnit: 'mm'
  }

  function handleSelector( value, setValue ){
    setValue(value)
  }
  
  

  return (
    <>
      <div className='container pt-12 px-4 mx-auto flex flex-col justify-center text-white'>
        <header>
          <div className='flex justify-between'>
            <img src={logo} />
            <WeatherSelector 
              setSelectedCity={setSelectedCity} 
              selectedCity={selectedCity}
              setWindSpeedUnit={setWindSpeedUnit}
              windSpeedUnit={windSpeedUnit}
              precipitationUnit={precipitationUnit}
              setPrecipitationUnit={setPrecipitationUnit}
              handleSelector={handleSelector}
              />
              
          </div>
        </header>
        <h3 className='text-white mx-auto font-semibold text-5xl text-center my-6 heading-text '>How's the sky looking today?</h3>
        <LocationSelector />
        <ShowCaseBar />
        <FeelsLike />

      </div>
    </>
  )
}

export default App
