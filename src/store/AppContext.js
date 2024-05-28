import React, { useState, useEffect, createContext } from "react";
import { searchByCoordinates } from "../api/api";
import { isValidLocation, upsert } from "../helpers/helper";
import tzlookup from "tz-lookup";
import { toast } from "react-toastify";

const AppContext = createContext();

const defaultTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  } else {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
      .matches;
    return prefersDarkMode ? "dark" : "light";
  }
};

const defaultLocation = () => {
  const storedCurrentLocation = JSON.parse(
    localStorage.getItem("currentLocation") || "{}"
  );
  if (isValidLocation(storedCurrentLocation)) return storedCurrentLocation;
  else
    return {
      id: 1913296,
      name: "Lahore",
      region: "Punjab",
      country: "Pakistan",
      lat: 31.57,
      lon: 74.29,
      url: "lahore-punjab-pakistan",
      selected: true,
    };
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
  const [searchedLocations, setSearchedLocations] = useState(
    defaultSearchedLocations()
  );

  const findSetLocation = (coords) => {
    searchByCoordinates(coords).then((foundLocations) => {
      const locations = foundLocations.map((l) => {
        return { selected: true, ...l };
      });
      setSearchedLocationsHandle(locations[0]);
      setCurrentLocationHandle(locations[0]);
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
      const newCurrentLocation = { ...locationData, selected: true };
      setSearchedLocationsHandle(newCurrentLocation);
      setCurrentLocationHandle(newCurrentLocation);
    } else
      toast.error(
        "[selectLocationHandle] Invalid location provided: ",
        locationData
      );
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
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches;
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
        currentLocation: currentLocation,
        setCurrentLocation: setCurrentLocationHandle,
        setMyGeoLocation: setMyGeoLocation,
        selectLocationHandle: selectLocationHandle,
        // time context
        currentTimeZone: currentTimeZone,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
