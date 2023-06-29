import React from 'react'
import Background from '../../components/Background/Background'
import NavBar from '../../components/NavBar/NavBar'
import { Typography } from '@mui/material'

const Thanks = () => {
  return (
    <>
      <Background />
      <NavBar />
      <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", overflowWrap: 'break-word', overflow: 'auto', width: '70vw'}}>
        <Typography variant="h4" sx={{overflowWrap: 'break-word'}}>Thanks for signing up!</Typography>
        <br /><Typography variant="h5">A tutor will reach out to you soon. If you have any questions, contact <em style={{fontWeight: '900'}}>tiedtogether.connect@gmail.com</em></Typography>
        <br /><Typography variant="h5">You may leave this page now.</Typography>
      </div>
    </>
  )
}

export default Thanks