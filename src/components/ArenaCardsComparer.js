import React from 'react'
import styled from 'styled-components'
import { Radio, Select, Tag, Card, Row, Col, Spin } from 'antd'
import { debounce, findIndex } from 'lodash'

import { below } from '../util/breakPoints'
import { COLORS } from '../constants/style'
import { CARD_CLASSES, CLASS_INFO } from '../constants/arena'
import { getCard, searchCards } from '../apis/arena'

const RadioGroup = styled.div`
  text-align: center;
`

const SelectWrapper = styled.div`
  text-align: center;
  margin: 40px 0;
`

const StyledSelect = styled(Select)`
  width: 100%;
`

const StyledCard = styled(Card)`
  border-radius: 10px;
  overflow: hidden;

  .ant-card-head {
    background-color: ${COLORS.backgroundLight};
  }

  .ant-card-body {
    background-color: ${COLORS.backgroundLighter};
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.48),
      0 3px 6px 0 rgba(0, 0, 0, 0.36), 0 5px 12px 4px rgba(0, 0, 0, 0.24);
  }
`

const RarityLabel = styled.span`
  color: ${(props) => {
    switch (props.rarity) {
      case 'rare':
        return '#1890ff'
      case 'epic':
        return '#722ed1'
      case 'legendary':
        return '#fa8c16'
      default:
        return 'inherit'
    }
  }};
`

const StyledCol = styled(Col)`
  ${below.sm`
    margin-bottom: 20px;
  `}
`

class ArenaCardsComparer extends React.Component {
  constructor(props) {
    super(props)
    this.onCardSearch = debounce(this.onCardSearch, 500)
  }

  state = {
    isSearchLoading: false,
    choosedClass: 'demon-hunter',
    searchedData: [],
    choosedCards: [],
    choosedCardsData: []
  }

  onClassChange = (e) => {
    this.setState({
      choosedClass: e.target.value,
      searchedData: [],
      choosedCards: [],
      choosedCardsData: []
    })
  }

  onCardSearch = async (value) => {
    if (value) {
      this.setState({
        searchedData: [],
        isSearchLoading: true
      })
      let data = await searchCards(value, this.state.choosedClass)
      this.setState({
        isSearchLoading: false,
        searchedData: data
      })
    }
  }

  onCardChange = async (value) => {
    let currentChoosedCardsData = this.state.choosedCardsData
    let choosedCardsData = []

    for (let i = 0; i < value.length; i++) {
      let index = findIndex(currentChoosedCardsData, (o) => o.name === value[i])
      if (index > -1) {
        choosedCardsData.push(currentChoosedCardsData[index])
      } else {
        let data = await getCard(value[i], this.state.choosedClass)
        choosedCardsData.push(data)
      }
    }

    this.setState({
      choosedCards: value,
      choosedCardsData: choosedCardsData
    })
  }

  render() {
    const {
      choosedClass,
      searchedData,
      choosedCardsData,
      choosedCards,
      isSearchLoading
    } = this.state
    return (
      <div>
        <RadioGroup>
          <Radio.Group onChange={this.onClassChange} value={choosedClass}>
            {CARD_CLASSES.map((cc) => (
              <Radio key={cc.name} value={cc.name}>
                {cc.text}
              </Radio>
            ))}
          </Radio.Group>
        </RadioGroup>

        <SelectWrapper>
          <Row>
            <Col xs={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }}>
              <StyledSelect
                mode="multiple"
                size="large"
                allowClear
                placeholder="请输入卡牌"
                value={choosedCards}
                onSearch={this.onCardSearch}
                onChange={this.onCardChange}
                filterOption={false}
                notFoundContent={isSearchLoading ? <Spin size="small" /> : null}
              >
                {searchedData.map((sd) => {
                  let textColorClass = ''
                  switch (sd.rarity) {
                    case '传说':
                      textColorClass = 'legendary'
                      break
                    case '史诗':
                      textColorClass = 'epic'
                      break
                    case '稀有':
                      textColorClass = 'rare'
                      break
                    default:
                      textColorClass = ''
                  }

                  return (
                    <Select.Option key={sd.name} value={sd.name}>
                      <Tag color="#108ee9">{sd.cost}</Tag>
                      <RarityLabel rarity={textColorClass}>
                        {sd.name}
                      </RarityLabel>
                      &nbsp;
                      <Tag
                        color={
                          sd.class !== '中立'
                            ? CLASS_INFO[choosedClass].tagColor
                            : ''
                        }
                      >
                        {sd.class}
                      </Tag>
                    </Select.Option>
                  )
                })}
              </StyledSelect>
            </Col>
          </Row>
        </SelectWrapper>

        <div>
          <Row>
            <Col xs={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }}>
              <Row gutter={16}>
                {choosedCardsData.map((ccd) => {
                  return (
                    <StyledCol
                      xs={{ span: 12 }}
                      sm={{ span: 8 }}
                      key={ccd.name}
                    >
                      <StyledCard
                        title={`${ccd.cost} ${ccd.name} [${ccd.class}]`}
                        bordered={false}
                      >
                        {ccd.lightforge && (
                          <p>
                            Lightforge: {ccd.lightforge.grade}级/
                            {ccd.lightforge.score}分
                            {ccd.lightforge.copiesLowerValue && '/不建议多张'}
                          </p>
                        )}
                        {ccd.heartharena && (
                          <p>
                            Hearthstone: {ccd.heartharena.grade}级/
                            {ccd.heartharena.score}分
                            {ccd.heartharena.copiesLowerValue && '/不建议多张'}
                            {ccd.heartharena.lowHigh &&
                              `/${ccd.heartharena.lowHigh}该职业`}
                          </p>
                        )}
                        {ccd.yingdi && (
                          <p>
                            旅法师营地: {ccd.yingdi.catchRate}抓取率/
                            {ccd.yingdi.score}分
                          </p>
                        )}
                      </StyledCard>
                    </StyledCol>
                  )
                })}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default ArenaCardsComparer
