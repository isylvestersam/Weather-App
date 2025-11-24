

export function convertTemp( temp, unit ) {
  const result = unit === 'fahrenheit' ? (temp * 9/5) + 32 : temp;
  return Number(result.toFixed(1));
}

export function convertWind(speed, unit){
  const result = unit === 'mph' ? (speed / 1.609).toFixed(1) : speed;
  return Number(result);
}

export function convertPrecip(precip, unit) {
  const result = unit === 'in' ? (precip / 25.4).toFixed(1) : precip;
  return Number(result);
}