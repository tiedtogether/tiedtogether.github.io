import React, { useEffect } from 'react'

const TriggerOnRender = ({ children, func }) => {

  useEffect(() => { // runs on render
    func();
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default TriggerOnRender