import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { debounce } from "@mui/material/utils";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

import { AppContext } from "../store/AppContext";
import { searchLocation } from "../api/api";
import { upsert } from "../helpers/helper";

const SearchIcon = (props) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <rect width="30" height="36" fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_17_128"
            transform="matrix(0.0212766 0 0 0.0185014 0 -0.00878816)"
          />
        </pattern>
        <image
          id="image0_17_128"
          width="47"
          height="55"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAA3CAYAAACcohNaAAAAAXNSR0IArs4c6QAABQBJREFUaEPVWr9vHEUUnnl7bmhwKpcEiSYVZ5ECGnAqKoj/AFBMgVzGiILGt/t2T7boYiRKCiNSUhioUUIDAhFhVynjVIiKuIksfPsGfavd093czOzens++G+lkybsz97037+f3TqsZFzPfFJG7nU6nKyI3y+O6RLQqIi+UUsf4HxGdDgaDYyL6gZlPZ/zaYrtucwgAE9F9Edkkogpw46NE5JSIjkTkq1kEmQp8CTpRSm01Rlr/4qGIpG2EaASemVejKLpvjOF6LNO/AfOKouggz3PcBEyt0aoFD+BKqUdE1G104gwviQj8405TAYLgkyTpaq0BHAKE1olSCtdfOCecFABKwQuhS+Fhbm+GDsItGGPupGlaneV93Qs+y7ItEXkQAH6mlGIROWyqKaCAQEQEIWCCr7qQQQAi+iyO48OQoE7wNRo/M8Yc4DMNaBsEhNBa7+DjEqLJDUyAL6/6mUfjZ3mebzS50qamD0VFUfTYJ4BS6nWfksbA1zjniYhszKJtn0ClKUGACX8IOfEY+DRNWWuNOG6vkziO5xptQgIYY9IkSSbC9BB8mYCeOYA/F5HuPDTu8gOUEbYJlWXGup3IRsEfEtE968BLt/E6X/D5gIh8y8xjmb0A79O677rqAMz63Ge+IgLnHRZ1FfgDFFq21lElXoW5TGE+KB8QWotVgUdotKtDJImDWbXYdn+WZQD5YHQ/Ig8zrw/B+0xGRG5ch9YrYGX0+dcWftR0tEtCpdTcQ2OTG8myDPWNHfuHFqGZ2RVlrtVkKsE8pjOMOjpJksdRFL1n2RbKUmS8a13MvEFEj0ZB5Hn+S5qmG4XDLjX4LMuMwymu1VlDTotsy8w3Cs27wMdxXNthXZU9hfAtNHhPuDyL47jo7Jbb5pfaYZn5iIjuWja8HHG+SQ1xVc7pKND+clAuYxkW1N1EE7IUtQ2kzbIMNfJri2Q6TWoubz1ftl7ezn2epuRjMEpidqKed5rOUnRS0KKrumxC/Fz2DfgIL28PW4KH9lE/j1FwV2k+AcLrrGQwxoYSjXibadnbNrcRIrxqeZtS+yBBp2au2oAd3dOWqXNylS7iB182Dx+oI3VDDIaXJQ6Rn22mGI7sWUxb8jzfaUvqBvl5pRSoDy+HLiJMROgpG49iYCIico+IsHc4tBCRQj4iwh9w/zut+PlKSyH62ep5jzFk6HQ6xTRDRE6qyQgRFd3/YDDAeHOryXjo4uLi036//02dL9V2TCH2tu7wuufQdqlp+9V/zs/P1/f39/8OnVELvopCoSlGHcjQ84AAT9bW1t7Z3t6+8O1vBL7aDHYNydjBJrfGLyIPlVJvE9Eb9iF2LWM/nwq8JQSixKajGm0iCKYsyCeYa532+/1beZ7/6oo6g8HgwyzLfnId2gq8lWBQVmwifRtjCrI2iiJMURClwO8XTqy1xsgejn3kmnbHcfxBp9P50aH9F/hdw+7u7vNL0XwT1bZ5J03TL7XWXzj2PhGRd5n55eizmTXfBqRvDzMjyP9MRAWdN7qCVeVlgpjlrL29vbU8z3/3+NIno4lroTRfCd3r9d5aWVn5TSm1Yinipdb6dq/Xe1r40SxamudeTw+Lr3wqIrdh/wsLHiiZ+Tsi+shh/w+Z+eNFB/8KEf2plLo1KoAx5g9jzPsLDR6A7QQmIl8bYz5P0/S/hQcPAcoEht/zbDPz99UtLAX40v5X7b7hf4HOQPVQhLfOAAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
};

const SearchAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    border: `1px solid ${theme.palette.mode === "light" ? "#000" : "#eaecef"}`,
    borderRadius: "0",
  },
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.mode === "light" ? "#000" : "#eaecef"}`,
    // boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.25)",
  },
}));

const SearchTextField = styled(TextField)(({ theme }) => ({
  // borderRadius: 40,
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: theme.palette.mode === "light" ? "#D9D9D9" : "#444",
    border: "none",
    fontSize: 18,
  },
}));

const locationSearchHandle = debounce((input, callback) => {
  console.log(`search for: ${input}`);
  const results = searchLocation(input);
  callback(results);
}, 400);

const getOptionLabel = (option) =>
  option && option.name && option.country
    ? `${option.name}, ${option.country}`
    : "";

export default function SearchBar() {
  const {
    updateCurrentLocation,
    currentLocation,
    setCurrentLocation,
    searchedLocations,
  } = useContext(AppContext);

  // const [inputValue, setInputValue] = useState(getOptionLabel(currentLocation));
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(searchedLocations);
  const [fetching, setFetching] = useState(false);

  // useEffect(() => {
  //   setInputValue(getOptionLabel(currentLocation));
  // }, [currentLocation]);

  return (
    <SearchAutocomplete
      id="custom-location-search"
      // sx={{ maxWidth: 900 }}
      getOptionLabel={(option) => {
        // console.log("[getOptionLabel] => options:", options);
        return typeof option === "string" ? option : getOptionLabel(option);
      }}
      options={options}
      autoComplete
      // openOnFocus
      disableClearable
      includeInputInList
      //   filterSelectedOptions
      fullWidth
      loading={fetching}
      value={inputValue}
      loadingText={"Searching for locations ..."}
      // noOptionsText="No matcing locations found. Try any other query."
      // isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(event, value, reason, details) => {
        let newOptions = options;
        console.log(
          `[onChange] => value: "${value}", reason: "${reason}", options: ${options}`
        );
        !!value && upsert(newOptions, value, "id");
        upsert(newOptions, currentLocation, "id");
        setCurrentLocation(value);
        setOptions(newOptions);
        updateCurrentLocation(value);
        setTimeout(() => {
          setInputValue("");
        }, 500);
      }}
      onInputChange={(event, value, reason) => {
        if (value === inputValue) return;
        console.log(
          `[onInputChange] => value: "${value}", reason: "${reason}"`
        );
        setInputValue(value);
        // if (reason === "clear") setCurrentLocation();
        // else if (!!value.trim() === false ) {
        //   setOptions(searchedLocations);
        // } else {
        setFetching(true);
        locationSearchHandle(inputValue, (results) => {
          results.then((foundOptions) => {
            console.log("foundOptions: ", foundOptions);
            setOptions(foundOptions);
            setFetching(false);
          });
        });
        // }
      }}
      renderInput={(params) => (
        <SearchTextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: <SearchIcon style={{ marginRight: 29 }} />,
          }}
          autoFocus
          placeholder="Address, City or Zip Code"
        />
      )}
      renderOption={(props, option) => {
        const matches = match(option.name, inputValue);
        const parts = parse(`${option.name}, ${option.country}`, matches);

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: "flex", width: 44 }}>
                <LocationOnIcon sx={{ color: "text.secondary" }} />
              </Grid>
              <Grid
                item
                sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.region}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
