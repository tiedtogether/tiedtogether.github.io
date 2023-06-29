import React from 'react'

const Background = ( { children, style } ) => {
  return (
    <div style={{backgroundColor: '#DDFDFF', width: "100%", height: "max(100%, 100vh)", position: "absolute", overflow: "auto", ...style}}>{children}</div>
  )
}

export default Background