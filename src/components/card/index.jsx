import React from 'react'
import c from './card.module.scss'

const Card = ({id, title, image, desc}) => {
  return (
    <div
      className={c.card}
      onClick={() => console.log(id)}
    >
      <img src={image} alt="image" />
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  )
}

export default Card