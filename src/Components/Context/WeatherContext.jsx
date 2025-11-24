import { createContext, useReducer } from "react";

const SET_LOCATION = 'set-location';
const SET_WEATHER = 'set-weather';
const SET_LOADING = 'set-loading';
const SET_ERROR = 'set-error';
const SET_TEMP_UNIT = 'set-temp-unit';
const SET_PRECIP_UNIT = 'set-precip-unit';
const SET_WIND_UNIT = 'set-wind-unit';

const initialState ={
    location: '',
    weatherData: null,
    loading: false,
    error: null,
    temperatureUnit: 'celsius',
    windUnit: 'kmh',
    precipUnit: 'mm'
  }

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
      return { ...state, temperatureUnit: action.payload }
    case SET_PRECIP_UNIT:
      return { ...state, precipUnit: action.payload }
    case SET_WIND_UNIT:
      return { ...state, windUnit: action.payload }
    default:
    return state
  }
}

export const WeatherContext = createContext();

export function WeatherProvider({children}){
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const setCity = (city) => dispatch({ type: SET_LOCATION, payload: city })
  const setWeatherData = (data) => dispatch({ type: SET_WEATHER, payload: data })
  const setLoading = ( v = true ) => dispatch({ type: SET_LOADING , payload: v });
  const setError = (err) => dispatch({ type: SET_ERROR, payload: err });
  const setTempUnit = (unit) => dispatch({ type: SET_TEMP_UNIT, payload: unit })
  const setWindUnit = (unit) => dispatch({ type: SET_WIND_UNIT, payload: unit });
  const setPrecipUnit = (unit) => dispatch({ type: SET_PRECIP_UNIT, payload: unit })


  return (
    <WeatherContext.Provider
    value={{
      state,
      setCity,
      setWeatherData,
      setLoading,
      setError,
      setTempUnit,
      setWindUnit,
      setPrecipUnit
    }}
    >
      {children}
    </WeatherContext.Provider>
  )
}