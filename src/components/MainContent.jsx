import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Divider, Stack } from "@mui/material";
import Prayer from "./Prayer";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

export default function MainContent() {
  const url = "https://api.aladhan.com/v1/timingsByCity?country=MA&city=";
  const [time, setTime] = useState("");
  const [city, setCity] = useState("Fes");
  const [gDate, setGDate] = useState("00-00-0000");
  const [hijriDate, setHijriDate] = useState({
    date: "",
    day: "",
    month: {
      en: "",
      ar: "",
    },
    year: "",
  });
  const [timings, setTimings] = useState({
    Fajr: "00:00",
    Dhuhr: "00:00",
    Asr: "00:00",
    Maghrib: "00:00",
    Isha: "00:00",
  });

  const cities = {
    Casablanca: "الدار البيضاء",
    Rabat: "الرباط",
    Marrakech: "مراكش",
    Fes: "فاس",
    Tangier: "طنجة",
    Agadir: "أكادير",
    Meknes: "مكناس",
    Oujda: "وجدة",
    Tetouan: "تطوان",
    Essaouira: "الصويرة",
  };

  function getFullDate() {
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    month = month + 1;
    let day = d.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return  year+ "-" + month + "-" +day ;
  }

  const [date, setDate] = useState((getFullDate()));

  setInterval(() => {
    const d = new Date();
    let hour = d.getHours();
    if (hour < 10) {
      hour = "0" + hour;
    }
    let minutes = d.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    setTime(hour + ":" + minutes);
  }, 1000);

  function requestDate() {
    
  }

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get("https://api.aladhan.com/v1/timingsByCity/"+date+"?country=MA&city=" + city);
      console.log("https://api.aladhan.com/v1/timingsByCity/"+date+"?country=MA&city=" + city)
      setTimings(response.data.data.timings);
      setGDate(response.data.data.date.gregorian.date);
      setHijriDate(response.data.data.date.hijri);
      console.log(response);
    }
    fetchData();
  }, [city, date]);

  const x = {
    date: "18-09-1446",
    day: "18",
    month: {
      en: "Ramaḍān",
      ar: "رَمَضان",
    },
    year: "1446",
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      {/* ***************************** */}
      <Grid container style={{}}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <h2 style={{ width: "100%" }}>
              {gDate}{" "}
              <span style={{ marginRight: "20px", fontSize: "20px" }}>
                {time}
              </span>{" "}
            </h2>
            <h1> {cities[city]} </h1>
            <h2 style={{ marginTop: "50px", margin: "50px" }}>
              {" "}
              {hijriDate.day} {hijriDate.month.ar} {hijriDate.year}{" "}
            </h2>
          </div>
        </Grid>

        <Grid size={{ xs: 8, lg: 4 }}>
          <div>
            <h2> متبقي حتى صلاة الظهر</h2>
            <h1> 02:32:22 </h1>
          </div>
        </Grid>

        <Grid size={{ xs: 4, lg: 4 }}>
          <Box sx={{ minWidth: 320 }}>
            <input type="date" name="date" id="date" min="2025-01-01" max="2025-12-31" value={date} onChange={(newValue) => {
                      setDate(newValue.$y );

                      console.log(newValue);
                      console.log(date);
                    }} />
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateCalendar"]}>
                <DemoItem label="">
                  <DateCalendar
                    // value={date}
                    onChange={(newValue) => {
                      setDate((newValue.$D > 9 ? newValue.$D : "0" +newValue.$D) +
                      "-" +
                      (newValue.$M + 1 > 9 ? newValue.$M + 1 : "0"+(newValue.$M + 1)) +
                      "-" +
                      newValue.$y);

                      console.log(newValue);
                      console.log(date);
                    }}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider> */}

            <FormControl sx={{ m: 2, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={city}
                label="Age"
                onChange={handleCityChange}
              >
                <MenuItem value={"Casablanca"}>الدار البيضاء</MenuItem>
                <MenuItem value={"Rabat"}>الرباط</MenuItem>
                <MenuItem value={"Marrakech"}>مراكش</MenuItem>
                <MenuItem value={"Fes"}>فاس</MenuItem>
                <MenuItem value={"Tangier"}>طنجة</MenuItem>
                <MenuItem value={"Agadir"}>أكادير</MenuItem>
                <MenuItem value={"Meknes"}>مكناس</MenuItem>
                <MenuItem value={"Oujda"}>وجدة</MenuItem>
                <MenuItem value={"Tetouan"}>تطوان</MenuItem>
                <MenuItem value={"Essaouira"}>الصويرة</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      {/* ***************************** */}

      <Divider />

      {/* ***************************** */}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        useFlexGap
        flexWrap={"wrap"}
        justifyContent={"center"}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        style={{ marginTop: "30px" }}
      >
        <Prayer
          salatName="الفجر"
          salatTime={timings.Fajr}
          salatImg="fajr.jpg"
        />
        <Prayer
          salatName="الظهر"
          salatTime={timings.Dhuhr}
          salatImg="dhuhr.jpg"
        />
        <Prayer salatName="العصر" salatTime={timings.Asr} salatImg="asr.jpg" />
        <Prayer
          salatName="المغرب"
          salatTime={timings.Maghrib}
          salatImg="sunset.png"
        />
        <Prayer
          salatName="العشاء"
          salatTime={timings.Isha}
          salatImg="fajr.jpg"
        />
      </Stack>

      {/* ***************************** */}
      <Stack></Stack>
    </>
  );
}
