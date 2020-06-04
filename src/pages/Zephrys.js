import React, { useState } from 'react'
import styled from 'styled-components'
import { Tag, Button } from 'antd'

import { below } from '../util/breakPoints'
import Card from '../components/Card'
import { COLORS } from '../constants/style'
import { ZEPHRYS_CARDS, ZEPHRYS_KEYWORDS } from '../constants/zephrys'
import { useBackToTop } from '../hooks/useBackToTop'

const Zephrys = () => {
  const [cards, setCards] = useState(ZEPHRYS_CARDS)
  const [selectedKeywords, setSelectedKeywords] = useState(ZEPHRYS_KEYWORDS)

  const changeKeywords = (keywords) => {
    const newCards = ZEPHRYS_CARDS.map((groupCards) => {
      return {
        groupTitle: groupCards.groupTitle,
        items: groupCards.items.filter(
          (card) =>
            card.zephrysKeywords &&
            card.zephrysKeywords.filter(
              (keyword) => keywords.indexOf(keyword) > -1
            ).length > 0
        )
      }
    })

    setSelectedKeywords(keywords)
    setCards(newCards)
  }

  const handleKeywordChange = (keyword, checked) => {
    const nextSelectedKeywords = checked
      ? [...selectedKeywords, keyword]
      : selectedKeywords.filter((kw) => kw !== keyword)

    changeKeywords(nextSelectedKeywords)
  }

  return (
    <Layout>
      <Title>杰弗里斯的许愿池</Title>

      <KeywordsWrapper>
        <KeywordsGroup>
          关键词：
          {ZEPHRYS_KEYWORDS.map((keyword) => (
            <Tag.CheckableTag
              key={keyword}
              checked={selectedKeywords.indexOf(keyword) > -1}
              onChange={(checked) => handleKeywordChange(keyword, checked)}
            >
              {keyword}
            </Tag.CheckableTag>
          ))}
        </KeywordsGroup>
        <ShortcutsGroup>
          快捷方式：
          <Button
            type="text"
            size="small"
            onClick={() => changeKeywords(ZEPHRYS_KEYWORDS)}
          >
            全选
          </Button>
          <Button type="text" size="small" onClick={() => changeKeywords([])}>
            清空关键词
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => changeKeywords(['解场'])}
          >
            解场
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => changeKeywords(['单解'])}
          >
            单解
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => changeKeywords(['伤害'])}
          >
            伤害
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => changeKeywords(['武器'])}
          >
            武器
          </Button>
          <Button
            type="text"
            size="small"
            onClick={() => changeKeywords(['回血'])}
          >
            回血
          </Button>
        </ShortcutsGroup>
      </KeywordsWrapper>

      {cards.map(({ groupTitle, items }) => (
        <React.Fragment key={groupTitle}>
          {items.length > 0 && (
            <Row>
              <RowTitle>{groupTitle}</RowTitle>
              <RowContent>
                {items.map((item) => (
                  <Card key={item.id} card={item} />
                ))}
              </RowContent>
            </Row>
          )}
        </React.Fragment>
      ))}

      {useBackToTop()}
    </Layout>
  )
}

export const Layout = styled.div`
  margin: 40px 50px;

  ${below.md`
    margin: 0 10px 20px 10px;
  `}
`

export const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  margin: 0 0 40px 0;
`

export const Row = styled.div`
  position: relative;
  background-color: ${COLORS.backgroundLight};
  margin-bottom: 40px;
`

export const RowTitle = styled.h2`
  position: absolute;
  width: 50px;
  left: 0;
  top: 0;
  bottom: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  background-color: ${COLORS.backgroundLighter};
  color: ${COLORS.textActive};
`

export const RowContent = styled.div`
  margin-left: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));

  ${below.md`
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  `}
`

const KeywordsWrapper = styled.div`
  margin-bottom: 40px;
  text-align: center;

  .ant-tag-checkable:active,
  .ant-tag-checkable-checked {
    color: ${COLORS.background};
    background-color: ${COLORS.text};
  }
`

const KeywordsGroup = styled.div`
  margin-bottom: 20px;
`

const ShortcutsGroup = styled.div`
  button {
    margin-right: 8px;
  }
`

export default Zephrys
