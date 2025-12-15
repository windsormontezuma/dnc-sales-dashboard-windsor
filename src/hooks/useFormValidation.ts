import { useState, useEffect } from 'react'
import type { InputProps } from '@/types'

export const useFormValidation = (inputs: InputProps[]) => {
  const [formValues, setFormValues] = useState<
    (string | number | readonly string[])[]
  >(inputs.map((input) => input.value || ''))
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    const allFieldsValid = inputs.every((input: InputProps, index) => {
      if (input.type === 'email') {
        return /\S+@\S+\.\S+/.test(String(formValues[index]))
      }
      if (input.type === 'password') {
        return String(formValues[index]).length >= 7
      }
      return true
    })
    setFormValid(allFieldsValid)
  }, [formValues, inputs])

  const handleInputChange = (index: number, value: string) => {
    setFormValues((prevValues) => {
      const newValues = [...prevValues]
      newValues[index] = value
      return newValues
    })
  }

  return { formValues, formValid, handleInputChange }
}
