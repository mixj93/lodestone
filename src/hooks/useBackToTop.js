import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { COLORS } from '../constants/style'

const createThrottle = (callback, delay, thisArg) => {
  let lastInvokeTime = Date.now()
  const _delay = Number(delay) || 200
  return (...args) => {
    const now = Date.now()
    if (now - _delay <= lastInvokeTime) {
      return
    }
    lastInvokeTime = now
    callback.call(thisArg, ...args)
  }
}

export function useBackToTop() {
  const [show, switchShow] = useState(false)
  useEffect(() => {
    const listener = createThrottle(() => {
      const shouldShow = window.scrollY > window.innerHeight
      if (shouldShow !== show) {
        switchShow(shouldShow)
      }
    }, 500)
    document.addEventListener('scroll', listener)
    return () => document.removeEventListener('scroll', listener)
  }, [show])

  return show ? (
    <BackToTop onClick={() => window.scrollTo(0, 0)}>▲</BackToTop>
  ) : null
}

const BackToTop = styled.button`
  cursor: pointer;
  position: fixed;
  right: 10px;
  bottom: 40px;
  width: 40px;
  height: 40px;
  background-color: ${COLORS.text};
  border-radius: 4px;
  border: none;
  outline: none;
  font-size: 18px;
  z-index: 99;
  color: ${COLORS.background};
  opacity: 0.8;

  &:hover {
    border: none;
  }
`
