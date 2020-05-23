import React from 'react'
import styled from 'styled-components'
import { Popover } from 'antd'

import { COLORS } from '../constants/style'
import ArenaCardsComparer from '../components/ArenaCardsComparer'

const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  margin: 30px 0;
`

const Icon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  vertical-align: text-top;
  font-size: 14px;
  font-weight: normal;
  margin-left: 8px;
  border-radius: 50%;
  background-color: ${COLORS.highlight};
`

const helpContent = () => (
  <div>
    <p>1. 选择职业。</p>
    <p>2. 输入卡牌名称或拼音首字母来搜索卡牌。</p>
    <p>3. 比较多个卡牌之间的评分、评级等。</p>
    <p>注：卡牌评级为1级~7级，1级最佳，7级最差。</p>
  </div>
)

const Arena = () => {
  return (
    <div>
      <Title level={2}>
        竞技场选牌器
        <Popover content={helpContent} title="">
          <Icon>?</Icon>
        </Popover>
      </Title>

      <ArenaCardsComparer />
    </div>
  )
}

export default Arena
