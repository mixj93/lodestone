import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body::-webkit-scrollbar {
    width: 10px;
    background-color: #eff1f5;
  }
  body::-webkit-scrollbar-thumb {
    background-color: #5a6072;
    border-radius: 5px;
  }
  body::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 3px;
  }
`

export default GlobalStyle
