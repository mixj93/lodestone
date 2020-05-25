import React from 'react'
import styled from 'styled-components'
import { Layout } from 'antd'

import { COLORS } from '../constants/style'
import { below } from '../util/breakPoints'

const StyledFooter = styled(Layout.Footer)`
  text-align: center;
  background-color: ${COLORS.background};
  color: ${COLORS.textSecondary};

  a {
    color: ${COLORS.textSecondary};
    &:hover {
      text-decoration: underline;
    }
  }

  ${below.md`
    padding: 20px;
  `}
`

const Footer = () => {
  return (
    <StyledFooter>
      LodeStone ©{new Date().getFullYear()} created with ❤️ by{' '}
      <a
        href="https://xueli.li/contact/"
        target="_blank"
        rel="noopener noreferrer"
      >
        mixj93
      </a>
    </StyledFooter>
  )
}

export default Footer
