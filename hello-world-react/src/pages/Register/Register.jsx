import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import { Stack, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import Background from '../../components/Background/Background';
import YellowButton from '../../components/YellowButton/YellowButton';
import api from '../../api/axiosConfig';
import useEffectAfterMount from '../../hooks/useEffectAfterMount';
import NavBar from '../../components/NavBar/NavBar';
import BackButton from '../../components/BackButton/BackButton';

// TODO:

// better domain, make sure 404 works
// no duplicate students: check id, email, phone number
// better onboarding page
// change settings
// sign in for students, so they too can disconnect from lessons

const Register = ({ isStudent }) => {

  const instruments = [
    "Flute",
    "Clarinet",
    "Bass Clarinet",
    "Alto Saxophone",
    "Tenor Saxophone",
    "Bassoon",
    "Oboe",
    "Trumpet",
    "Trombone",
    "French Horn",
    "Baritone/Euphonium",
    "Tuba",
    "Percussion"
  ];

  const learningGrades = ["6", "7", "8"];
  const teachingGrades = ["9", "10", "11", "12"];
  
  const learningBands = [
    "Beginner",
    "Lyric",
    "Concert",
    "Symphonic"
  ];
  const teachingBands = [
    "Concert II",
    "Concert I",
    "Symphonic Band",
    "Wind Symphony"
  ];

  const settingPreferences = ["No Preference", "In-Person", "Virtual"];
  const studentCommunicationPreferences = ["No Preference", "Phone", "Email"];
  const noYes = ["No", "Yes"];

  const navigate = useNavigate();

  // const [students, setStudents] = useState();

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const res = await api.get('/api/v1/students/all');
  //       setStudents(res.data);
  //     } catch (e) {
  //       setErrorMessage("A server error occured. Please try again later!");
  //       console.log(e);
  //     }
  //   }
  //   getData();
  // }, []);

  const [collectedData, setCollectedData] = useState({
    firstName: "",
    lastName: "",
    id: "",
    email: "",
    phone: "",    
    password: "",
    confirmPassword: "",
    ...(isStudent ? {
      learningGrade: learningGrades[0],
      learningBand: learningBands[0],
      learningInstrument: instruments[0],
      studentSettingPreference: settingPreferences[0],
      studentCommunicationPreference: studentCommunicationPreferences[0],
      privateLessons: noYes[0]
    } : {
      teachingGrade: teachingGrades[0],
      teachingBand: teachingBands[0],
      teachingInstrument: instruments[0],
      tutorSettingPreference: settingPreferences[0]
    })
  });

  const onDataCollected = (event) => {
    setCollectedData({...collectedData, [event.target.name]: event.target.value});
  }

  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Background style={{position: "relative"}}>
      <NavBar />
      <BackButton />
      <Stack spacing={3} className="stack" sx={{margin: 0, padding: '20vmin'}}>
        <Typography variant="h4" color="initial" sx={{fontWeight: "bold"}}>
          SIGN UP AS A {isStudent ? "STUDENT" : "TUTOR"}
        </Typography>
        <TextField
          name="firstName"
          label="First Name"
          variant="outlined"
          onChange={onDataCollected}
        />
        <TextField
          name="lastName"
          label="Last Name"
          variant="outlined"
          onChange={onDataCollected}
        />
        <TextField
          name="id"
          label="Katy ISD ID"
          variant="outlined"
          onChange={onDataCollected}
        />
        <TextField
          name="email"
          label="Email Address"
          variant="outlined"
          onChange={onDataCollected}
        />
        <TextField
          name="phone"
          label="Phone Number"
          variant="outlined"
          onChange={onDataCollected}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          onChange={onDataCollected}
        />
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          onChange={onDataCollected}
        />

        {isStudent ?

        <Stack spacing={3} className="stack">
          <TextField
            name="learningGrade"
            label="Grade"
            variant="outlined"
            defaultValue={learningGrades[0]}
            select
            onChange={onDataCollected}
          >
            {
              learningGrades.map((grade) => (
                <MenuItem key={grade} value={grade}>{grade}</MenuItem>
              ))
            }
          </TextField>
          <TextField
            name="learningBand"
            label="What band are you in?"
            variant="outlined"
            defaultValue={learningBands[0]}
            select
            onChange={onDataCollected}
          >
            {
              learningBands.map((band) => (
                <MenuItem key={band} value={band}>{band}</MenuItem>
              ))
            }
          </TextField>
          <TextField
            name="learningInstrument"
            label="What instrument are you learning?"
            variant="outlined"
            defaultValue={instruments[0]}
            select
            onChange={onDataCollected}
          >
            {
              instruments.map((instrument) => (
                <MenuItem key={instrument} value={instrument}>{instrument}</MenuItem>
              ))
            }
          </TextField>
          <TextField
            name="studentSettingPreference"
            label="Would you like in-person or virtual lessons?"
            variant="outlined"
            defaultValue={settingPreferences[0]}
            select
            onChange={onDataCollected}
          >
            {
              settingPreferences.map((choice) => (
                <MenuItem key={choice} value={choice}>{choice}</MenuItem>
              ))
            }
          </TextField>
          <TextField
            name="studentCommunicationPreference"
            label="Would you like to be contacted via phone or email?"
            variant="outlined"
            defaultValue={studentCommunicationPreferences[0]}
            select
            onChange={onDataCollected}
          >
            {
              studentCommunicationPreferences.map((choice) => (
                <MenuItem key={choice} value={choice}>{choice}</MenuItem>
              ))
            }
          </TextField>
          <TextField
            name="privateLessons"
            label="Are you currently registered in paid private lessons?"
            variant="outlined"
            defaultValue={noYes[0]}
            select
            onChange={onDataCollected}
          >
            {
              noYes.map((choice) => (
                <MenuItem key={choice} value={choice}>{choice}</MenuItem>
              ))
            }
          </TextField>
        </Stack>

        :

        <Stack spacing={3} className="stack">
          <TextField
            name="teachingGrade"
            label="Grade"
            variant="outlined"
            defaultValue={teachingGrades[0]}
            select
            onChange={onDataCollected}
          >
            {
              teachingGrades.map((grade) => (
                <MenuItem key={grade} value={grade}>{grade}</MenuItem>
              ))
            }
          </TextField>
          <TextField
            name="teachingBand"
            label="What band are you in?"
            variant="outlined"
            defaultValue={teachingBands[0]}
            select
            onChange={onDataCollected}
          >
            {
              teachingBands.map((band) => (
                <MenuItem key={band} value={band}>{band}</MenuItem>
              ))
            }
          </TextField>
          <TextField
            name="teachingInstrument"
            label="What instrument would you like to teach?"
            variant="outlined"
            defaultValue={instruments[0]}
            select
            onChange={onDataCollected}
          >
            {
              instruments.map((instrument) => (
                <MenuItem key={instrument} value={instrument}>{instrument}</MenuItem>
              ))
            }
          </TextField>
          {/* <FormControl>
            <InputLabel id="demo-simple-select-label">What distinctions do you have?</InputLabel>
            <Select
              name="distinctions"
              label="What distinctions do you have?"
              variant="outlined"
              defaultValue={["None"]}
              multiple
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: 'lightblue',
                    '& .MuiMenuItem-root': {
                        backgroundColor: 'white'
                    },
                    '& .MuiMenuItem-root:hover': {
                        backgroundColor: 'lightgrey'
                    },
                    // for some reason this doesnt work:
                    // '& .Mui-selected': {
                    //   backgroundColor: 'red'
                    // }
                  }
                },
              }}
              onChange={onDataCollected}
            >
              {
                [
                  "None",
                  "TMEA Freshman Region Band",
                  "TMEA Region Symphonic Band",
                  "TMEA Region Wind Ensemble/Area Qualified",
                  "TMEA All-State Band",
                  "UIL Class 1 solo: Division 1 Rating",
                  "UIL Class 1 ensemble: Division 1 Rating"
                ].map((distinction) => (
                  <MenuItem key={distinction} value={distinction}>{distinction}</MenuItem>
                ))
              }
            </Select>
          </FormControl> */}
          <TextField
            name="tutorSettingPreference"
            label="Would you like to instruct in-person or virtually?"
            variant="outlined"
            defaultValue={settingPreferences[0]}
            select
            onChange={onDataCollected}
          >
            {
              settingPreferences.map((choice) => (
                <MenuItem key={choice} value={choice}>{choice}</MenuItem>
              ))
            }
          </TextField>
        </Stack>

        }

        <YellowButton onClick={() => {

          // filled out verification
          if ([
            collectedData.firstName,
            collectedData.lastName,
            collectedData.id,
            collectedData.email,
            collectedData.phone,
            collectedData.password,
            collectedData.confirmPassword
          ].includes("")) {
            setErrorMessage("Form Contains Empty Fields!");
            return;
          }

          // check password and confirm password match
          if (collectedData.password != collectedData.confirmPassword) {
            setErrorMessage("Password and Confirm Password Do Not Match!");
            return;
          }

          // phone number verification
          if (collectedData.phone.length != 10 || !/^[0-9]+$/.test(collectedData.phone)) {
            setErrorMessage("Phone Number is invalid!");
            return;
          }

          // id veritifcation
          // check length
          if (collectedData.id.length > 8) {
            setErrorMessage("Katy ISD ID is invalid!");
            return;
          }
          // check if first char is letter
          if (!/^[a-zA-Z]/.test(collectedData.id.charAt(0))) {
            setErrorMessage("Katy ISD ID is invalid!");
            return;
          }
          // convert first letter to uppercase if it is lowercase
          const firstChar = collectedData.id.charAt(0);
          const firstCharUpper = firstChar.toUpperCase();
          const newID = firstCharUpper + collectedData.id.slice(1);
          // check if the last 7 characters are all numbers
          if (!/^\d{7}$/.test(newID.slice(1))) {
            setErrorMessage("Katy ISD ID is invalid!");
            return;
          }

          try {
            if (isStudent) {
              api.post('/api/v1/students/newStudent', {
                band: collectedData.learningBand,
                firstName: collectedData.firstName,
                lastName: collectedData.lastName,
                phoneNumber: collectedData.phone,
                instrument: collectedData.learningInstrument,
                kisdID: newID,
                password: collectedData.password,
                settingPreference: collectedData.studentSettingPreference,
                communicationPreference: collectedData.studentCommunicationPreference,
                email: collectedData.email,
                currentlyInLessons: collectedData.privateLessons == 'Yes' ? true : false,
                grade: collectedData.learningGrade,
                currentTutor: null
              });
              navigate('/hello-world-app/thanks');
            } else {
              api.post('/api/v1/tutors/newTutor', {
                band: collectedData.teachingBand,
                firstName: collectedData.firstName,
                lastName: collectedData.lastName,
                phoneNumber: collectedData.phone,
                instrument: collectedData.teachingInstrument,
                kisdID: newID,
                password: collectedData.password,
                settingPreference: collectedData.tutorSettingPreference,
                email: collectedData.email,
                grade: collectedData.teachingGrade,
                scheduledStudents: []
              });
              navigate('/hello-world-app/dashboard', {state: {id: newID, password: collectedData.password}});
            }
            setErrorMessage("");
          } catch (e) {
            setErrorMessage("A server error occured. Please try again later!");
            console.log(e.message);
          }

        }}>Submit</YellowButton>

        <Typography variant="subtitle1" sx={{color: 'red'}}>{errorMessage}</Typography>

      </Stack>
    </Background>
  )
}

export default Register