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

  &:not(.ant-card-hoverable) {
    cursor: default;

    &::after {
      content: '敬请期待';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      font-size: 24px;
      letter-spacing: 0.1rem;
      color: ${COLORS.textActive};
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      padding-bottom: 120px;
      justify-content: center;
      align-items: center;
    }

    &:hover {
      &::after {
        transform: scale(1.05);
      }
    }
  }

  &.ant-card-hoverable:hover {
    transform: scale(1.05);
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.48),
      0 3px 6px 0 rgba(0, 0, 0, 0.36), 0 5px 12px 4px rgba(0, 0, 0, 0.24);
  }
`

const EntryCard = ({ title, description, image, url }) => {
  return (
    <Link to={url}>
      <StyledCard
        hoverable={url !== ''}
        bordered={false}
        cover={<img alt={title} src={image} />}
      >
        <Card.Meta title={title} description={description} />
      </StyledCard>
    </Link>
  )
}

export default EntryCard
