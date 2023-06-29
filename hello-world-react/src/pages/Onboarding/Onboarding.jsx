import { Stack, Typography } from '@mui/material'
import React from 'react'
import OnboardingButton from '../../components/OnboardingButton/OnboardingButton'
import Background from '../../components/Background/Background'
import NavBar from '../../components/NavBar/NavBar'

const Onboarding = () => {
  return (
    <Background>
      <NavBar />
      <Stack spacing={2} sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: '60vw' }}>
        {/* <Typography variant="h3" sx={{fontStyle: 'italic', fontFamily: 'serif'}}>music tutoring made easy...</Typography> */}
        <br />
        <br />
        <OnboardingButton link="hello-world-app/register-tutor" text="I want to be a tutor" />
        <OnboardingButton link="hello-world-app/register-student" text="I want to be a student" />
      </Stack>
    </Background>
  )
}

export default Onboarding

//style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}