import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ThemeSwitcher from "./ThemeSwitcher";
import SearchBar from "./SearchBar";
import MyLocationIcon from "@mui/icons-material/MyLocation";

import { AppContext } from "../store/AppContext";

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  "& > :not(style)": {
    marginRight: "4em",
    marginBottom: theme.spacing(2),
    flexShrink: 0,
  },
  paddingLeft: 60,
  paddingTop: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    paddingLeft: 40,
    "& > :not(style)": {
      marginBottom: theme.spacing(2),
    },
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 20,
    "& > :not(style)": {
      marginBottom: theme.spacing(2),
    },
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  transition: theme.transitions.create("width"),
  width: "54ch",
  [theme.breakpoints.down("md")]: {
    width: "95%",
  },
}));

const LocationContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "95%",
  },
}));

const LocationButton = styled(Button)(({ theme }) => ({
  height: 60,
  borderRadius: 12,
  minWidth: 292,
  fontSize: 18,
  boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.25)",
  textTransform: "none",
  color: theme.palette.mode === "light" ? "#292929" : "#FFFFFF",
  background:
    theme.palette.mode === "light"
      ? "#D9D9D9"
      : "drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.5))",
  "&:hover": {
    background:
      theme.palette.mode === "light"
        ? "#D9D9D980"
        : "drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.4))",
  },
}));

export default function Header() {
  const { loading, setMyGeoLocation } = useContext(AppContext);

  return (
    <HeaderContainer component={"header"}>
      <ThemeSwitcher />
      <SearchContainer>
        <SearchBar />
      </SearchContainer>

      <LocationContainer>
        <LocationButton
          color="primary"
          fullWidth
          variant="outlined"
          startIcon={
            <MyLocationIcon
              sx={{ width: "3em", height: "1.5em", color: "#fdb441" }}
            />
          }
          onClick={setMyGeoLocation}
          disabled={!!loading}
        >
          Current Location
        </LocationButton>
      </LocationContainer>
    </HeaderContainer>
  );
}
