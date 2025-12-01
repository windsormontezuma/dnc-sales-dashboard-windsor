import styled from 'styled-components'
import { StyledButton, StyledInput } from '@/components'
import type { FormComponentProps, InputProps, ButtonProps } from '@/types'
import { pxToRem } from '@/utils'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: ${pxToRem(16)};
`



function FormComponent(props: FormComponentProps) {
  const { inputs, buttons, message } = props
  return (
    <StyledForm>
      {inputs.map((inputProps: InputProps, index: number) => (
        <StyledInput key={index} {...inputProps} />
      ))}
      {buttons.map((buttonProps: ButtonProps, index: number) => (
        <StyledButton key={index} {...buttonProps} />
      ))}
      {message && (
        <div style={{ color: message.type === 'error' ? 'red' : 'green' }}>
          {message.msg}
        </div>
      )}
    </StyledForm>
  )
}

export default FormComponent
