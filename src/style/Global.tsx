import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  
  .ribbon-wrapper {
    width: 85px;
    height: 88px;
    overflow: hidden;
    position: absolute;
    top: -3px;
    left: -3px;
    .ribbon {
      font: bold 15px sans-serif;
      color: #fff !important;
      text-align: center;
      -webkit-transform: rotate(-45deg);
      -moz-transform:    rotate(-45deg);
      -ms-transform:     rotate(-45deg);
      -o-transform:      rotate(-45deg);
      position: relative;
      padding: 7px 0;
      top: 15px;
      left: -30px;
      width: 120px;
      background-color: rgb(45,80,230);
      .ribbontext {
        font-size:13px;
      }
    }
  }
`

export default GlobalStyle
