import React from 'react'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import Background from '../../components/Background/Background'
import YellowButton from '../../components/YellowButton/YellowButton'
import NavBar from '../../components/NavBar/NavBar'

const ErrorPage = () => {
  return (
    <>
      <Background />
      <NavBar />
      <div style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
        <Typography variant="h4">Sorry, an error occured!</Typography>
        <Link to="/hello-world-app/" style={{textDecoration: "none"}}>
          <YellowButton style={{padding: "15px", margin: "25px", fontFamily: "Montserrat"}}>
            Return to Home
          </YellowButton>
        </Link>
      </div>
    </>
    
  )
}

export default ErrorPage