import React from 'react'

const Button = (prop) => {
  return (
    <div onClick={prop.onClick} className={'button'+(prop.choosen === prop.symbol?' choosen':'')} style={prop.symbol==='='?{gridArea:'6/4/8/4'}:{}}>
        <div>{prop.symbol}</div>
    </div>
  )
}

export default Button