import React from 'react'
import styled from 'styled-components'

import { COLORS } from '../constants/style'
import EntryCard from '../components/EntryCard'
import LinksList from '../components/LinksList'

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

const cards = [
  {
    title: '竞技场选牌器',
    description: '包含Lightforge、Heartharena等多个网站数据',
    image: arenaImage,
    url: '/arena'
  },
  {
    title: '奥秘考试秘籍',
    description: '小朋友，你是否有很多问号？',
    image: secretsImage,
    url: '/secrets'
  },
  {
    title: '杰弗里斯的许愿池',
    description: '杰弗里斯许愿卡牌一览',
    image: zephrysImage,
    url: '/zephrys'
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
  }
]

const CardsBlock = styled.div`
  padding: 40px 50px 80px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(${cards.length}, 240px);
  grid-gap: 40px;
`

const LinksBlock = styled.div`
  padding: 60px 50px 80px;
  background-color: ${COLORS.backgroundLighter};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px 60px;
`

const CardsBlockTitle = styled.h2`
  margin: 0;
  text-align: center;
  grid-column-start: 1;
  grid-column-end: 4;
`

const LinksBlockTitle = styled(CardsBlockTitle)`
  grid-column-end: 3;
`

const Home = () => {
  return (
    <div>
      <CardsBlock>
        <CardsBlockTitle>工具箱</CardsBlockTitle>

        {cards.map(({ title, description, image, url }) => (
          <EntryCard
            key={url}
            title={title}
            description={description}
            image={image}
            url={url}
          />
        ))}
      </CardsBlock>

      <LinksBlock>
        <LinksBlockTitle>快速链接</LinksBlockTitle>

        <LinksList links={officialLinks} />
        <LinksList links={otherLinks} />
      </LinksBlock>
    </div>
  )
}

export default Home
