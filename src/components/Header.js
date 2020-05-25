import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Layout, Divider } from 'antd'

import { below } from '../util/breakPoints'
import { COLORS } from '../constants/style'

const StyledHeader = styled(Layout.Header)`
  background-color: ${COLORS.background};

  ${below.md`
    padding: 0 20px;
  `}
`

const Title = styled.h1`
  font-size: 28px;
  float: left;
  margin: 0;
`

const TitleLink = styled(Link)`
  color: ${COLORS.text};
  &:hover {
    color: ${COLORS.textActive};
  }
`

const Links = styled.div`
  float: right;
`

const StyledLink = styled.a`
  color: ${COLORS.textSecondary};
  &:hover {
    color: ${COLORS.textSecondary};
    text-decoration: underline;
  }
`

const Header = () => {
  return (
    <StyledHeader>
      <Title>
        <TitleLink to="/">LodeStone</TitleLink>
      </Title>
      <Links>
        <StyledLink
          href="https://github.com/mixj93/lodestone/releases"
          target="_blank"
          rel="noopener noreferrer"
        >
          更新日志
        </StyledLink>
        <Divider
          type="vertical"
          style={{ borderLeftColor: COLORS.textSecondary }}
        />
        <StyledLink
          href="https://github.com/mixj93/lodestone"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </StyledLink>
      </Links>
    </StyledHeader>
  )
}

export default Header
