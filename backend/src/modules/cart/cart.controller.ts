import { Controller, Post, Body, Param, Get, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

   @Post()
  async createProfile(@Body() body: { username: string}) {
    return this.cartService.createCart(body.username);
  } 

  @Post(':cartId/product/:productId/quantity/:quantity')
  async addCartItem(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
    @Param('quantity') quantity: number
  ) {
    return this.cartService.addCartItem(cartId, productId,quantity);
  }

  @Put(':cartItemId/quantity/:quantity/purchased/:purchased/')
  async updateCartItem(
    @Param('cartItemId') cartItemId: number,
    @Param('quantity') quantity: number,
    @Param('purchased') purchased: boolean
  ) {
    return this.cartService.updateCartItem(cartItemId, quantity,purchased);
  }

  @Delete(':cartId/cartItem/:cartItemId')
  async removeCartItem(
    @Param('cartId') cartId: number,
    @Param('cartItemId') cartItemId: number,
  ) {
    return this.cartService.removeCartItem(cartId,cartItemId);
  }

  @Get(':cartId')
  async getCart(@Param('cartId') cartId: number) {
    return this.cartService.getCart(cartId);
  }
}