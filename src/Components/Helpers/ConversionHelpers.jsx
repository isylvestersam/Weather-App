

export function convertTemp( temp, unit ) {
  return unit === 'fahrenheit' ? (temp * 9/5) + 32 : temp;
}

export function convertWind(speed, unit){
  return unit === 'mph' ? (speed / 1.609).toFixed(1) : speed;
}

export function converPrecip(precip, unit) {
  return unit === 'in' ? (precip / 25.4).toFixed(1) : precip;
}