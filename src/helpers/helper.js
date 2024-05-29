import moment from "moment-timezone";

const requiredWeatherKeys = [
  "last_updated_epoch",
  "last_updated",
  "temp_c",
  "temp_f",
  "is_day",
  "condition",
  "wind_mph",
  "wind_kph",
  "wind_degree",
  "wind_dir",
  "pressure_mb",
  "pressure_in",
  "precip_mm",
  "precip_in",
  "humidity",
  "cloud",
  "feelslike_c",
  "feelslike_f",
  "windchill_c",
  "windchill_f",
  "heatindex_c",
  "heatindex_f",
  "dewpoint_c",
  "dewpoint_f",
  "vis_km",
  "vis_miles",
  "uv",
  "gust_mph",
  "gust_kph",
];

const requiredWeatherForecastKeys = [
  "date",
  "date_epoch",
  "day",
  "astro",
  "hour",
];

export function upsert(array, targetObject, keyToMatch, unshiftObject = false) {
  const index = array.findIndex(
    (item) => item[keyToMatch] === targetObject[keyToMatch]
  );

  if (index === -1) {
    // The object is not present in the array, so add it.
    unshiftObject ? array.unshift(targetObject) : array.push(targetObject);
  } else {
    // The object is present in the array, so update it.
    array[index] = { ...array[index], ...targetObject };
  }
}

export function isValidLocation(location) {
  return (
    !!location &&
    !!location.id &&
    !!location.name &&
    !!location.country &&
    !!location.lat &&
    !!location.lon
  );
}

export function isValidWeather(weatherData) {
  return requiredWeatherKeys.every((key) => key in weatherData);
}

export function isValidWeatherForecast(weatherForecastData) {
  return (
    !!weatherForecastData.forecastday &&
    weatherForecastData.forecastday.every((forecastday) =>
      requiredWeatherForecastKeys.every((key) => key in forecastday)
    )
  );
}

export function getCurrentTime(timeZone) {
  return moment.tz(timeZone);
}

export function getCurrentDate(timeZone) {
  return moment.tz(timeZone).format("YYYY-MM-DD");
}

export function getTodayForecastweather(forecastData, timeZone) {
  const currentDate = getCurrentDate(timeZone);
  return forecastData.forecastday.find((f) => f.date === currentDate);
}
