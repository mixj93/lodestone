import React from 'react'
import styled from 'styled-components'
import { List, Avatar } from 'antd'

const StyledListItem = styled(List.Item)`
  transition: all 0.3s;
  border-radius: 16px;
  padding: 10px !important;
  margin-bottom: 8px !important;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.4),
      0 3px 6px 0 rgba(0, 0, 0, 0.3), 0 5px 12px 4px rgba(0, 0, 0, 0.2);
  }
`

const LinksList = ({ grid, links }) => {
  return (
    <List
      itemLayout="horizontal"
      grid={{ gutter: 32, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
      dataSource={links}
      split={false}
      size="large"
      renderItem={({ title, description, url, icon }) => (
        <StyledListItem key={url}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <List.Item.Meta
              avatar={<Avatar size={48} shape="square" src={icon} />}
              title={title}
              description={description}
            />
          </a>
        </StyledListItem>
      )}
    />
  )
}

export default LinksList
