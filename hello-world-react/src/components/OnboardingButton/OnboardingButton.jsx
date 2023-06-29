import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import YellowButton from '../YellowButton/YellowButton'

const OnboardingButton = ( { link, text, style } ) => {
  return (
    <>
      <Link to={"/" + link} style={{textDecoration: "none"}}>
        <YellowButton style={{width: "100%", height: "6rem", ...style}}>
          <Typography variant="h6" sx={{}}>{text}</Typography>
        </YellowButton>
      </Link>
    </>
  )
}

export default OnboardingButton