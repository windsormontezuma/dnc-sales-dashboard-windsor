import type { ChangeEvent } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

//Components
import { Box, Container, Grid } from '@mui/material'
import {
  BannerImage,
  FormComponent,
  Logo,
  StyledH1,
  StyledP,
} from '@/components'

//Hooks
import { useFormValidation, usePost } from '@/hooks'

//Utils
import { jwtExpirationDateConverter, pxToRem } from '@/utils'

//Types
import type {
  DecodedJWT,
  MessageProps,
  LoginPostData,
  LoginData,
} from '@/types'

function Login() {
  const navigate = useNavigate()
  const inputs = [
    { type: 'email', placeholder: 'Email' },
    { type: 'password', placeholder: 'Senha' },
  ]
  const { data, error, errorMessage, loading, postData, resetError } = usePost<
    LoginData,
    LoginPostData
  >('login')
  const {
    formValues,
    formValid,
    handleInputChange: handleFormInputChange,
  } = useFormValidation(inputs)

  const handleInputChange = (index: number, value: string) => {
    resetError()
    handleFormInputChange(index, value)
  }

  const handleMessage = (): MessageProps => {
    if (!error) return { msg: '', type: 'success' }

    if (error === 401) {
      return { msg: 'Email e/ou senha invalidos', type: 'error' }
    }

    // timeout / gateway
    if (error === 504) {
      return {
        msg: 'Serviço temporariamente indisponível. Tente novamente mais tarde.',
        type: 'error',
      }
    }

    // se backend retornou mensagem mais específica, mostre-a
    if (errorMessage) {
      return { msg: String(errorMessage), type: 'error' }
    }

    return {
      msg: 'Não foi possível realizar a operação. Entre em contato com nosso suporte.',
      type: 'error',
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await postData({
      email: String(formValues[0]),
      password: String(formValues[1]),
    })
  }

  useEffect(() => {
    if (data?.jwt_token) {
      const decoded = jwtDecode<DecodedJWT>(data.jwt_token)
      Cookies.set('jwt_token', data.jwt_token, {
        expires: jwtExpirationDateConverter(decoded.exp),
        secure: true,
      })
    }
    if (Cookies.get('jwt_token')) navigate('/home')
  }, [data, navigate])
  return (
    <>
      <Box>
        <Grid container>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{ alignItems: 'center', display: 'flex', height: '100vh' }}
          >
            <Container maxWidth="sm">
              <Box sx={{ marginBottom: pxToRem(24) }}>
                {' '}
                <Logo height={41} width={100} />{' '}
              </Box>
              <Box sx={{ marginBottom: pxToRem(24) }}>
                <StyledH1>Bem-vindo</StyledH1>
                <StyledP>Digite sua senha e email para logar</StyledP>
              </Box>
              <FormComponent
                inputs={inputs.map((input, index) => ({
                  type: input.type,
                  placeholder: input.placeholder,
                  value: formValues[index] || '',
                  onChange: (e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(
                      index,
                      (e.target as HTMLInputElement).value
                    ),
                }))}
                buttons={[
                  {
                    className: 'primary',
                    disabled: !formValid || loading,
                    type: 'submit',
                    onClick: handleSubmit,
                    children: loading ? 'Aguarde...' : 'Login',
                  },
                ]}
                message={handleMessage()}
              />
            </Container>
          </Grid>
          <Grid size={{ sm: 6 }} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <BannerImage />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Login
