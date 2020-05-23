import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import Card404 from '../assets/images/card-404.png'

const Wrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 64px - 70px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: 300px;
  margin-bottom: 40px;
`

const NotFound = () => {
  return (
    <Wrapper>
      <Image src={Card404} alt="Card 404" />

      <Button type="primary">
        <Link to="/">返回首页</Link>
      </Button>
    </Wrapper>
  )
}

export default NotFound
