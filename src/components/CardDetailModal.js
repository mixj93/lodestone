import React from 'react'
import styled from 'styled-components'

import Portal from './Portal'
import { COLORS } from '../constants/style'
import {
  CARD_TYPE_MAP,
  CARD_RARITY_MAP,
  CARD_SET_MAP,
  CARD_CLASS_MAP
} from '../constants/common'
import { useLockBodyScroll } from '../hooks'

const CardDetailModal = ({
  onClose,
  card: {
    imageUrl,
    name,
    background,
    description,
    cardType,
    cardRarity,
    cardSet,
    cardClass
  }
}) => {
  useLockBodyScroll()

  return (
    <Portal>
      <ModalWrapper>
        <CardDetail>
          <CardImage src={imageUrl} alt={name} title={name} />
          <CardInfo>
            <h2>{name}</h2>
            <p>{background}</p>
            <CardText dangerouslySetInnerHTML={{ __html: description }} />
            <ul>
              <li>类型：{CARD_TYPE_MAP[cardType] || cardType}</li>
              <li>稀有度：{CARD_RARITY_MAP[cardRarity] || cardRarity}</li>
              <li>系列：{CARD_SET_MAP[cardSet] || cardSet}</li>
              <li>职业：{CARD_CLASS_MAP[cardClass] || cardClass}</li>
            </ul>
          </CardInfo>
        </CardDetail>
        <Background onClick={onClose} />
        <CloseButton onClick={onClose}>
          <svg viewBox="0 0 1024 1024">
            <path d="M521.694 449.297L111.41 39.014a51.2 51.2 0 1 0-72.43 72.363l410.282 410.317L38.98 932.01a51.2 51.2 0 1 0 72.397 72.396l410.317-410.282 410.317 410.282a51.2 51.2 0 1 0 72.396-72.362l-410.282-410.35 410.282-410.283a51.2 51.2 0 1 0-72.396-72.397L521.728 449.297z"></path>
          </svg>
        </CloseButton>
      </ModalWrapper>
    </Portal>
  )
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: ${COLORS.background};
  opacity: 0.9;
`

const CardDetail = styled.div`
  z-index: 10;
  display: flex;
  justify-content: center;
`

const CardImage = styled.img`
  width: 300px;
  padding: 0 0 30px 0;
  margin-right: 20px;
`

const CardInfo = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`

const CardText = styled.p`
  font-size: 16px;
  color: ${COLORS.textActive};
`

const CloseButton = styled.button`
  z-index: 11;
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  padding: 0;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  svg {
    fill: ${COLORS.text};
  }

  &:hover,
  &:focus {
    svg {
      fill: ${COLORS.textActive};
    }
  }
`

export default CardDetailModal
