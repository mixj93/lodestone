import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'

import { COLORS } from '../constants/style'
import { LINKS } from '../constants/links'
import { below } from '../util/breakPoints'
import EntryCard from '../components/EntryCard'
import LinksList from '../components/LinksList'
import MessageForm from '../components/MessageForm'

import arenaImage from '../assets/images/arena.jpg'
import secretsImage from '../assets/images/secrets.jpg'
import zephrysImage from '../assets/images/zephrys.jpg'

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
            <LinksList links={LINKS} />
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
