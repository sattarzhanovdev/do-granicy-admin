import React from 'react'
import c from './title.module.scss'

const Title = ({text}) => {
  return (
    
    <div className={c.container}>
      <div className={c.title}>
        <h2>{text}</h2>
      </div>
    </div>
  )
}

export default Title