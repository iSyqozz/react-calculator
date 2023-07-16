import React from 'react'

const Screen = (props) => {
  return (
    <div className='screen'>{
      <div className='screen-curr'>{props.val}</div>
    }</div>
  )
}

export default Screen