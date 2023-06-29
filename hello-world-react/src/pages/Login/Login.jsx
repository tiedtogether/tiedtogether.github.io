import { Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Background from '../../components/Background/Background'
import { Link, useNavigate } from 'react-router-dom'
import YellowButton from '../../components/YellowButton/YellowButton'
import api from '../../api/axiosConfig'
import NavBar from '../../components/NavBar/NavBar'
import BackButton from '../../components/BackButton/BackButton'

const Login = () => {

  const [collectedData, setCollectedData] = useState({"id": "", "password": ""});
  const [errorMessage, setErrorMessage] = useState('');

  const onDataCollected = (event) => {
    setCollectedData({...collectedData, [event.target.name]: event.target.value});
  }

  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await api.get('/api/v1/tutors/all');
        setTutors(res.data);
      } catch (e) {
        setErrorMessage("A server error occured. Please try again later!");
        console.log(e);
      }
    }
    getData();
  }, []);

  const navigate = useNavigate();

  return (
    <Background>
      <NavBar />
      <BackButton />
      <Stack spacing={3} className="stack" sx={{margin: 0, padding: '20vmin'}}>
        <Typography variant="h4" color="initial" sx={{fontWeight: "bold"}}>
          TUTOR SIGN IN
        </Typography>
        <TextField
          name="id"
          label="Katy ISD ID"
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



        <YellowButton onClick={() => {

          // filled out verification
          if ([
            collectedData.id,
            collectedData.password
          ].includes("")) {
            setErrorMessage("Form Contains Empty Fields!");
            return;
          }

          try {
            let loggedIn = false;
            let userId, userPassword;
            tutors.forEach((tutor) => {
              if (tutor.kisdID == collectedData.id && tutor.password == collectedData.password) {
                loggedIn = true;
                userId = tutor.kisdID;
                userPassword = tutor.password;
              }
            });
            if (loggedIn) {
              setErrorMessage("");
              navigate(`/hello-world-app/dashboard`, {state: {id: userId, password: userPassword}});
            } else {
              setErrorMessage("Username or Password Incorrect.");
              return;
            }
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

export default Login