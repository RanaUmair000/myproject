import React from 'react'

export default function Alert(props) {
  return (
    <div className='mt-3' style={{height: '50px'}}>
      {props.alert && <div className='container'>
          <div class={`alert alert-${props.alert.type}`} role="alert">
          {props.alert.message}
          </div>
      </div>} 
    </div>
  )
}