import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LocaleProvider, Layout } from 'antd';
import * as zh_CN from 'antd/lib/locale-provider/zh_CN';
import ArenaCardsComparer from './components/arenaCardsComparer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        <Layout>
          <Layout.Header className="site-header">
            <h1 className="title">Lodestone</h1>
          </Layout.Header>
          <Layout.Content>
            <div className="site-wrapper">
              <ArenaCardsComparer />
            </div>
          </Layout.Content>
          {/* <Layout.Footer>Footer</Layout.Footer> */}
        </Layout>
      </LocaleProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));