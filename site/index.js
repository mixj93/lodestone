import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Divider, Popover } from 'antd'
import ArenaCardsComparer from './components/ArenaCardsComparer'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  helpContent = (
    <div>
      <p>1. 选择职业。</p>
      <p>2. 输入卡牌名称或拼音首字母来搜索卡牌。</p>
      <p>3. 比较多个卡牌之间的评分、评级等。</p>
      <p>注：卡牌评级为1级~7级，1级最佳，7级最差。</p>
    </div>
  )

  render() {
    return (
      <Layout>
        <Layout.Header className="site-header">
          <h1 className="title">Lodestone</h1>
          <div className="links">
            <Popover content={this.helpContent} title="" trigger="click">
              <a href="#">帮助说明</a>
            </Popover>
            <Divider type="vertical" />
            <a
              href="https://github.com/mixj93/lodestone/releases"
              target="_blank"
            >
              更新日志
            </a>
            <Divider type="vertical" />
            <a href="https://github.com/mixj93/lodestone" target="_blank">
              Github
            </a>
          </div>
        </Layout.Header>
        <Layout.Content>
          <div className="site-wrapper">
            <ArenaCardsComparer />
          </div>
        </Layout.Content>
        {/* <Layout.Footer>Footer</Layout.Footer> */}
      </Layout>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
