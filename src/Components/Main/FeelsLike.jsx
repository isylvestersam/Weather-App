import { WeatherContext } from "../Context/WeatherContext";
import { useContext } from "react";

const FeelsLike = () => {
  const { state } = useContext(WeatherContext)
  let feelsLike = state.weatherData?.current
  // console.log(state);
  
  const feelsLikeArray = ['feels_like', 'humidity', 'pressure', 'sea_level' ]
  const formatTitle = (str) => {
    return str
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };
  return ( <div className="mt-5 grid grid-cols-2 gap-4 lg:flex lg:gap-6">
    {
      feelsLikeArray.map((item) => {
        return (
          <div className="bg-[#25253F] flex  flex-col justify-between h-28 py-4 px-4 rounded-xl border border-gray-700 "
          key={item}>
            <h3 className="text-gray-300">{formatTitle(item)}</h3>
            <p className="text-4xl">64°</p>
          </div>
        )
      })
    }
  </div> );
}
 
export default FeelsLike;

