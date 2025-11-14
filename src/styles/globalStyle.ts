import { createGlobalStyle } from 'styled-components'
import type { Theme } from '@types'

export const GlobalStyle = createGlobalStyle<{ theme?: Theme }>`
    body, html {
        background: ${(props) => props.theme.appBackground};
        color: ${(props) => props.theme.appColor};
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
    }
    h1, h2, p, ul, li {
        margin: 0;
        padding: 0;
    }
`
