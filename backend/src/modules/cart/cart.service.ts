import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart} from '../database/entities/cart.entity';
import { CartItem} from '../database/entities/cart-item.entity';
import { Product } from '../database/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async createCart(username: string): Promise<Cart> {
    const cart = this.cartRepository.create({ username});
    return this.cartRepository.save(cart);
  }

  async addCartItem(
    cartId: number,
    productId: number,
    quantity:number
  ): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['savedCartItems'],
    });

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) throw new Error('Product not found');
    if (!cart) throw new Error('Cart not found');

    try{
      const newCartItem = this.cartItemRepository.create({
        cartId,
        productId,
        quantity,
        purchased: false
      });

      cart.savedCartItems.push(newCartItem);
      return this.cartRepository.save(cart);

    } catch (error) {
      console.error('CartService: Error creating CartItem:', error.message);
      throw error;
    }
  }

  async updateCartItem(
    cartItemId: number,
    quantity: number,
    purchased: boolean|string
  ): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
    });

    if (!cartItem) throw new Error('CartItem not found');

    cartItem.quantity = quantity;
    cartItem.purchased =  purchased === true || purchased === 'true';

    try {

      await this.cartItemRepository.save(cartItem);

      const cartItemUpdated = await this.cartItemRepository.findOne({
        where: { id: cartItemId },
      });

      if(!cartItemUpdated){
        throw new Error('updatedCart Item not found')
      }

      return cartItemUpdated

    } catch (error) {
      console.error('CartService: Error updating CartItem:', error.message);
      throw error;
    }
  }
  async removeCartItem(
    cartId: number,
    cartItemId: number
  ): Promise<Cart> {

    const cart =  await this.getCart(cartId)

    if(!cart) {
      const err = `CartService: Error Removing CartItem  not found cart:${cartId}  `
      console.error(err);
      throw Error(err);
    }

    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
    });

    if(!cartItem) {
      const err = `CartService: Error Removing CartItem  not found cartItemId:${cartItemId}  `
      console.error(err);
      throw Error(err);
    }

    try{
        await this.cartItemRepository.delete(cartItemId)

    } catch (error) {
      console.error('CartService: Error Removing CartItem:', error.message);
      throw error;
    }

    return await this.getCart(cartItem.cartId)

  }

  async getCartWithCartItems(cartId: number): Promise<Cart> {
    return await this.getCart(cartId)
  }

  async getCart(cartId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['savedCartItems','savedCartItems.product'],
    });

    if (!cart) throw new Error('Cart not found');
    return cart;
  }

  
}
