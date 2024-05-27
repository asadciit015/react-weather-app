import React, { useContext } from "react";
import Clock from "react-live-clock";
import { AppContext } from "../store/AppContext";

function TimeClock() {
  const { currentTimeZone } = useContext(AppContext);
  return (
    <Clock
      {...(currentTimeZone && { timezone: currentTimeZone })}
      format="hh:mm A"
      interval={1000}
      ticking={true}
      style={{
        fontFamily: "Poppins",
        fontWeight: 700,
        fontSize: 96,
        lineHeight: 1,
        margin: "4px 0",
      }}
    />
  );
}

export default TimeClock;
