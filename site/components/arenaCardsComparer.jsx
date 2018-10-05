import * as React from 'react';
import { Radio, Select, Tag, Card, Row, Col } from 'antd';
import * as _ from 'lodash';
import { getPingyinInit } from '../utils/pingyin';
import { CARD_CLASSES, CLASS_INFO, CLASS_DATA } from '../data';

class ArenaCardsComparer extends React.Component {
  constructor(props) {
    super(props);
    this.onCardSearch = _.debounce(this.onCardSearch, 500);
  }

  state = {
    choosedClass: 'druid',
    searchedData: [],
    choosedCards: [],
    choosedCardsData: []
  };

  onClassChange = (e) => {
    this.setState({
      choosedClass: e.target.value,
      searchedData: [],
      choosedCards: [],
      choosedCardsData: []
    });
  }

  onCardSearch = (value) => {
    let result = [];
    if (value) {
      result = _.filter(CLASS_DATA[this.state.choosedClass].lightforge, c => {
        let cardName = c.name;
        let cardPingyin = getPingyinInit(cardName);
        return (cardName.indexOf(value) > -1 || cardPingyin.indexOf(value) > -1);
      });
    }
    this.setState({
      searchedData: result
    });
  }

  onCardChange = (value) => {
    let choosedCardsData = [];
    let classData = CLASS_DATA[this.state.choosedClass];
    for (let i = 0; i < value.length; i++) {
      let cardName = value[i];
      let index = _.findIndex(classData.lightforge, { 'name': cardName });
      let lf = classData.lightforge[index];
      let ha = classData.heartharena[index];
      choosedCardsData.push({'lightforge': lf, 'heartharena': ha});
    }
    this.setState({
      choosedCards: value,
      choosedCardsData: choosedCardsData
    });
  }

  render() {
    const { choosedClass, searchedData, choosedCardsData, choosedCards } = this.state;
    return (
      <div>
        <div style={{'textAlign': 'center'}}>
          <Radio.Group onChange={this.onClassChange} value={choosedClass}>
            {CARD_CLASSES.map(cc => <Radio key={cc.name} value={cc.name}>{cc.text}</Radio>)}
          </Radio.Group>
        </div>
        <div className="card-select" style={{margin: '40px'}}>
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
          >
            {searchedData.map((sd) => (
              <Select.Option key={sd.name} value={sd.name}>
                <Tag color="#108ee9">{sd.cost}</Tag>
                {sd.name}&nbsp;
                <Tag color={sd.class !== '中立' ? CLASS_INFO[choosedClass].tagColor : ''}>{sd.class}</Tag>
              </Select.Option>
            ))}
          </Select>
        </div>
        <div style={{margin: '40px'}}>
          <Row gutter={16}>
            {choosedCardsData.map(ccd => (
              <Col span={8} key={ccd.lightforge.name}>
                <Card title={`${ccd.lightforge.cost} ${ccd.lightforge.name} [${ccd.lightforge.class}]`} bordered={false}>
                  <p>Lightforge: {ccd.lightforge.grade}级/{ccd.lightforge.score}分{ccd.lightforge.copiesLowerValue && '/不建议多张'}</p>
                  <p>Hearthstone: {ccd.heartharena.grade}级/{ccd.heartharena.score}分{ccd.heartharena.copiesLowerValue && '/不建议多张'}{ccd.heartharena.lowHigh && `/${ccd.heartharena.lowHigh}该职业`}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    )
  }
}

export default ArenaCardsComparer;
