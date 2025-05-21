import axios from 'axios'
import { Product } from '../types/product'

export const getAllProduct = async (): Promise<Product[]> => {
  try {
    const API_ROOT = import.meta.env.VITE_API_URL || '/api'

    if (!API_ROOT) {
      throw new Error('VITE_API_URL is undefined')
    }

    const url = `${API_ROOT}/product`

    const response = await axios.get(url, {
      withCredentials: true,
    })

    return response.data
  } catch (e) {
    throw Error(`getAllProduct error: ${e}`)
  }
}
