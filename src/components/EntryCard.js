import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card } from 'antd'

import { COLORS } from '../constants/style'

const StyledCard = styled(Card)`
  width: 240px;
  border-radius: 10px;
  overflow: hidden;

  .ant-card-body {
    height: 120px;
    background-color: ${COLORS.backgroundLight};
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.48),
      0 3px 6px 0 rgba(0, 0, 0, 0.36), 0 5px 12px 4px rgba(0, 0, 0, 0.24);
  }
`

const EntryCard = ({ title, description, image, url }) => {
  return (
    <Link to={url}>
      <StyledCard
        hoverable={true}
        bordered={false}
        cover={<img alt={title} src={image} />}
      >
        <Card.Meta title={title} description={description} />
      </StyledCard>
    </Link>
  )
}

export default EntryCard
