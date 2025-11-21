import { useState } from 'react'
import './index.css'
import logo from './assets/logo.svg'
import WeatherSelector from './Components/Top Header/WeatherSelector';

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [windSpeedUnit, setWindSpeedUnit] = useState('')
  const [precipitationUnit, setPrecipitationUnit] = useState('')

  function handleSelector( value, setValue ){
    setValue(value)
  }


  return (
    <>
      <div className='container'>
        <header>
          <div>
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

      </div>
    </>
  )
}

export default App
