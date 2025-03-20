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
import moment from "moment";

export default function MainContent() {
  const [time, setTime] = useState("");
  const [city, setCity] = useState("Fes");
  const [gDate, setGDate] = useState("00-00-0000");
  const [nextPrayer, setNextPrayer] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    hours: "0",
    minutes: "0",
    seconds: "0",
  })
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

  const prayers = {
    Fajr: "الفجر",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء",
  }

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


  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));


  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("HH:mm"));
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  


  useEffect(() => {
    async function fetchData() {
      try {
        let response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity/${moment(date).format("YYYY-MM-DD")}?country=MA&city=${city}`
        );
    
        setTimings(response.data.data.timings);
        setGDate(response.data.data.date.gregorian.date);
        setHijriDate(response.data.data.date.hijri);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    }
    
    fetchData();
  }, [city, date]);

  useEffect(() => {
    const interval = setInterval(() => {
      countDownTimer()
      
    }, 1000);
    return () => clearInterval(interval);
  }, [time, timings]);


   const countDownTimer = () => {
    const now = moment();
    const fajrMoment = moment(timings.Fajr, "HH:mm");
    const dhuhrMoment = moment(timings.Dhuhr, "HH:mm");
    const asrMoment = moment(timings.Asr, "HH:mm");
    const maghribMoment = moment(timings.Maghrib, "HH:mm");
    const ishaMoment = moment(timings.Isha, "HH:mm");
    if (now.isAfter(fajrMoment) && now.isBefore(dhuhrMoment)){
      setNextPrayer("Dhuhr");
    }
    else if (now.isAfter(dhuhrMoment) && now.isBefore(asrMoment)){
      setNextPrayer("Asr")
    }
    else if (now.isAfter(asrMoment) && now.isBefore(maghribMoment)){
      setNextPrayer("Maghrib")
    }
    else if (now.isAfter(maghribMoment) && now.isBefore(ishaMoment)){
      setNextPrayer("Isha")
    }
    else if (now.isAfter(ishaMoment)){
      setNextPrayer("Fajr")
    }


   }
    
   useEffect(()=>{
    const interval = setInterval(() => {
    const now = moment();
    let nextPrayerTime = moment(timings[nextPrayer], "HH:mm");
    if (nextPrayer == "Fajr"){
      nextPrayerTime.add(1, "day");
    }
    const remainingTime = moment.duration(nextPrayerTime.diff(now));
    if (!isNaN(remainingTime.hours())){
      setTimeLeft({
        hours: remainingTime.hours(),
        minutes: remainingTime.minutes(),
        seconds: remainingTime.seconds(),
    });
    }
      
    }, 1000);
    return () => clearInterval(interval);
   }, [time])


  
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div style={{width: "90%",}}>
      {/* ***************************** */}
      <Grid container style={{width: "80%", backgroundColor: "white", margin: "auto", }}>
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
            <h2> متبقي حتى صلاة {prayers[nextPrayer]} </h2>
            <h1> {`${timeLeft.hours > 9 ? timeLeft.hours : "0"+timeLeft.hours}:${timeLeft.minutes > 9 ? timeLeft.minutes : "0"+timeLeft.minutes}:${timeLeft.seconds > 9 ? timeLeft.seconds : "0"+timeLeft.seconds}`} </h1>
          </div>
        </Grid>

        <Grid size={{ xs: 4, lg: 4 }}>
          <Box sx={{ minWidth: 320 }}>
            <input type="date" name="date" id="date" min="2025-01-01" max="2025-12-31" value={date} onChange={(e) => {
              setDate(e.target.value );
              console.log(e.target.value)
                    }} />

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
          salatImg="maghrib.jpg"
        />
        <Prayer
          salatName="العشاء"
          salatTime={timings.Isha}
          salatImg="isha.jpg"
        />
      </Stack>

      {/* ***************************** */}
      
    </div>
  );
}
