import styled from 'styled-components'
import type { Theme } from '@/types'
import { pxToRem } from '@/utils'

export const Logo = styled.figure<{
  height?: number
  width?: number
  theme?: Theme
}>`
  background-image: url(${(props) => `/${props.theme?.appLogo ?? ''}`});
  background-size: cover;
  height: ${(props) => pxToRem(props.height ?? 40)};
  width: ${(props) => pxToRem(props.width ?? 120)};
`
