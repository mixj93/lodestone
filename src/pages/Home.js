import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'

import { COLORS } from '../constants/style'
import { below } from '../util/breakPoints'
import EntryCard from '../components/EntryCard'
import LinksList from '../components/LinksList'
import MessageForm from '../components/MessageForm'

import arenaImage from '../assets/images/arena.jpg'
import secretsImage from '../assets/images/secrets.jpg'
import zephrysImage from '../assets/images/zephrys.jpg'
import hearthstoneIcon from '../assets/images/hearthstone.png'
import hearthstoneRoseIcon from '../assets/images/hearthstone-rose.png'
import battlegroundsIcon from '../assets/images/battlegrounds.png'
import leaderIcon from '../assets/images/leader.png'
import yingdiIcon from '../assets/images/yingdi.png'
import ngaIcon from '../assets/images/nga.png'
import ashesIcon from '../assets/images/ashes.png'
import hsreplayIcon from '../assets/images/hsreplay.png'
import oocIcon from '../assets/images/ooc.png'

const cards = [
  {
    id: 'arena',
    title: '竞技场选牌器',
    description: '包含Lightforge、Heartharena等多个网站数据',
    image: arenaImage,
    url: '/arena'
  },
  {
    id: 'zephrys',
    title: '杰弗里斯的许愿池',
    description: '杰弗里斯许愿卡牌一览',
    image: zephrysImage,
    url: '/zephrys'
  },
  {
    id: 'secrets',
    title: '奥秘考试宝典',
    description: '小朋友，你是否有很多问号？',
    image: secretsImage,
    url: '/secrets'
  }
]

const officialLinks = [
  {
    title: '炉石传说官方网站',
    description:
      '游戏下载，最近资讯，赛事新闻，这里应有尽有，冒险之旅从这里开始吧。',
    url: 'https://hs.blizzard.cn/home',
    icon: hearthstoneIcon
  },
  {
    title: '炉石传说天梯排名',
    description: '标准模式、狂野模式、酒馆战棋前200名的玩家。',
    url: 'https://hs.blizzard.cn/leaderboards',
    icon: leaderIcon
  },
  {
    title: '官方卡牌工具',
    description: '可以查看到所有卡牌的信息、保存卡组、复制套牌代码。',
    url: 'https://hs.blizzard.cn/cards',
    icon: hearthstoneRoseIcon
  },
  {
    title: '官方酒馆战旗工具',
    description: '可以查看到所有英雄和随从信息。',
    url: 'https://hs.blizzard.cn/cards/battlegrounds',
    icon: battlegroundsIcon
  }
]

const otherLinks = [
  {
    title: '旅法师营地 - 炉石传说',
    description:
      '旅法师营地是中国最具影响力的卡牌游戏玩家聚集地。资讯、攻略、社区论坛一应俱全。',
    url: 'https://www.iyingdi.com/web/article/hearthstone?seed=2&tagid=17',
    icon: yingdiIcon
  },
  {
    title: 'NGA炉石传说论坛',
    description: '艾泽拉斯国家地理NGA玩家社区炉石传说论坛。',
    url: 'https://bbs.nga.cn/thread.php?fid=422',
    icon: ngaIcon
  },
  {
    title: '炉石传说卡牌数据库',
    description: '信息全面的炉石传说卡牌数据库，包含卡牌的语言是最大亮点。',
    url: 'https://hs.fbigame.com/',
    icon: ashesIcon
  },
  {
    title: 'HSReplay',
    description: '超级好用的基于大数据卡牌、卡组、战棋网站和工具。',
    url: 'https://hsreplay.net/',
    icon: hsreplayIcon
  },
  {
    title: 'Out of Cards',
    description: '国外知名的卡牌游戏社区。',
    url: 'https://outof.cards/',
    icon: oocIcon
  }
]

const CardsBlock = styled.div`
  padding: 40px 50px;

  ${below.md`
    padding: 20px;
  `}
`

const LinksBlock = styled(CardsBlock)`
  background-color: ${COLORS.backgroundLighter};
`

const BlockTitle = styled.h2`
  margin: 0 0 40px 0;
  font-size: 24px;
  text-align: center;

  ${below.md`
    margin: 0 0 20px 0;
  `}
`

const MessageBlock = styled(CardsBlock)`
  background-color: #fff;
  .ant-form-item-label label {
    color: ${COLORS.background};
  }
  ${BlockTitle} {
    color: ${COLORS.background};
  }
  input,
  textarea {
    color: ${COLORS.background};
    border-color: ${COLORS.backgroundLighter};
  }
  input::placeholder,
  textarea::placeholder {
    color: #9696c1;
  }
  input:hover,
  input:focus,
  textarea:hover,
  textarea:focus,
  .ant-input-focused {
    border-color: ${COLORS.background};
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }

  *::selection {
    color: ${COLORS.textActive};
    background-color: ${COLORS.highlight};
  }
`

const Home = () => {
  return (
    <div>
      <CardsBlock>
        <BlockTitle>工具箱</BlockTitle>
        <Row>
          <Col lg={{ push: 3, span: 18 }} xl={{ push: 4, span: 16 }}>
            <Row
              gutter={[
                { xs: 20, sm: 20, md: 40 },
                { xs: 20, sm: 20, md: 40 }
              ]}
            >
              {cards.map(({ id, title, description, image, url }) => (
                <Col key={id} xs={24} sm={12} md={8}>
                  <EntryCard
                    title={title}
                    description={description}
                    image={image}
                    url={url}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </CardsBlock>

      <LinksBlock>
        <BlockTitle>快速链接</BlockTitle>
        <Row>
          <Col lg={{ push: 2, span: 20 }}>
            <Row gutter={40}>
              <Col sm={{ span: 12 }}>
                <LinksList links={officialLinks} />
              </Col>
              <Col sm={{ span: 12 }}>
                <LinksList links={otherLinks} />
              </Col>
            </Row>
          </Col>
        </Row>
      </LinksBlock>

      <MessageBlock>
        <BlockTitle>留言</BlockTitle>
        <Row>
          <Col push={1} span={22} lg={{ push: 6, span: 12 }}>
            <MessageForm />
          </Col>
        </Row>
      </MessageBlock>
    </div>
  )
}

export default Home
