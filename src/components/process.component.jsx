import React from 'react'

const Process = (props) => {
  const { step } = props
  return (
    <div className='content-indicator'>
      <div className={step === 1 ? 'progress-indicator-active' : 'progress-indicator'}> 1 </div>
      <span style={{ backgroundColor: step === 2 ? '#0A51A1' : '#1b2e4b' }} />
      <div className={step === 2 ? 'progress-indicator-active' : 'progress-indicator'}> 2 </div>
      <span style={{ backgroundColor: step === 3 ? '#0A51A1' : '#1b2e4b' }} />
      <div className={step === 3 ? 'progress-indicator-active' : 'progress-indicator'}> 3 </div>
    </div>
  )
}

export default Process
