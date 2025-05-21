// src/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Dosis', 'Nunito', sans-serif;
  }
  select, input, button, textarea,h2,p {
    font-family: inherit;
  }
`

export default GlobalStyle
