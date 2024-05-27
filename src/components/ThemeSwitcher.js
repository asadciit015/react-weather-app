// src/ThemeSwitcher.js
import React, { useContext } from "react";
import { AppContext } from "../store/AppContext";

import { styled } from "@mui/material/styles";
import MuiSwitch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

const Switch = styled((props) => (
  <MuiSwitch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 99.01,
  // height: 37.985,
  borderRadius: 40,
  border: `1px solid ${theme.palette.mode === "dark" ? "#D9D9D9" : "#111"}`,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: "3px 6px",
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(56px)",
      color: "#111",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#D9D9D9" : "#111",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#D9D9D9",
      border: "6px solid #111",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    color: "#111",
    boxSizing: "border-box",
    width: 29.703,
    height: 29.516,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,

    backgroundColor: theme.palette.mode === "light" ? "#D9D9D9" : "#111",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const ThemeSwitcher = (props) => {
  const { theme, switchTheme } = useContext(AppContext);

  return (
    <FormControl
      sx={{
        cursor: "pointer",
      }}
      component="fieldset"
      variant="standard"
      onClick={switchTheme}
    >
      <Switch
        disableRipple
        disableTouchRipple
        disableFocusRipple
        checked={theme === "dark"}
        onChange={switchTheme}
      />
      <FormHelperText
        sx={{
          color: theme === "dark" ? "#FFF" : "#000",
          fontSize: 16,
          fontStyle: "normal",
          fontWeight: 800,
          lineHeight: 0,
          margin: "14px 8px",
          cursor: "pointer",
        }}
      >
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </FormHelperText>
    </FormControl>
  );
};

export default ThemeSwitcher;
