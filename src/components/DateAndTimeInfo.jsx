import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import TimeClock from "./TimeClock";
import { AppContext } from "../store/AppContext";

const WidgetContainer = styled(Box)(({ theme }) => ({
  //   marginLeft: 0,
  filter:
    theme.palette.mode === "light"
      ? "drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.50))"
      : "drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.5))",
  backgroundColor: theme.palette.mode === "light" ? "#D9D9D9" : "#444444",
  borderRadius: 30,
  minHeight: 306,
}));

const MainInfo = styled(Box)({
  textAlign: "center",
  padding: "24px 0 24px 0",
});

const City = styled(Typography)({
  fontFamily: "Poppins",
  fontWeight: 700,
  fontSize: "36px",
  lineHeight: 1.4,
  margin: "29px",
  textAlign: "center",
});

function DateAndTimeInfo() {
  const { currentLocation } = useContext(AppContext);
  return (
    <WidgetContainer>
      <MainInfo>
        <City color="primary">{`${currentLocation.name}, ${currentLocation.country}`}</City>
        <TimeClock />
      </MainInfo>
    </WidgetContainer>
  );
}

export default DateAndTimeInfo;
