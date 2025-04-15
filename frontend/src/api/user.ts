import axios from 'axios'
import { AuthResult } from '../types/user'

export type AuthParams = {
  email: string
  password: string
}

export const login = async (params: AuthParams) => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || '/api';

    if (!API_URL) {
      throw new Error('VITE_API_URL not found')
    }
    const url = `${API_URL}/users/login`

    await axios.post(url, params, {
      withCredentials: true, //
    })
  } catch (error:any) {

    console.error(`user/login: ${error.message}  ${error.stack}`)
    const userFriendlyMessage = error.message.includes(401)
      ? 'Invalid credentials.'
      : 'An error occurred registering.'
    throw new Error(userFriendlyMessage)
  }
}

export const register = async (params: AuthParams) => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || '/api';

    if (!API_URL) {
      throw new Error('VITE_API_URL not found')
    }
    const url = `${API_URL}/users/register`

    await axios.post(url, params, {
      withCredentials: true,
    })
  } catch (error:any) {

    console.error(`user/register: ${error.message}  ${error.stack}`)
    const userFriendlyMessage = error.message.includes(409)
      ? 'Email already exists, please log in.'
      : 'An error occurred registering.'
    throw new Error(userFriendlyMessage)
  }
}

export const checkAuth = async (): Promise<AuthResult> => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || '/api';

    if (!API_URL) {
      throw new Error('VITE_API_URL not found')
    }
    const url = `${API_URL}/users/check-auth`
    const response = await axios.get(url, {
      withCredentials: true,
    })

    return response.data
  } catch (error:any) {

    console.error(`user/checkAuth: ${error.message}  ${error.stack}`)
    const userFriendlyMessage = 'An error occurred checking auth.'
    throw new Error(userFriendlyMessage)
  }
}

export const logout = async () => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || '/api';

    if (!API_URL) {
      throw new Error('VITE_API_URL not found')
    }
    const url = `${API_URL}/users/logout`
    const response = await axios.get(url, {
      withCredentials: true,
    })

    return response.data
  } catch (error:any) {
    console.error(`user/logout Error: ${error.message}  ${error.stack}`)
    const userFriendlyMessage = 'An error occurred logging out.'
    throw new Error(userFriendlyMessage)
  }
}
