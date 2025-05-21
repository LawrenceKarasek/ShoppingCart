import { Product } from './product'

export type Cart = {
  cartId: number
  username: string
  savedCartItems: CartItem[]
}

export type CartItem = {
  id?: number
  cartItemId?: number
  product?: Product
  quantity?: number
  purchased?: boolean
}

export type CartState = {
  cart: Cart
  loading: boolean
  error: string | null
}

export type AddCartParams = {
  cartId: number
  productId: number
  quantity: number
}

export type EditCartParams = {
  cartItemId: number
  quantity: number
  purchased: boolean
}

export type DeleteCartParams = {
  cartId: number
  cartItemId: number
}
