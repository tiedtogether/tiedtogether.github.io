import React from 'react'
import { Link } from 'react-router-dom'
import YellowButton from '../YellowButton/YellowButton'

const BackButton = () => {
  return (
    <Link to="/hello-world-app/" style={{textDecoration: "none", position: "absolute", left: "20px", top: "calc(60px + 5vmin)" }}>
      <YellowButton style={{height: '5vmin', fontSize: 'min(3vmin, 1rem)'}}>BACK</YellowButton>
    </Link>
  )
}

export default BackButton