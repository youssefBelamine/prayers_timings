import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Divider, Stack } from '@mui/material';
import Prayer from './Prayer';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

export default function MainContent() {
  const url = "https://api.aladhan.com/v1/timingsByCity?country=MA&city=";
  const [age, setAge] = React.useState('');
  const [city, setCity] = useState("Fes");
  const [timings, setTimings] = useState({
    Fajr: "00:00",
    Dhuhr: "00:00",
    Asr: "00:00",
    Maghrib: "00:00",
    Isha: "00:00",
});

  useEffect(()=>{
    async function fetchData() {
      let response = await axios.get(url+city);
      setTimings(response.data.data.timings)
      console.log(response)
    }
    fetchData()
  }, [])

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
    <button onClick={() => console.log(timings)}>click</button>
    {/* ***************************** */}
    <Grid container style={{}}>
    <Grid size={{xs: 5}}>
    <div>
      <h2> سبتمبر 9 2023 | 4:20 </h2>
      <h1>مكة المكرمة</h1>
    </div>
    </Grid>

      <Grid size={{xs: 5}}>
    <div>
      <h2> متبقي حتى صلاة الظهر</h2>
      <h1> 02:32:22 </h1>
    </div>
      </Grid>

      <Grid size={{xs: 2}}>
      <Box sx={{ minWidth: 200 }}>
      <FormControl  sx={{ m: 2, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </Grid>
    </Grid>
    {/* ***************************** */}

    <Divider />

    {/* ***************************** */}

    <Stack 
    direction={{ xs: 'column', sm: 'row' }} 
    useFlexGap
    flexWrap={'wrap'}
    justifyContent={'center'}
    spacing={{ xs: 1, sm: 2, md: 4 }}
    style={{marginTop: '30px'}}
     >
      <Prayer salatName="الفجر" salatTime={timings.Fajr} salatImg="fajr.jpg" />
      <Prayer salatName="الظهر" salatTime={timings.Dhuhr} salatImg="dhuhr.jpg" />
      <Prayer salatName="العصر" salatTime={timings.Asr} salatImg="asr.jpg" />
      <Prayer salatName="المغرب" salatTime={timings.Maghrib} salatImg="fajr.jpg" />
      <Prayer salatName="العشاء" salatTime={timings.Isha} salatImg="fajr.jpg" />
    </Stack>

    {/* ***************************** */}
    <Stack>
    
    </Stack>

    </>
  )
}
