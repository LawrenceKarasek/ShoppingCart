import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../database/entities/cart.entity';
import { CartItem } from '../database/entities/cart-item.entity';
import { CartService } from './cart.service';
import { ProductService } from '../product/product.service';
import { CartController } from './cart.controller';
import { ProductModule } from "../product/product.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem]),
    ProductModule,
] ,
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
