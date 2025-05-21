import axios from 'axios'
import {
  Cart,
  EditCartParams,
  AddCartParams,
  DeleteCartParams,
} from '../types/cart'

export const getCart = async (): Promise<Cart> => {
  try {
    const API_ROOT = import.meta.env.VITE_API_URL || '/api'
    if (!API_ROOT) {
      throw new Error('VITE_API_URL is undefined')
    }

    const cartId = 1
    const url = `${API_ROOT}/cart/${cartId}`

    const response = await axios.get(url, {
      withCredentials: true,
    })

    return response.data
  } catch (e) {
    throw Error(`getCart error: ${e}`)
  }
}

export const addCartItem = async ({
  cartId,
  productId,
  quantity,
}: AddCartParams): Promise<Cart> => {
  try {
    const API_ROOT = import.meta.env.VITE_API_URL || '/api'
    if (!API_ROOT) {
      throw new Error('VITE_API_URL is undefined')
    }

    const url = `${API_ROOT}/cart/${cartId}/product/${productId}/quantity/${quantity}`

    const response = await axios.post(url, {
      withCredentials: true,
    })

    return response.data
  } catch (e) {
    throw Error(`addCartItemerror: ${e}`)
  }
}

export const updateCartItem = async ({
  cartItemId,
  quantity,
  purchased,
}: EditCartParams): Promise<Cart> => {
  try {
    const API_ROOT = import.meta.env.VITE_API_URL || '/api'
    if (!API_ROOT) {
      throw new Error('VITE_API_URL is undefined')
    }
    const url = `${API_ROOT}/cart/${cartItemId}/quantity/${quantity}/purchased/${purchased}`

    const response = await axios.put(url, {
      withCredentials: true,
    })

    return response.data
  } catch (e) {
    throw Error(`updateCartItem error: ${e}`)
  }
}

export const removeCartItem = async ({
  cartId,
  cartItemId,
}: DeleteCartParams): Promise<Cart> => {
  try {
    const API_ROOT = import.meta.env.VITE_API_URL || '/api'
    if (!API_ROOT) {
      throw new Error('VITE_API_URL is undefined')
    }

    if (!cartId || !cartItemId) {
      throw new Error('cartId or cartItemId are null')
    }

    const url = `${API_ROOT}/cart/${cartId}/cartItem/${cartItemId}`

    const response = await axios.delete(url, {
      withCredentials: true,
    })

    return response.data
  } catch (e) {
    throw Error(`removeCartItem error: ${e}`)
  }
}
