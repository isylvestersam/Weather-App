import sunnyIcon from '../../assets/icon-sunny.webp'
import partlyCloudyIcon from '../../assets/icon-partly-cloudy.webp';
import overcastIcon from '../../assets/icon-overcast.webp';
import fogIcon from '../../assets/icon-fog.webp';
import drizzleIcon from '../../assets/icon-drizzle.webp';
import rainIcon from '../../assets/icon-rain.webp';
import snowIcon from '../../assets/icon-snow.webp';
import stormIcon from '../../assets/icon-storm.webp';

export function WeatherCodeToIcon(code) {
  if ([0,1].includes(code)) return sunnyIcon;
  if ([2].includes(code)) return partlyCloudyIcon;
  if ([3].includes(code)) return overcastIcon;
  if ([45,48].includes(code)) return fogIcon;
  if ([51,53,55,56,57].includes(code)) return drizzleIcon;
  if ([61,63,65,66,80,81,82].includes(code)) return rainIcon;
  if ([71,73,75,77,85,86].includes(code)) return snowIcon;
  if ([95,96,99].includes(code)) return stormIcon;
  return sunnyIcon
} 