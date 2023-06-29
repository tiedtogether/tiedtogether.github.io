import React, { useEffect, useState } from 'react'
import Background from '../../components/Background/Background'
import NavBar from '../../components/NavBar/NavBar'
import { Stack, Typography } from '@mui/material'
import YellowButton from '../../components/YellowButton/YellowButton'
import { useLocation, useNavigate } from 'react-router-dom'
import Authenticate from '../../components/Authenticate/Authenticate'
import TriggerOnRender from '../../components/TriggerOnRender/TriggerOnRender'

const ConnectConfirm = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [student, setStudent] = useState();

  function doStudent() {
    setStudent(location.state.student);
  }

  return (
    <>
      <Authenticate location={location}>
        <TriggerOnRender func={doStudent}>
          <Background style={{overflow: 'auto'}}>
            <NavBar showSignIn={false}/>
            {student && <Stack spacing={1} sx={{ margin: 'auto', padding: '12vmin' }}>
              <Typography variant="h4" sx={{fontWeight: '900'}}>You have successfully connected for lessons with {student.name}!</Typography>
              <Typography variant="h5">Grade: {student.grade}</Typography>
              <Typography variant="h5">Band: {student.band}</Typography>
              <Typography variant="h5">Instrument: {student.instrument}</Typography>
              <Typography variant="h5">Setting Preference: {student.settingPreference}</Typography>
              <br /><Typography variant="h5" sx={{fontWeight: '900'}}>Reach out to them now:</Typography>
              {student.communicationPreference != "Phone" && <Typography variant="h5" sx={{overflowWrap: 'break-word'}}>Email: {student.email}</Typography>}
              {student.communicationPreference != "Email" && <Typography variant="h5">Phone: {student.phone}</Typography>}
              <br /><Typography variant="h5">If you have any other questions, please contact <em style={{fontWeight: '900', overflowWrap: 'break-word'}}>tiedtogether.connect@gmail.com</em></Typography>
              <br />
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <YellowButton onClick={() => {
                  // pass auth credentials back
                  navigate('/hello-world-app/dashboard', {state: {id: location.state.id, password: location.state.password}});
                }} style={{width: '40vw', height: '6rem'}}>Find More Students</YellowButton>
              </div>
            </Stack>}
          </Background>
        </TriggerOnRender>
      </Authenticate>
    </>
  )
}

export default ConnectConfirm

// phone number / email dep on commpref, setting