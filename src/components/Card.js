import React, { useState } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

import CardDetailModal from './CardDetailModal'

const CardWrapper = styled.div`
  text-align: center;
`

const AnimatedImg = styled(animated.img)`
  width: 160px;
  max-width: 100%;
  will-change: transform;
  cursor: pointer;
  perspective-origin: center;
  padding: 0 0 10px 0;
`

const calc = (x, y) => [-(y / 10), x / 10, 1.05]

const trans = (x, y, s) =>
  `perspective(500px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const Card = ({ card }) => {
  const [showModal, setShowModal] = useState(false)
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 2, tension: 350, friction: 20 }
  }))

  return (
    <CardWrapper>
      <AnimatedImg
        src={card.imageUrl}
        alt={card.name}
        onClick={() => setShowModal(true)}
        onMouseMove={({
          clientX,
          clientY,
          currentTarget: { x, y, width, height }
        }) =>
          set({
            xys: calc(clientX - (x + width / 2), clientY - (y + height / 2))
          })
        }
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        onBlur={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.interpolate(trans) }}
      />

      {showModal && (
        <CardDetailModal card={card} onClose={() => setShowModal(false)} />
      )}
    </CardWrapper>
  )
}

export default Card
