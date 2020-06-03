import React, { useState } from 'react'
import styled from 'styled-components'
import { Radio, Button } from 'antd'

import { Layout, Title, Row, RowTitle, RowContent } from './Zephrys'
import { SECRETS_CARDS, SECRETS_TRIGGERS } from '../constants/secrets'
import Card from '../components/Card'
import { COLORS } from '../constants/style'

const DEFAULT_FORMAT = 'standard'

const Secrets = () => {
  const getCards = (format, triggers) => {
    let newCards = SECRETS_CARDS.map((groupCards) => {
      return {
        groupId: groupCards.groupId,
        groupTitle: groupCards.groupTitle,
        items: groupCards.items.filter(
          (card) =>
            ((format === 'standard') === card.standard || format === 'wild') &&
            card.secretTriggers &&
            card.secretTriggers.filter(
              (trigger) => triggers.indexOf(trigger) > -1
            ).length > 0
        )
      }
    })

    return newCards
  }

  const [format, setFormat] = useState(DEFAULT_FORMAT)
  const [selectedTriggers, setSelectedTriggers] = useState(
    SECRETS_TRIGGERS.map((t) => t.name)
  )
  const [cards, setCards] = useState(getCards(format, selectedTriggers))

  const changeTriggers = (format, triggers) => {
    let newCards = getCards(format, triggers)
    setSelectedTriggers(triggers)
    setFormat(format)
    setCards(newCards)
  }

  const onFormatChange = (e) => {
    const newFormat = e.target.value
    changeTriggers(newFormat, selectedTriggers)
  }

  // const onTriggerChange = (trigger, checked) => {
  //   console.log(trigger)

  //   const nextSelectedTriggers = checked
  //     ? [...selectedTriggers, trigger]
  //     : selectedTriggers.filter((kw) => kw !== trigger)

  //   changeTriggers(format, nextSelectedTriggers)
  // }

  return (
    <Layout>
      <Title>奥秘考试宝典</Title>

      <FilterWrapper>
        <FormatWrapper>
          卡牌环境：
          <Radio.Group
            size="small"
            buttonStyle="solid"
            onChange={onFormatChange}
            defaultValue={DEFAULT_FORMAT}
            value={format}
          >
            <Radio.Button value="standard">标准</Radio.Button>
            <Radio.Button value="wild">狂野</Radio.Button>
          </Radio.Group>
        </FormatWrapper>
        {/* <TriggersWrapper>
          触发方式：
          {SECRETS_TRIGGERS.map(({ name, title }) => (
            <Tag.CheckableTag
              key={name}
              checked={selectedTriggers.indexOf(name) > -1}
              onChange={(checked) => onTriggerChange(name, checked)}
            >
              {title}
            </Tag.CheckableTag>
          ))}
        </TriggersWrapper> */}
        <ShortcutsGroup>
          触发方式：
          <Button
            type={selectedTriggers.length > 1 ? 'primary' : 'text'}
            size="small"
            onClick={() =>
              changeTriggers(
                format,
                SECRETS_TRIGGERS.map((t) => t.name)
              )
            }
          >
            全部
          </Button>
          {SECRETS_TRIGGERS.map(({ name, title }) => (
            <Button
              key={name}
              type={
                selectedTriggers.length === 1 &&
                selectedTriggers.indexOf(name) > -1
                  ? 'primary'
                  : 'text'
              }
              size="small"
              onClick={() => changeTriggers(format, [name])}
            >
              {title}
            </Button>
          ))}
        </ShortcutsGroup>
      </FilterWrapper>

      {cards.map(({ groupTitle, groupId, items }) => (
        <React.Fragment key={groupId}>
          {items.length > 0 && (
            <Row>
              <VerticalRowTitle>{groupTitle}</VerticalRowTitle>
              <RowContent>
                {items.map((item) => (
                  <Card key={item.id} card={item} />
                ))}
              </RowContent>
            </Row>
          )}
        </React.Fragment>
      ))}
    </Layout>
  )
}

const VerticalRowTitle = styled(RowTitle)`
  writing-mode: vertical-rl;
`

const FilterWrapper = styled.div`
  margin-bottom: 40px;
`

const FormatWrapper = styled.div`
  margin-bottom: 10px;

  .ant-radio-group-solid
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    background-color: ${COLORS.highlight};
  }
`

// const TriggersWrapper = styled.div`
//   margin-bottom: 10px;

//   .ant-tag-checkable:active,
//   .ant-tag-checkable-checked {
//     color: ${COLORS.background};
//     background-color: ${COLORS.text};
//   }
// `

const ShortcutsGroup = styled.div`
  button {
    margin-right: 8px;
  }
`

export default Secrets
