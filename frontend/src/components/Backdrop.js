import React from "react"

function Backdrop({closeInfo}){
  return <div className='backdrop' onClick={closeInfo}></div>
}

export default Backdrop