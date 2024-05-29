import React, { useState, useEffect, createContext } from "react";
import {
  defaultWeatherData,
  searchByCoordinates,
  weatherForecastByCoordinates,
} from "../api/api";
import {
  isValidLocation,
  isValidWeather,
  isValidWeatherForecast,
  upsert,
} from "../helpers/helper";
import tzlookup from "tz-lookup";
import { toast } from "react-toastify";

const AppContext = createContext();

const defaultTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  } else {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDarkMode ? "dark" : "light";
  }
};

const defaultLocation = () => {
  const storedCurrentLocation = JSON.parse(
    localStorage.getItem("currentLocation") || "{}"
  );
  if (isValidLocation(storedCurrentLocation)) return storedCurrentLocation;
  else return defaultWeatherData.location;
};

const defaultCurrentWeather = () => {
  const storedCurrentWeather = JSON.parse(
    localStorage.getItem("currentWeather") || "{}"
  );
  if (isValidWeather(storedCurrentWeather)) return storedCurrentWeather;
  else return defaultWeatherData.current;
};

const defaultCurrentWeatherForecast = () => {
  const storedCurrentWeatherForecast = JSON.parse(
    localStorage.getItem("currentWeatherForecast") || "{}"
  );
  if (isValidWeatherForecast(storedCurrentWeatherForecast))
    return storedCurrentWeatherForecast;
  else return defaultWeatherData.forecast;
};

const defaultSearchedLocations = () => {
  const storedSearchedLocations = JSON.parse(
    localStorage.getItem("searchedLocations") || "[]"
  ).filter((sl) => isValidLocation(sl));
  if (storedSearchedLocations.length > 0) return storedSearchedLocations;
  else return [defaultLocation()];
};

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme());
  const [currentLocation, setCurrentLocation] = useState(defaultLocation());
  const [currentTimeZone, setTimeZone] = useState();
  const [currentWeather, setCurrentWeather] = useState(defaultCurrentWeather());
  const [currentWeatherForecast, setCurrentWeatherForecast] = useState(
    defaultCurrentWeatherForecast()
  ); //it will be of max 3 days
  const [searchedLocations, setSearchedLocations] = useState(
    defaultSearchedLocations()
  );
  const [loading, setLoading] = useState(false);

  const findSetLocation = (coords) => {
    setLoading("geolocation");
    searchByCoordinates(coords).then((foundLocations) => {
      const locations = foundLocations.map((l) => {
        return { selected: true, ...l };
      });
      setSearchedLocationsHandle(locations[0]);
      setCurrentLocationHandle(locations[0]);
      weatherForecastByCoordinates(coords).then((response) => {
        setCurrentWeatherHandle(response.current);
        setCurrentWeatherForecastHandle(response.forecast);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    });
  };

  const setSearchedLocationsHandle = (location) => {
    setSearchedLocations((prevSearchedLocations) => {
      var searchedLocationsToUpdate = prevSearchedLocations;
      searchedLocationsToUpdate.map((l) => {
        return { ...l, selected: l.id === location.id };
      });
      upsert(searchedLocationsToUpdate, location, "id", true);
      searchedLocationsToUpdate = searchedLocationsToUpdate.slice(0, 5); // keep last 5 searched locations
      localStorage.setItem(
        "searchedLocations",
        JSON.stringify(searchedLocationsToUpdate)
      );
      console.log("searchedLocations", searchedLocationsToUpdate);
      return searchedLocationsToUpdate;
    });
  };

  const setCurrentLocationHandle = (curLoc) => {
    localStorage.setItem("currentLocation", JSON.stringify(curLoc));
    setCurrentLocation(curLoc);
    // console.table(curLoc);
  };

  const selectLocationHandle = (locationData) => {
    if (isValidLocation(locationData)) {
      setLoading("selectLocation");
      const newCurrentLocation = { ...locationData, selected: true };
      setSearchedLocationsHandle(newCurrentLocation);
      setCurrentLocationHandle(newCurrentLocation);
      weatherForecastByCoordinates({
        lat: newCurrentLocation.lat,
        lon: newCurrentLocation.lon,
      }).then((response) => {
        setCurrentWeatherHandle(response.current);
        setCurrentWeatherForecastHandle(response.forecast);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    } else
      toast.error(
        "[selectLocationHandle] Invalid location provided: ",
        locationData
      );
  };

  const setCurrentWeatherHandle = (curWeather) => {
    localStorage.setItem("currentWeather", JSON.stringify(curWeather));
    setCurrentWeather(curWeather);
  };

  const setCurrentWeatherForecastHandle = (curWeatherForecast) => {
    localStorage.setItem(
      "currentWeatherForecast",
      JSON.stringify(curWeatherForecast)
    );
    setCurrentWeatherForecast(curWeatherForecast);
  };

  const setMyGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const coords = {
            lat: latitude,
            lon: longitude,
          };
          findSetLocation(coords);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED)
            toast.error("Location service not enabled.");
          console.log(error);
        }
      );
    } else toast.error("Geolocation is not supported by this browser.");
  };

  const updateTheme = (newTheme) => {
    if (newTheme === "dark" || newTheme === "light") {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  const switchTheme = () => updateTheme(theme === "dark" ? "light" : "dark");

  const getTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      updateTheme(storedTheme);
    } else {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      updateTheme(prefersDarkMode ? "dark" : "light");
    }
  };

  useEffect(() => {
    getTheme();
    const storedCurrentLocation = JSON.parse(
      localStorage.getItem("currentLocation") || "{}"
    );
    if (!isValidLocation(storedCurrentLocation)) setMyGeoLocation();

    // const storedSearchedLocations = JSON.parse(
    //   localStorage.getItem("searchedLocations") || "[]"
    // ).filter((sl) => isValidLocation(sl));
    // if (storedSearchedLocations.length === 0)
    //   setSearchedLocationsHandle(defaultSearchedLocations());
  }, []);

  useEffect(() => {
    if (currentLocation.lat && currentLocation.lon) {
      setTimeZone(tzlookup(currentLocation.lat, currentLocation.lon));
    }
  }, [
    currentLocation && currentLocation.lat,
    currentLocation && currentLocation.lon,
  ]);

  return (
    <AppContext.Provider
      value={{
        // theme context
        theme,
        switchTheme,
        // location context
        searchedLocations,
        loading: loading,
        currentLocation: currentLocation,
        setCurrentLocation: setCurrentLocationHandle,
        setMyGeoLocation: setMyGeoLocation,
        selectLocationHandle: selectLocationHandle,
        // time context
        currentTimeZone: currentTimeZone,
        currentWeather: currentWeather,
        currentWeatherForecast: currentWeatherForecast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
