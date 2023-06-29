import { Button } from '@mui/material'
import React from 'react'

const YellowButton = ({ children, onClick, style }) => {
  return (
    <Button variant="contained" onClick={onClick} sx={{
        height: "3rem",
        backgroundColor: "#FFDC22",
        ":hover": {
          backgroundColor: "lightyellow"
        },
        ...style
    }}>
      {children}
    </Button>
  )
}

export default YellowButton