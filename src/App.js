import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import GlobalStyle from './components/GlobalStyle'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Arena from './pages/Arena'
import Zephrys from './pages/Zephrys'
import Secrets from './pages/Secrets'

import 'antd/dist/antd.dark.less'

const ContentWrapper = styled.section`
  min-height: calc(100vh - 64px - 70px);
`

function App() {
  return (
    <Router>
      <ConfigProvider locale={zhCN}>
        <GlobalStyle />

        <Layout>
          <Header />

          <ContentWrapper>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/arena">
                <Arena />
              </Route>
              <Route path="/zephrys">
                <Zephrys />
              </Route>
              <Route path="/secrets">
                <Secrets />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </ContentWrapper>

          <Footer />
        </Layout>
      </ConfigProvider>
    </Router>
  )
}

export default App
