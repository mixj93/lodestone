import * as React from 'react'
import { Radio, Select, Tag, Card, Row, Col, Spin, Switch } from 'antd'
import * as _ from 'lodash'
import { CARD_CLASSES, CLASS_INFO } from '../data'
import * as apis from '../apis'

class ArenaCardsComparer extends React.Component {
  constructor(props) {
    super(props)
    this.onCardSearch = _.debounce(this.onCardSearch, 500)
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
      let data = await apis.searchCards(value, this.state.choosedClass)
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
      let index = _.findIndex(
        currentChoosedCardsData,
        (o) => o.name == value[i]
      )
      if (index > -1) {
        choosedCardsData.push(currentChoosedCardsData[index])
      } else {
        let data = await apis.getCard(value[i], this.state.choosedClass)
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
        <div style={{ textAlign: 'center' }}>
          <Radio.Group onChange={this.onClassChange} value={choosedClass}>
            {CARD_CLASSES.map((cc) => (
              <Radio key={cc.name} value={cc.name}>
                {cc.text}
              </Radio>
            ))}
          </Radio.Group>
        </div>
        <div className="card-select" style={{ margin: '40px' }}>
          <Select
            mode="multiple"
            size="large"
            allowClear
            style={{ width: '100%' }}
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
                  <span className={textColorClass}>{sd.name}</span>&nbsp;
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
          </Select>
        </div>
        <div style={{ margin: '40px' }}>
          <Row gutter={16}>
            {choosedCardsData.map((ccd) => {
              return (
                <Col span={8} key={ccd.name}>
                  <Card
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
                  </Card>
                </Col>
              )
            })}
          </Row>
        </div>
      </div>
    )
  }
}

export default ArenaCardsComparer
