import { useState } from 'react'
import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
  timeout: 5000,
})

export const usePost = <T, P>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<number | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const postData = async (postData: P, config?: AxiosRequestConfig) => {
    setData(null)
    setLoading(true)
    setError(null)

    try {
      const response = await axiosInstance({
        url: endpoint,
        method: 'POST',
        data: postData,
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
        ...config,
      })
      setData(response.data)
      setError(null)
      setErrorMessage(null)
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        // timeout error has code 'ECONNABORTED'
        const code = (e as { code?: string }).code
        if (code === 'ECONNABORTED') {
          setError(504)
          setErrorMessage('Request timeout')
        } else {
          const status = e.response?.status ?? 500
          setError(status)
          // prefer backend message if available
          const backendMsg = e.response?.data?.message
          setErrorMessage(backendMsg ?? e.message)
        }
      } else {
        setError(500)
        setErrorMessage('Unknown error')
      }
    } finally {
      setLoading(false)
    }
  }
  const resetError = () => {
    setError(null)
    setErrorMessage(null)
  }
  return { data, loading, error, errorMessage, postData, resetError }
}
