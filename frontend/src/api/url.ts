import axios from 'axios'
import URL from '../types/url'

export const getURLs = async (): Promise<URL[]> => {
  try {
    // Use Vite's env variable locally, and relative path in production
    const API_URL = import.meta.env.VITE_API_URL || '/api';

    if (!API_URL) {
      throw new Error('VITE_API_URL not found')
    }
    const url = `${API_URL}/urls`

    const response = await axios.get(url, {
      withCredentials: true,
    })

    return response.data
  } catch (e:any) {
    throw new Error('The page could not be found (404).')

  }
}

export const getOriginalURL = async (shortURL: string): Promise<URL> => {
  try {

    const API_URL = import.meta.env.VITE_API_URL || '/api';

    if (!API_URL) {
      throw new Error('VITE_API_URL not found')
    }

    if (!shortURL || shortURL.length !== 6) {
      throw new Error('Invalid URL')
    }

    const url = `${API_URL}/urls/${shortURL}`
    const response = await axios.get(url, {
      withCredentials: true,
    })

    return response.data
  } catch (error:any) {
    console.error(`url/getOriginalURL: ${error.message}  ${error.stack}`)  
    const userFriendlyMessage = error.message.includes(404)
      ? 'The page you are looking for was not found (404).'
      : ''

    throw new Error(userFriendlyMessage)
  }
}

export const addShortURL = async (urlObj: URL): Promise<URL> => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || '/api';

    if (!API_URL) {
      throw new Error('VITE_API_URL not found')
    }
    const url = `${API_URL}/urls`

    const response = await axios.post(url, urlObj, {
      withCredentials: true,
    })

    return response.data
  } catch (error:any) {
    console.error(`url/addShortURL: ${error.message}  ${error.stack}`)
    const userFriendlyMessage = 'An error occurred editing the short URL.'
    throw new Error(userFriendlyMessage)
  }
}

export const editShortURL = async (urlObj: URL) => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || '/api';

    if (!API_URL) {
      throw new Error('VITE_API_URL not found')
    }

    const url = `${API_URL}/urls/${urlObj.id}`
    const response = await axios.put(url, urlObj, {
      withCredentials: true,
    })

    return response.data
  } catch (error:any) {
    console.error(`url/editShortURL: ${error.message}  ${error.stack}`)
    const userFriendlyMessage = error.message.includes(406)
      ? 'Duplicate Short URL entered. Please enter a unique short name.'
      : 'An error occurred registering.'

    throw new Error(userFriendlyMessage)

  }
}
