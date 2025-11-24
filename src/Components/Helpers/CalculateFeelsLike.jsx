
  export function calculateFeelsLike(temperature, windKmh, humidity) {
  let feelsLike = temperature;

  // Wind chill for cold weather (temp ≤ 10°C and wind > 4.8 km/h)
  if (temperature <= 10 && windKmh > 4.8) {
    feelsLike = 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * temperature * Math.pow(windKmh, 0.16);
  }

  // Heat index for hot weather (temp ≥ 27°C)
  if (temperature >= 27) {
    const T = temperature;
    const R = humidity;
    feelsLike = -8.784695 + 1.61139411*T + 2.338549*R - 0.14611605*T*R 
                - 0.012308094*Math.pow(T,2) - 0.016424828*Math.pow(R,2) 
                + 0.002211732*Math.pow(T,2)*R + 0.00072546*T*Math.pow(R,2) 
                - 0.000003582*Math.pow(T,2)*Math.pow(R,2);
  }

  return Math.round(feelsLike * 10) / 10; // rounded to 1 decimal
}
